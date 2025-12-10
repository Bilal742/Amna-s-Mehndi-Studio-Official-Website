import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: any) {
  try {
    const { name, email, phone, service, date, time } = await req.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    const message = `
      New Booking Received:

      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Service: ${service}
      Date: ${date}
      Time: ${time}
    `;

    await resend.emails.send({
      from: "Amna’s Mehndi Studio <onboarding@resend.dev>",
      to: "usmanali.office.pk@gmail.com",
      subject: "New Booking Request",
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Booking Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
