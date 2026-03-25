const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log("[register] попытка регистрации:", email);
    const result = await authService.register(email, username, password);
    console.log("[register] успех:", email);
    res.status(201).json(result);
  } catch (err) {
    console.error("[register] ошибка:", err.message);
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("[login] попытка входа:", email);
    const token = await authService.login(email, password);
    console.log("[login] успех:", email);
    res.json({ token });
  } catch (err) {
    console.error("[login] ошибка:", err.message);
    res.status(400).json({ message: err.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    await authService.verifyEmail(token);
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verified</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .card {
            background: white;
            border-radius: 16px;
            padding: 48px 40px;
            text-align: center;
            max-width: 420px;
            width: 90%;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          }
          .icon {
            width: 72px;
            height: 72px;
            background: #ecfdf5;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            font-size: 36px;
          }
          h1 {
            font-size: 24px;
            font-weight: 700;
            color: #111;
            margin-bottom: 12px;
          }
          p {
            font-size: 15px;
            color: #666;
            line-height: 1.6;
            margin-bottom: 8px;
          }
          .badge {
            display: inline-block;
            margin-top: 24px;
            background: #ecfdf5;
            color: #059669;
            font-size: 13px;
            font-weight: 600;
            padding: 6px 16px;
            border-radius: 999px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">✅</div>
          <h1>Email Verified!</h1>
          <p>Your email has been successfully confirmed.</p>
          <p>You can now log in to your account.</p>
          <span class="badge">✓ Verification complete</span>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(400).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Failed</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .card {
            background: white;
            border-radius: 16px;
            padding: 48px 40px;
            text-align: center;
            max-width: 420px;
            width: 90%;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          }
          .icon {
            width: 72px;
            height: 72px;
            background: #fef2f2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            font-size: 36px;
          }
          h1 {
            font-size: 24px;
            font-weight: 700;
            color: #111;
            margin-bottom: 12px;
          }
          p {
            font-size: 15px;
            color: #666;
            line-height: 1.6;
          }
          .badge {
            display: inline-block;
            margin-top: 24px;
            background: #fef2f2;
            color: #dc2626;
            font-size: 13px;
            font-weight: 600;
            padding: 6px 16px;
            border-radius: 999px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">❌</div>
          <h1>Link Expired</h1>
          <p>This verification link is invalid or has expired.</p>
          <p>Please register again to get a new link.</p>
          <span class="badge">✗ Verification failed</span>
        </div>
      </body>
      </html>
    `);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("[forgotPassword] запрос для:", email);
    const result = await authService.forgotPassword(email);
    console.log("[forgotPassword] успех");
    res.json(result);
  } catch (err) {
    console.error("[forgotPassword] ошибка:", err.message);
    res.status(400).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log("[resetPassword] попытка сброса пароля");
    const result = await authService.resetPassword(token, newPassword);
    console.log("[resetPassword] успех");
    res.json(result);
  } catch (err) {
    console.error("[resetPassword] ошибка:", err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports = { register, login, verifyEmail, forgotPassword, resetPassword };