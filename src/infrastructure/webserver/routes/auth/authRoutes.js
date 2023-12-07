const express = require("express");
const authRoutes = express.Router();
const AuthController = require("../../../../adapters/controllers/auth/AuthController");
const authController = new AuthController();

authRoutes.post("/login", authController.login);

authRoutes.post("/register", authController.register);

authRoutes.post("/logout", authController.logout);

authRoutes.post("/refresh-token", authController.refreshToken);

authRoutes.post("/verify-email", authController.verifyEmail);

module.exports = authRoutes;
