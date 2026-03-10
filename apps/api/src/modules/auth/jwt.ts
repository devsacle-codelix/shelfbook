import jwt from "jsonwebtoken";

// const JWT_SECRET = "supersecret"
const SECRET = process.env.JWT_SECRET!;

export function generateToken(userId: string) {
	console.log("SECRET USED FOR GENERATE:", SECRET);
	return jwt.sign({ id: userId }, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
	try {
		const decoded = jwt.verify(token, SECRET);
		return { valid: true, decoded };
	} catch (error) {
		return { valid: false, error: error };
	}
}
