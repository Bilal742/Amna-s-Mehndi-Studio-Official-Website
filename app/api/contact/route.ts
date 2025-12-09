import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: any) {
    try {
        const { name, email, message } = await req.json();

        const resend = new Resend(process.env.RESEND_API_KEY);

        const data = await resend.emails.send({
            from: "Amna’s Mehndi Studio <onboarding@resend.dev>",
            to: "usmanali.office.pk@gmail.com",
            subject: "New Contact Message",
            html: `
        <h2>New Message from Amna’s Mehndi Studio Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("Email error:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
};
