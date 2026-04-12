import { randomBytes } from "crypto";

export async function GET() {
  try {
    const token = randomBytes(32).toString("hex");

    return new Response(JSON.stringify({ csrfToken: token }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `csrfToken=${token}; Path=/; HttpOnly; SameSite=Strict ; Secure ;`
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to generate token" }), {
      status: 500,
    });
  }
}