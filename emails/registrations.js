const keys = require("../keys")

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "New account defined",
    html: `
      <h1>Congratulations</h1>
      <p>You have been successful created  account in our shop with email - ${email}</p>
      <hr />
      <a href="${keys.BASE_URL}">Our website</a>
    `,
  };
}