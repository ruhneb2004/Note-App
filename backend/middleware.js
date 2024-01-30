const jwt = require("jsonwebtoken");
const secretKey = require("./config");

const authMiddleware = (req, res, next) => {
  console.log("wrong");
  const header = req.headers.authorization;
  if (!header) return res.status(404).json({ mess: "User not logged in" });
  const token = header.split(" ")[1].trim();
  if (!(header.split(" ")[0] === "Bearer"))
    return res.status(403).json({ mess: "Wrong token" });
  const isValid = jwt.verify(token, secretKey);
  req.userId = isValid.userId;
  if (!isValid) return res.status(403).json({ mess: "Validation Failed" });
  next();
};

module.exports = authMiddleware;
