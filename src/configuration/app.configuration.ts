export const AppConfiguration = () => ({
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  mongodb: process.env.URL_MONGO,
  defaultLimit: process.env.DEFAULT_LIMIT || 7,
});
