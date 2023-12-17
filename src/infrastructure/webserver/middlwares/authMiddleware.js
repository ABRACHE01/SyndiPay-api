const AuthServices = require("../../../adapters/services/auth/AuthServices");
const authServices = new AuthServices();

const authMiddleware = async (req, res, next) => {
  const { access_token } = req.cookies;

  if (!access_token) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  try {
    const { status, ...rest } = await authServices.verifyAccessToken(access_token);

    if (status !== 200) {
      return res.status(status).json({ ...rest });
    }

    req.user = { ...rest.payload };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Access Denied: Invalid Token" });
  }
};

module.exports = authMiddleware;