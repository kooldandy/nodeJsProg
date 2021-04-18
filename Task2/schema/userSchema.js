import Joi from 'joi';

const userQuerySchema = Joi.object().keys({
  login: Joi.string().min(4).required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])'))
    .required(),
  age: Joi.number().greater(3).less(131).required(),
});

const autoSuggestQuerySchema = Joi.object().keys({
  loginSubstring: Joi.string().required(),
  limit: Joi.number().greater(0).required(),
});

export { userQuerySchema, autoSuggestQuerySchema };