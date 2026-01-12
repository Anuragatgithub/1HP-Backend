import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

<<<<<<< HEAD
// ✅ Middlewares
app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:3000",
    "https://oneheartproduction.netlify.app",
    "https://idyllic-fudge-58d003.netlify.app", // if frontend live
  ],
  methods: ["POST"],
}));

app.use(express.json());

// ✅ Mail transporter
=======
/* ---------------- CORS ---------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:3000",
      "https://quiet-praline-074788.netlify.app",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

/* ------------- BREVO SMTP ------------- */
>>>>>>> 59c0ab88db52ce3608ef457c17dbf0b2b7f2fbf8
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
<<<<<<< HEAD
});

// ✅ Route
app.post("/send-enquiry", async (req, res) => {
  const { name, email, phone, type, businessType, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"1 Heart Production Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
=======
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
});

/* ------------ HEALTH CHECK ------------ */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* ----------- SEND ENQUIRY (NON-BLOCKING) ----------- */
app.post("/send-enquiry", (req, res) => {
  const { name, email, phone, type, businessType, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false });
  }

  // ✅ FRONTEND KO TURANT RESPONSE
  res.status(200).json({ success: true });

  // 🔥 MAIL BACKGROUND ME
  transporter
    .sendMail({
      from: `"1 Heart Productions" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
>>>>>>> 59c0ab88db52ce3608ef457c17dbf0b2b7f2fbf8
      replyTo: email,
      subject: `New Enquiry - ${type || businessType || "General"}`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "NA"}</p>
        <p><b>Event Type:</b> ${type || "NA"}</p>
        <p><b>Business Type:</b> ${businessType || "NA"}</p>
        <p><b>Message:</b> ${message || "NA"}</p>
      `,
<<<<<<< HEAD
    });

    // ✅ Auto-reply to customer
await transporter.sendMail({
  from: `"1 Heart Productions" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "We received your enquiry – 1 Heart Productions",
  html: `
    <div style="font-family: Arial, sans-serif; line-height:1.6">
      <h3>Hi ${name},</h3>

      <p>Thank you for contacting <b>1 Heart Productions</b>.  
      We have received your enquiry and our team will contact you shortly.</p>

      <p><b>Your Details:</b></p>
      <ul>
        <li><b>Phone:</b> ${phone || "NA"}</li>
        <li><b>Service:</b> ${type || businessType || "General Enquiry"}</li>
      </ul>

      <p>If your requirement is urgent, you may also reach us on WhatsApp.</p>

      <p>Warm Regards,<br>
      <b>Team 1 Heart Productions</b><br>
      📞 +91 91707 27478</p>
    </div>
  `
});


    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ success: false });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
=======
    })
    .then(() => {
      console.log("✅ Mail triggered in background");
    })
    .catch((err) => {
      console.error("❌ Mail error:", err.message);
    });
});

/* ------------- SERVER ------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
>>>>>>> 59c0ab88db52ce3608ef457c17dbf0b2b7f2fbf8
});
