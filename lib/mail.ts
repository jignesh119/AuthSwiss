import nodemailer from "nodemailer";

const sendMail = (email: string, subject: string, text: string) => {
  let transporter = nodemailer.createTransport({
    service: "gmail", // or 'yahoo', 'outlook', etc.
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD!.split("-").join(""),
    },
  });

  // Define the email options
  let mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};
export const sendVerificationMail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/verify-email?token=${token}`;
  sendMail(
    email,
    "Email verification mail",
    `Verify your email by clicking the link below: ${confirmationLink}`,
  );

  // Create a transporter using your email provider's SMTP settings
};

export const sendResetPasswordMail = async (email: string, token: string) => {
  //TODO: verify reset password request
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  sendMail(
    email,
    "Reset password mail",
    `Reset your password by clicking the link below: ${resetLink}`,
  );
};
