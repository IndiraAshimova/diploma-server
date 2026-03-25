const { Resend } = require("resend");
const config = require("../config/env");

const resend = new Resend(config.resendApiKey);

const sendVerificationEmail = async (email, token) => {
  const link = `${config.clientUrl}/api/auth/verify-email?token=${token}`;

  await resend.emails.send({
from: "onboarding@resend.dev",
to: email,
    subject: "Подтвердите ваш email",
    html: `
      <h2>Добро пожаловать!</h2>
      <p>Нажмите кнопку ниже, чтобы подтвердить ваш email:</p>
      <a href="${link}" style="
        display:inline-block;
        padding:12px 24px;
        background:#4F46E5;
        color:white;
        border-radius:8px;
        text-decoration:none;
        font-size:16px;
      ">Подтвердить email</a>
      <p>Ссылка действует 24 часа.</p>
    `,
  });
};

const sendPasswordResetEmail = async (email, token) => {
  const link = `${config.clientUrl}/api/auth/reset-password?token=${token}`;

  await resend.emails.send({
from: "onboarding@resend.dev",
to: email,
    subject: "Сброс пароля",
    html: `
      <h2>Сброс пароля</h2>
      <p>Вы запросили сброс пароля. Нажмите кнопку ниже:</p>
      <a href="${link}" style="
        display:inline-block;
        padding:12px 24px;
        background:#DC2626;
        color:white;
        border-radius:8px;
        text-decoration:none;
        font-size:16px;
      ">Сбросить пароль</a>
      <p>Ссылка действует 1 час. Если вы не запрашивали сброс — просто проигнорируйте это письмо.</p>
    `,
  });
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };