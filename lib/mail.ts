import nodemailer from "nodemailer";

export const sendVerificationMail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/verify-email?token=${token}`;

  // Create a transporter using your email provider's SMTP settings
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
    subject: "Verification Email",
    text: `Verify your email by clicking the link below: ${confirmationLink}`,
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
