import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || "shashankvermahsst@gmail.com";

    // If SMTP credentials aren't set, log it and return a helpful message
    if (!host || !user || !pass) {
      console.warn("SMTP environment variables (SMTP_HOST, SMTP_USER, SMTP_PASSWORD) are not configured.");
      
      // In development/local env, we can simulate success so it doesn't block frontend dev,
      // but let's notify the client that setup is needed.
      if (process.env.NODE_ENV === "development") {
        console.log(`[Dev Mode - Simulated Email Output]:\nFrom: ${name} <${email}>\nTo: ${receiver}\nMessage: ${message}`);
        return NextResponse.json({
          success: true,
          message: "Simulated success in development mode. Set SMTP environment variables for actual delivery.",
        });
      }

      return NextResponse.json(
        { error: "SMTP configuration is missing on the server. Please set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD environment variables." },
        { status: 500 }
      );
    }

    // Create SMTP transport
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${user}>`, // Sender address (many SMTP hosts require this to be the authenticated user)
      to: receiver, // Receiver address
      replyTo: email, // Set Reply-To to the user's actual email address
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #10b981; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #10b981; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
