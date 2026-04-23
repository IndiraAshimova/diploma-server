const { Resend } = require("resend");
const config = require("../config/env");

const resend = new Resend(config.resendApiKey);

const sendVerificationEmail = async (email, token) => {
  const link = `${config.clientUrl}/api/auth/verify-email?token=${token}`;

  await resend.emails.send({
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
};

const sendPasswordResetEmail = async (email, token) => {
  const link = `${config.clientUrl}/api/auth/reset-password?token=${token}`;

  await resend.emails.send({
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
  <p>Link expires in 1 hour. If you did not request this, ignore this email.</p>

    `,
  });
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };