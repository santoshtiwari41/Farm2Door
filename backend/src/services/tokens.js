import jwt from "jsonwebtoken";

const generateAccessToken = ({ name, _id }) => {
  return jwt.sign({ name, _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = ({ _id }) => {
  return jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          reject({ status: 401, message: "Unauthorized: Token expired" });
        } else {
          reject({ status: 403, message: "Forbidden: Invalid token" });
        }
      } else {
        resolve(user);
      }
    });
  });
};
export { generateAccessToken, generateRefreshToken, verifyAccessToken };
