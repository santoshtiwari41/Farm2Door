import { verifyAccessToken } from "../services/tokens.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const user = await verifyAccessToken(token);

    req.user = user;
    next();
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export default authMiddleware;
