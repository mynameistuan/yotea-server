import nodemailer from "nodemailer";

export const sendMail = async (req, res) => {
  try {
    const { to_name, to_email, subject, content } = req.body;

    if (!to_name || !to_email || !subject || !content) {
      return res.status(404).json({
        status: false,
        message: "Vui lòng nhập đầy đủ các trường",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `Yotea <${process.env.GMAIL_USER}>`,
      to: `${to_name} <${to_email}>`,
      subject,
      html: content,
    });

    res.json({
      status: true,
      payload: {
        info,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
