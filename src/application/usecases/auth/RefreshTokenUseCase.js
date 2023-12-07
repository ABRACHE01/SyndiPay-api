const AuthServices = require("../../../adapters/services/auth/AuthServices");

class RefreshTokenUseCase  {
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

      await this.authServices.checkRefreshTokenInDB(refreshToken);

      const payload = await this.authServices.verifyRefreshToken(refreshToken);

      const userCredentials = await this.authServices.getUserCredentials(
        payload.id
      );

      const accessToken = await this.authServices.generateAccessToken({
        ...userCredentials,
      });

      return {
        status: 200,
        message: "Access token refreshed successfully",
        jwt: {
          accessToken,
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

module.exports = RefreshTokenUseCase;
