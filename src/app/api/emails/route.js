// app/api/send-bulk/route.js
import { transporter } from "@/lib/mailer";

export const runtime = "nodejs"; // ensure Node, not edge

export async function POST() {
  try {
    // 1) Fetch users from your local API
    const resp = await fetch("http://localhost:3000/api/user", { cache: "no-store" });
    if (!resp.ok) {
      return new Response(JSON.stringify({ ok: false, error: "Failed to fetch users" }), { status: 500 });
    }
    const data = await resp.json();

    // Accept either [{email, name}] or ["a@x.com", ...]
    const users = Array.isArray(data)
      ? data.slice(0, 100).map(u => (typeof u === "string" ? { email: u, name: "there" } : u))
      : [];

    if (users.length === 0) {
      return new Response(JSON.stringify({ ok: true, sent: 0, detail: "No users found" }), { status: 200 });
    }

    // 2) Send simple emails (basic loop to keep it simple)
    let sent = 0;
    for (const { email, name = "there" } of users) {
      if (!email) continue;
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Hello from our app",
        text: `Hi ${name}, this is a simple test email.`,
        // html: `<p>Hi <b>${name}</b>, this is a simple test email.</p>`,
      });
      sent++;
    }

    return new Response(JSON.stringify({ ok: true, sent }), { status: 200 });
  } catch (e) {
    console.error("send-bulk error:", e);
    return new Response(JSON.stringify({ ok: false, error: "Bulk send failed" }), { status: 500 });
  }
}
