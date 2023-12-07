const LoginUseCase = require("../../../application/usecases/auth/LoginUseCase");
const RegisterUseCase = require("../../../application/usecases/auth/RegisterUseCase");
const LogoutUseCase = require("../../../application/usecases/auth/LogoutUseCase");
const RefreshTokenUseCase = require("../../../application/usecases/auth/RefreshTokenUseCase");
const VerifyEmailUseCase = require("../../../application/usecases/auth/VerifyEmailUseCase");

class AuthController {
  constructor() {
    this.loginUseCase = new LoginUseCase();
    this.registerUseCase = new RegisterUseCase();
    this.logoutUseCase = new LogoutUseCase();
    this.refreshTokenUseCase = new RefreshTokenUseCase();
    this.verifyEmailUseCase = new VerifyEmailUseCase();
  }

  register = async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      image,
      phoneNumber,
      address,
      roleNames,
    } = req.body;

    const { status, jwt, ...rest } = await this.registerUseCase.execute({
      firstName,
      lastName,
      email,
      password,
      image,
      phoneNumber,
      address,
      roleNames,
    });

    if (jwt) {
      res.cookie("access_token", jwt.accessToken, { httpOnly: true });
      res.cookie("refresh_token", jwt.refreshToken, { httpOnly: true });
    }

    res.status(status).json({ ...rest });
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const { status, jwt, ...rest } = await this.loginUseCase.execute({
      email,
      password,
    });

    if (jwt) {
      res.cookie("access_token", jwt.accessToken, { httpOnly: true });
      res.cookie("refresh_token", jwt.refreshToken, { httpOnly: true });
    }

    res.status(status).json({ ...rest });
  };

  logout = async (req, res) => {
    const { refresh_token } = req.cookies;

    const { status, ...rest } = await this.logoutUseCase.execute(refresh_token);

    if (status === 200) {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
    }

    res.status(status).json({ ...rest });
  };

  refreshToken = async (req, res) => {
    const { refresh_token } = req.cookies;

    const { status, jwt, ...rest } = await this.refreshTokenUseCase.execute(
      refresh_token
    );

    if (jwt) {
      res.cookie("access_token", jwt.accessToken, { httpOnly: true });
    }

    res.status(status).json({ ...rest });
  };

  verifyEmail = async (req, res) => {
    const { token } = req.query;
    const { refresh_token } = req.cookies;

    const { status, ...rest } = await this.verifyEmailUseCase.execute(
      token,
      refresh_token
    );

    if (status === 200 || refresh_token) {
      const { jwt } = await this.refreshTokenUseCase.execute(refresh_token);

      if (jwt) {
        res.cookie("access_token", jwt.accessToken, { httpOnly: true });
      }
    }

    res.status(status).json({ ...rest });
  };
}

module.exports = AuthController;
