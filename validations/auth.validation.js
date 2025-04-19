import joi from "joi";

const registerSchema = joi.object({
  username: joi.string().main(6).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPass: joi.ref("password"),
});
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});
export { registerSchema, loginSchema };
