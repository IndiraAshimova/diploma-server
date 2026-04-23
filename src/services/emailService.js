const { Resend } = require("resend");
const config = require("../config/env");
console.log("RESEND KEY:", config.resendApiKey);

const resend = new Resend(config.resendApiKey);

const sendVerificationEmail = async (email, token) => {
  try {
    console.log("Sending verification email to:", email);
    console.log("API key exists:", !!config.resendApiKey);

    const link = `${config.clientUrl}/api/auth/verify-email?token=${token}`;

    const response = await resend.emails.send({
      from: "noreply@muraeduplatform.com",
      to: email,
      subject: "Email verification",
      html: `
        <h2>Welcome!</h2>
        <p>Click the button below to verify your email:</p>
        <a href="${link}" style="
          display:inline-block;
          padding:12px 24px;
          background:#4F46E5;
          color:white;
          border-radius:8px;
          text-decoration:none;
          font-size:16px;
        ">Verify email</a>
        <p>Link expires in 24 hours.</p>
      `,
    });

    console.log("Email sent response:", response);

  } catch (error) {
    console.error("Email sending error:", error);
  }
};

const sendPasswordResetEmail = async (email, token) => {
  try {
    console.log("Sending reset email to:", email);

    const link = `${config.clientUrl}/api/auth/reset-password?token=${token}`;

    const response = await resend.emails.send({
      from: "noreply@muraeduplatform.com",
      to: email,
      subject: "Password Reset",
      html: `
        <h2>Password Reset</h2>
        <p>Click the button below to reset your password:</p>
        <a href="${link}" style="
          display:inline-block;
          padding:12px 24px;
          background:#DC2626;
          color:white;
          border-radius:8px;
          text-decoration:none;
          font-size:16px;
        ">Reset password</a>
        <p>Link expires in 1 hour.</p>
      `,
    });

    console.log("Reset email response:", response);

  } catch (error) {
    console.error("Reset email error:", error);
  }
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };