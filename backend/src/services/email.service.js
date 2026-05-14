const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to Backend Ledger";

  const text = `
Hello ${name},

Thank you for registering with Backend Ledger.

We are excited to have you on board.

Best regards,
Backend Ledger Team
`;

  const html = `
<p>Hello ${name},</p>

<p>Thank you for registering with Backend Ledger.</p>

<p>We are excited to have you on board.</p>

<p>
Best regards,<br>
Backend Ledger
</p>
`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, type) {
  const subject = `Your account has been ${type === "CREDIT" ? "credited" : "debited"}`;

  const text = `
Hello ${name},

Your account has been ${type === "CREDIT" ? "credited" : "debited"} with an amount of $${amount}.

Best regards,
Backend Ledger Team
`;

  const html = `
<p>Hello ${name},</p>

<p>Your account has been ${type === "CREDIT" ? "credited" : "debited"} with an amount of $${amount}.</p>

<p>
Best regards,<br>
Backend Ledger
</p>
`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, type) {
  const subject = `Transaction Failed: ${type === "CREDIT" ? "Credit" : "Debit"} of $${amount}`;

  const text = `
Hello ${name},

We regret to inform you that your recent transaction of ${type === "CREDIT" ? "crediting" : "debiting"} $${amount} has failed.

Please check your account and try again.

Best regards,
Backend Ledger Team
`;

  const html = `
<p>Hello ${name},</p>

<p>We regret to inform you that your recent transaction of ${type === "CREDIT" ? "crediting" : "debiting"} $${amount} has failed.</p>

<p>Please check your account and try again.</p>

<p>
Best regards,<br>
Backend Ledger
</p>
`;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail,
};
