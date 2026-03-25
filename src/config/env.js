require("dotenv").config();
module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "super_secret_key",
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT || 5432,
  resendApiKey: process.env.RESEND_API_KEY,
  clientUrl: process.env.CLIENT_URL,
};