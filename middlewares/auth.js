import jwt from "jsonwebtoken";
import userInstance from "../services/user.services.js";

const auth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split("")[1];
  }
  if (!token) {
    return res.status(400).json("please login!!");
  }
  let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  let user = await userInstance.findUserById(decodedToken.id);
  if (!user) {
    return res.status(400).json("please register!!");
  }
  req.userId = user._id;
  next();
};
export default auth;
