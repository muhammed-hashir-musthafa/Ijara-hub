import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || "development",
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/ijara-hub"
  },
  jwt: {
    secret: process.env.JWT_SECRET || "fallback-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  }
};

export default config;