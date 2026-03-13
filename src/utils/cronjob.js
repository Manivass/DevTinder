const cronjob = require("node-cron");
const ConnectionRequest = require("../models/connectionRequest");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const { run } = require("./sesEmail");

cronjob.schedule("0 8 * * *", async () => {
  // send Emails to the user , received request on yesterday
  const yesterday = subDays( new Date(), 1 );
  const startDay = startOfDay(yesterday);
  const endDay = endOfDay(yesterday);
  const pendingLists = await ConnectionRequest.find({
    status: "interested",
    createdAt: {
      $gte : startDay,
      $lte : endDay,
    },
  }).populate("fromUserId toUserId");
  

  const emailIds = [
    ...new Set(pendingLists.map((list) => list.toUserId.emailId)),
  ];
  

  for (let email of emailIds) {
    try {
      const res = await run(
        "recevied request on yesterday to" + email,
        "you received a more  request on devTinder ",
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
});
