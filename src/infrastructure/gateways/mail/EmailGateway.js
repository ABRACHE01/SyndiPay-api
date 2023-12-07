const environment = require("../../config/environment");
const nodeMailer = require("nodemailer");

class EmailGateway  {

  sendEmail = async (to, subject, body) => {
    try {
      const transporter = nodeMailer.createTransport({
        host: environment.email.HOST,
        port: environment.email.PORT,
        auth: {
          user: environment.email.AUTH.USER,
          pass: environment.email.AUTH.PASS,
        },
      });
      const mailOptions = {
        from: "marhaba@gmail.com",
        to,
        subject,
        html: body,
      };

      await transporter.sendMail(mailOptions);

      return true;
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = EmailGateway;
