const bcrypt = require("bcryptjs");
const JsonWebToken = require("../../../infrastructure/packages/jwt/JsonWebToken");
const UserRepository = require("../../../infrastructure/repositories/UserRepository");
const UserTokenRepository = require("../../../infrastructure/repositories/UserTokenRepository");
const validateData = require("../../../infrastructure/helpers/validateData");

class AuthServices {
  
  constructor() {
    this.jsonWebToken = new JsonWebToken();
    this.userRepository = new UserRepository();
    this.userTokenRepository = new UserTokenRepository();
    this.validateData = validateData;
  }

  validateRegisterData = async (registerData) => {
    const { error: validationError } = this.validateData(
      registerData,
      "register"
    );

    if (validationError) {
      const error = new Error(validationError.message);
      error.status = validationError.status;

      throw error;
    }
  };

  validateLoginData = async (loginData) => {
    const { error: validationError } = this.validateData(loginData, "login");

    if (validationError) {
      const error = new Error(validationError.message);
      error.status = validationError.status;

      throw error;
    }
  };

  isEmailExist = async (email) => {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  };

  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };

  register = async (data) => {
    const user = await this.userRepository.create(data);

    if (!user) {
      const error = new Error("User could not be created");
      error.status = 500;

      throw error;
    }

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      phoneNumber: user.phoneNumber,
      address: user.address,
      roles: user.roles.map((role) => role.name),
      isVerified: user.isVerified,
      isBanned: user.isBanned,
    };
  };

  login = async (data) => {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      const error = new Error("Email does not exist");
      error.status = 404;

      throw error;
    }

    const isPasswordValid = await this.comparePassword(
      data.password,
      user.password
    );
    if (!isPasswordValid) {
      const error = new Error("Password is incorrect");
      error.status = 401;

      throw error;
    }

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      phoneNumber: user.phoneNumber,
      address: user.address,
      roles: user.roles.map((role) => role.name),
      isVerified: user.isVerified,
      isBanned: user.isBanned,
    };
  };

  generateAccessToken = async (payload) => {
    const { access_token_secret } = this.jsonWebToken;
    return await this.jsonWebToken.generate(
      payload,
      access_token_secret,
      "15m"
    );
  };

  generateRefreshToken = async (payload) => {
    const { refresh_token_secret } = this.jsonWebToken;
    return await this.jsonWebToken.generate(
      payload,
      refresh_token_secret,
      "30d"
    );
  };

  verifyAccessToken = async (token) => {
    const { access_token_secret } = this.jsonWebToken;
  
    try {
      const payload = await this.jsonWebToken.verify(token, access_token_secret);
  
      return {
        status: 200,
        payload,
      };
    } catch (err) {
      let errorMessage;
  
      if (err.message.includes("jwt expired")) {
        errorMessage = "Token expired";
      } else {
        errorMessage = "Invalid token";
      }
  
      return {
        status: 401,
        error: errorMessage,
      };
    }
  };

  verifyRefreshToken = async (token) => {
    const { refresh_token_secret } = this.jsonWebToken;
    try {
      const payload = await this.jsonWebToken.verify(
        token,
        refresh_token_secret
      );

      return payload;
    } catch (err) {
      const error = new Error(
        `Access Denied: ${
          err.message.includes("jwt expired")
            ? "Token expired"
            : "Invalid token"
        } `
      );
      error.status = 401;

      throw error;
    }
  };

  saveRefreshToken = async (refreshToken, userId) => {
    const userToken = await this.userTokenRepository.find({ userId });

    if (userToken.length > 0) {
      await this.userTokenRepository.update(userToken[0]._id, {
        refreshToken,
        updatedAt: new Date(),
      });
    } else {
      await this.userTokenRepository.create({
        userId,
        refreshToken,
      });
    }
  };

  deleteRefreshToken = async (refreshToken) => {
    const userToken = await this.userTokenRepository.find({ refreshToken });

    if (userToken.length === 0) {
      const error = new Error("Refresh token does not exist in database");
      error.status = 400;

      throw error;
    }

    await this.userTokenRepository.softDelete(userToken[0]._id);
  };

  checkRefreshTokenInDB = async (refreshToken) => {
    const userToken = await this.userTokenRepository.find({ refreshToken });

    if (userToken.length === 0) {
      const error = new Error("Refresh token does not exist in database");
      error.status = 400;

      throw error;
    }
  };

  generateEmailVerificationToken = async (payload) => {
    const { email_verification_token_secret } = this.jsonWebToken;
    return await this.jsonWebToken.generate(
      payload,
      email_verification_token_secret,
      "10m"
    );
  };

  verifyEmailVerificationToken = async (token) => {
    const { email_verification_token_secret } = this.jsonWebToken;
    try {
      const payload = await this.jsonWebToken.verify(
        token,
        email_verification_token_secret
      );

      return payload;
    } catch (err) {
      const error = new Error(
        `Access Denied: ${
          err.message.includes("jwt expired")
            ? "Token expired"
            : "Invalid token"
        } `
      );
      error.status = 401;

      throw error;
    }
  };

  verifyEmail = async (id) => {
    const user = await this.userRepository.findById(id);

    if (!user) {
      const error = new Error("User does not exist");
      error.status = 404;

      throw error;
    }

    await this.userRepository.update(id, {
      isVerified: true,
    });
  };

  generateResetPasswordToken = async (payload) => {
    const { reset_password_token_secret } = this.jsonWebToken;
    return await this.jsonWebToken.generate(
      payload,
      reset_password_token_secret,
      "10m"
    );
  };

  verifyResetPasswordToken = async (token) => {
    const { reset_password_token_secret } = this.jsonWebToken;

    try {
      const payload = await this.jsonWebToken.verify(
        token,
        reset_password_token_secret
      );

      return {
        status: 200,
        payload,
      };
    } catch (err) {
      const error = new Error(
        `Access Denied: ${
          err.message.includes("jwt expired")
            ? "Token expired"
            : "Invalid token"
        } `
      );
      error.status = 401;

      throw error;
    }
  };

  getUserCredentials = async (id) => {
    const user = await this.userRepository.findById(id);

    if (!user) {
      const error = new Error("User does not exist");
      error.status = 404;

      throw error;
    }

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      phoneNumber: user.phoneNumber,
      address: user.address,
      roles: user.roles.map((role) => role.name),
      isVerified: user.isVerified,
      isBanned: user.isBanned,
    };
  };
}

module.exports = AuthServices;
