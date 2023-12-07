const AuthServices = require("../../../adapters/services/auth/AuthServices");

class VerifyEmailUseCase  {
  constructor() {
    this.authServices = new AuthServices();
  }

  execute = async (token, refreshToken) => {
    try {
      if (!token) {
        const error = new Error("Token does not exist");
        error.status = 400;

        throw error;
      }

      const payload = await this.authServices.verifyEmailVerificationToken(
        token
      );

      await this.authServices.verifyEmail(payload.id);

      return {
        status: 200,
        message: "Email verified successfully",
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

module.exports = VerifyEmailUseCase;
