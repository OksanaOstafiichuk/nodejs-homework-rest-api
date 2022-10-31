const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
const sendMail = async (data) => {
    const mail = { ...data, from: 'Ksu.ostafiichuk@gmail.com' };
    await sgMail.send(mail);
    return true;
}

module.exports = sendMail;