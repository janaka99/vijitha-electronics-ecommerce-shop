import nodemailer from "nodemailer";

// type Payload = {
//   recipient: string;
//   subject: string;
//   html: string;
// };

const smtpSettings = {
  service: process.env.NEXT_EMAIL_SERVICE,
  auth: {
    user: process.env.NEXT_EMAIL_COMPANY,
    pass: process.env.NEXT_EMAIL_COMPANY_PASS,
  },
};

export const handleEmailFire = async () => {
  const transporter = nodemailer.createTransport({
    ...smtpSettings,
  });

  return transporter;
};

export const sendVerificationEmail = async (user, link) => {
  try {
    let transporter = await handleEmailFire();
    let mailOptions = {
      from: process.env.NEXT_EMAIL_COMPANY,
      to: user,
    };

    const mailres = await transporter.sendMail({
      ...mailOptions,
      subject: "Verification email",
      text: `This is a password reset email`,
      html: `<a href="http://localhost:3000/user/verifyemail?token=${link}" style="background-color: blue; padding: 10px; border-radius: 5px; color: white; font-size: 35px; text-decoration: none;">Verify</a>`,
    });
    return mailres;
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordVerificationEmail = async (user, link) => {
  try {
    let transporter = await handleEmailFire();
    let mailOptions = {
      from: process.env.NEXT_EMAIL_COMPANY,
      to: user,
    };

    const mailres = await transporter.sendMail({
      ...mailOptions,
      subject: "Verification email",
      text: `This is a verification email Please verify your email`,
      html: `<a href="http://localhost:3000/user/reset-password?token=${link}" style="background-color: blue; padding: 10px; border-radius: 5px; color: white; font-size: 35px; text-decoration: none;">Reset</a>`,
    });
    return mailres;
  } catch (error) {
    console.log(error);
  }
};

export const sendOrderUpdate = async (user, name, type, order_id) => {
  let msg = "";
  console.log("reached here ", type, user, name, order_id);
  switch (type) {
    case "Pending":
      msg = `${name}, Your Order ${order_id} was Pending`;
      break;
    case "Confirmed":
      msg = `${name}, Your Order ${order_id} was Confirmed`;
      break;
    case "Processing":
      msg = `${name}, Your Order ${order_id} is Processing`;
      break;
    case "Dispatched":
      msg = `${name}, Your Order ${order_id} was Dispatched`;
  }
  console.log(msg);
  try {
    let transporter = await handleEmailFire();
    let mailOptions = {
      from: process.env.NEXT_EMAIL_COMPANY,
      to: user,
    };
    const mailres = await transporter.sendMail({
      ...mailOptions,
      subject: "Verification email",
      text: `${msg}`,
    });

    return mailres;
  } catch (error) {
    console.log(error);
  }
};

export const passResetSuccess = async (user) => {
  try {
    let transporter = await handleEmailFire();
    let mailOptions = {
      from: process.env.NEXT_EMAIL_COMPANY,
      to: user,
    };
    const mailres = await transporter.sendMail({
      ...mailOptions,
      subject: "Verification email",
      text: `Password Reset Successfull`,
    });

    return mailres;
  } catch (error) {
    console.log(error);
  }
};
