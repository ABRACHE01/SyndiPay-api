const AuthServices = require("../../../adapters/services/auth/AuthServices");

class LoginUseCase {
  constructor() {
    this.authServices = new AuthServices();
  }

  execute = async (data) => {
    try {
      await this.authServices.validateLoginData(data);

      const user = await this.authServices.login(data);

      const accessToken = await this.authServices.generateAccessToken({
        ...user,
      });
      const refreshToken = await this.authServices.generateRefreshToken({
        id: user.id,
      });

      await this.authServices.saveRefreshToken(refreshToken, user.id);

      return {
        status: 200,
        message: "User logged in successfully",
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

module.exports = LoginUseCase;
