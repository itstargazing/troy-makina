import { Resend } from "resend";
import { NextResponse } from "next/server";

import { contactConfig } from "@/lib/contact";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email сервис не настроен" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Все поля обязательны" },
        { status: 400 }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: "Troy Makina <onboarding@resend.dev>", // Change this after verifying your domain
      to: [contactConfig.email],
      subject: `Новый запрос от ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #FF6A00; padding-bottom: 10px;">
            Новый запрос с сайта Troy Makina
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 120px;">Имя:</td>
              <td style="padding: 10px; background: #f5f5f5;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;">
                <a href="mailto:${email}" style="color: #0066cc;">${email}</a>
              </td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #FF6A00;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Сообщение:</h3>
            <p style="margin: 0; white-space: pre-wrap; color: #555;">${message}</p>
          </div>
          
          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Это сообщение отправлено с сайта ${contactConfig.companyName}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Ошибка отправки" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}

