import authInstance from "../services/auth.services.js";
import generateToken from "../utils/generateTokens.js";

export let register = async (req, res, next) => {
  let newUser = await authInstance.registerUser(req);
  if (!newUser) {
    return res.status(400).json({
      message: "User not created",
    });
  }
  let token = await generateToken(newUser._id);
  res.status(201).json({ user: newUser, token });
};

export let login = async (req, res, next) => {
  let { password } = req.body;
  let exisitingUser = await authInstance.loginUser(req);
  if (
    !exisitingUser ||
    !(await exisitingUser.comparePassword(password, exisitingUser.password))
  ) {
    return res.status(400).json({
      message: "User not found please register",
    });
  }
  let token = await generateToken(exisitingUser._id);
  res.status(200).json({ user: exisitingUser, token });
};
