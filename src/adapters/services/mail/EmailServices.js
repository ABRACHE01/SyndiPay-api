const EmailGateway = require("../../../infrastructure/gateways/mail/EmailGateway");

class EmailServices {
  constructor() {
    this.emailGateway = new EmailGateway();
  }

  createVerificationEmailTemplate = (token) => {
    return `
              <h1>Email Verification</h1>
              <p>Click this link to verify your email: <a href="http://localhost:3000/mail/verify-email?token=${token}">Verify Email</a></p>
            `;
  };

  sendVerificationEmail = async (email, token) => {
    const subject = "Email Verification";
    const body = this.createVerificationEmailTemplate(token);

    const emailSent = await this.emailGateway.sendEmail(email, subject, body);

    if (!emailSent) {
      const error = new Error("Email could not be sent");
      error.status = 500;

      throw error;
    }
  };

  createResetPasswordEmailTemplate = (token) => {
    return `
              <h1>Reset Password</h1>
              <p>Click this link to reset your password: <a href="http://localhost:8080/api/v1/auth/reset-password?token=${token}">Reset Password</a></p>
            `;
  };

  sendResetPasswordEmail = async (email, token) => {
    const subject = "Reset Password";
    const body = this.createResetPasswordEmailTemplate(token);

    const emailSent = await this.emailGateway.sendEmail(email, subject, body);

    if (!emailSent) return false;

    return true;
  };
}

module.exports = EmailServices;
