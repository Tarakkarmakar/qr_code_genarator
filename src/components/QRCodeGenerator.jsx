import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./QrScan.css"
const QRCodeGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
  });

  const [qrValue, setQrValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrRef, setQrRef] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const structured = `
    Name: ${formData.name}
    Age: ${formData.age}
    Email: ${formData.email}
  `;

  // Simulate loading QR code generation
  setTimeout(() => {
    // Set the QR value with the structured string
    setQrValue(structured.trim()); 
    setLoading(false);
  }, 1000);
  };

  // Function to download the QR Code
  const downloadQRCode = () => {
    if (qrRef) {
      const canvas = qrRef.querySelector("canvas");
      const dataURL = canvas.toDataURL("image/png"); 
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "qr-code.png"; 
      link.click(); 
    }
  };

  return (
    <div className="container">
   
      <div className="form-container">
        <h2>QR Code Generator</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit">Generate QR Code</button>
        </form>
      </div>


      <div className="qr-container" ref={setQrRef}>
        {loading ? (
          <p>Generating QR...</p>
        ) : qrValue ? (
          <QRCodeCanvas value={qrValue} size={200} />
        ) : (
          <p>Enter details & submit to generate QR</p>
        )}
      </div>


      {qrValue && !loading && (
        <button onClick={downloadQRCode} className="download-btn">
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QRCodeGenerator;
