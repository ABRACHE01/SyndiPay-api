const AuthServices = require("../../../adapters/services/auth/AuthServices");

class LogoutUseCase  {
  constructor() {
    this.authServices = new AuthServices();
  }

  execute = async (refreshToken) => {
    try {
      if (!refreshToken) {
        const error = new Error("Refresh token does not exist");
        error.status = 400;

        throw error;
      }

      await this.authServices.verifyRefreshToken(refreshToken);

      await this.authServices.deleteRefreshToken(refreshToken);

      return {
        status: 200,
        message: "User logged out successfully",
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

module.exports = LogoutUseCase;
