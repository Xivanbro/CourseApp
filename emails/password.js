const keys = require("../keys")

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "Account recovery",
    html: `
      <h1>Do you forgot password?</h1>
      <p>If not, then just ignore this message</p>
      <p>In other way click on the link below:</p>
      <p><a href="${keys.BASE_URL}/auth/password/${token}">Access recovery</a></p>
    `,
  };
}