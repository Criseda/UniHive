const JWT = require("jsonwebtoken");

exports.cookieJWTAuth = (req, res, next) => {
  console.log("i have been called lol");
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({
      authenticated: false,
      message: "Unauthorized",
    });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.username = decoded.username;
    req.fullname = decoded.fullname;
    next();
  } catch (error) {
    return res.status(401).json({
      authenticated: false,
      message: "Unauthorized",
    });
  }
};
