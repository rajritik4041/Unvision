import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.SECRET_KEY || "raghupatiraghavrajaram"
);

export async function verifyToken(token) {
    try {
        if (!token) return null;

        const decoded = jwt.verify(token, SECRET );
        return decoded;
    } catch (error) {
        return null;
    }
}