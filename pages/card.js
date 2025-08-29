// pages/index.js
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    cardholder: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">Payment Information</h2>

        {/* Cardholder */}
        <label className="label">Cardholder Name</label>
        <input
          type="text"
          name="cardholder"
          value={formData.cardholder}
          onChange={handleChange}
          className="input"
        />

        {/* Address */}
        <label className="label">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input"
        />

        {/* City */}
        <label className="label">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="input"
        />

        {/* State */}
        <label className="label">State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="input"
        />

        {/* Email */}
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
        />

        {/* Phone */}
        <label className="label">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input"
        />

        <button type="submit" className="button">
          Submit
        </button>
      </form>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background: #f9f9f9;
        }
        .form {
          background: #fff;
          padding: 25px;
          border-radius: 10px;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 20px;
          color: #333;
        }
        .label {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
          color: #666;
        }
        .input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
          background: #fff;
          color: #333;
        }
        .input::placeholder {
          color: #aaa;
        }
        .button {
          width: 100%;
          padding: 12px;
          background: #4caf50;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }
        .button:hover {
          background: #45a049;
        }
        @media (max-width: 600px) {
          .form {
            padding: 20px;
          }
          .title {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
