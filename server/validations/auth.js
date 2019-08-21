import Joi from '@hapi/joi';

export const validateSignup = (user) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .min(5)
      .max(30)
      .required()
      .email(),
    password: Joi.string()
      .alphanum()
      .min(5)
      .max(30)
      .required(),
  };
  return Joi.validate(user, schema);
};

export const validateLogin = (user) => {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .alphanum()
      .required(),
  };
  return Joi.validate(user, schema);
};
