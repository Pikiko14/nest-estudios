import * as joi from 'joi';

export const joiValidationSchema = joi.object({
  defaultLimit: joi.number().default(10),
  port: joi.number().default(3000),
  mongodb: joi.string(),
});
