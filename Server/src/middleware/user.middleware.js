import jwt from "jsonwebtoken";

const Auth = (req, res, next) => {
  try {
    const AccessToken = req.cookies.AccessToken;

    if (!AccessToken) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(401).json({ message: "Token is not valid" });
  }
};

export { Auth };