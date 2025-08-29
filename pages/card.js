export default function CardForm() {
  return (
    <div className="container">
      <div className="card">
        {/* Logo */}
        <h1 className="logo">Cash App</h1>

        {/* Title */}
        <h2 className="title">Link bank using your debit card</h2>
        <p className="subtitle">
          Linking an external account allows you to move money in and out of
          your Cash App balance.
        </p>

        {/* Form */}
        <form className="form">
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            className="input"
          />

          <div className="row">
            <input type="text" placeholder="MM/YY" className="input" />
            <input type="text" placeholder="123" className="input" />
            <input type="text" placeholder="12345" className="input" />
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

      {/* CSS langsung di sini */}
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: black;
          color: white;
        }

        .card {
          width: 100%;
          max-width: 400px;
          padding: 24px;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 24px;
        }

        .title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .subtitle {
          color: #888;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input {
          background: #111;
          color: white;
          padding: 12px;
          border-radius: 8px;
          border: none;
          outline: none;
          font-size: 14px;
        }

        .input::placeholder {
          color: #666;
        }

        .row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .buttons {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .skip {
          flex: 1;
          padding: 12px;
          border-radius: 9999px;
          background: #333;
          color: white;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .skip:hover {
          background: #444;
        }

        .continue {
          flex: 1;
          padding: 12px;
          border-radius: 9999px;
          background: #22c55e;
          color: white;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .continue:hover {
          background: #16a34a;
        }
      `}</style>
    </div>
  );
}
