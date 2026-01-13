const authAdmin = (req, res, next) => {
  let token = "xyzghj";
  let isAuthorized = token === "xyz";
  isAuthorized ? next() : res.status(401).send("unAuthorized access");
};

const userAuth = (req, res, next) => {
  let token = "abc";
  let isAuthorized = token === "abc";
  isAuthorized ? next() : res.status(401).send("unAuthorized access for students");
};

module.exports = { authAdmin , userAuth};
