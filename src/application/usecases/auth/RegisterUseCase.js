const AuthServices = require("../../../adapters/services/auth/AuthServices");
const EmailServices = require("../../../adapters/services/mail/EmailServices");

class RegisterUseCase {
  constructor() {
    this.authServices = new AuthServices();
    this.emailServices = new EmailServices();
  }

  execute = async (data) => {
    try {
      await this.authServices.validateRegisterData(data);

      if (await this.authServices.isEmailExist(data.email)) {
        const error = new Error("Email already exist");
        error.status = 409;

        throw error;
      }

      data.password = await this.authServices.hashPassword(data.password);

      const user = await this.authServices.register(data);

      const verificationToken =
        await this.authServices.generateEmailVerificationToken({ id: user.id });

      await this.emailServices.sendVerificationEmail(
        user.email,
        verificationToken
      );

      const accessToken = await this.authServices.generateAccessToken({
        ...user,
      });
      const refreshToken = await this.authServices.generateRefreshToken({
        id: user.id,
      });

      await this.authServices.saveRefreshToken(refreshToken, user.id);

      return {
        status: 200,
        message: "User registered successfully and verification email sent",
        user,
        jwt: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: error.status || 500,
        message: error.message || "Something went wrong, please try again",
      };
    }
  };
}

module.exports = RegisterUseCase;
