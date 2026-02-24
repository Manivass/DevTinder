const mongoose = require("mongoose");

async function connectionDB() {
  await mongoose.connect(process.env.DATABASE_SECRET);
}

module.exports = { connectionDB };
