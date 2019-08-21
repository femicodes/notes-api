import Joi from '@hapi/joi';

const validateNote = (note) => {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(70)
      .required(),
    body: Joi.string()
      .min(5)
      .max(1000)
      .required(),
  };
  return Joi.validate(note, schema);
};

export default validateNote;
