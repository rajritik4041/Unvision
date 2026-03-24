import connectDB from "@/config/mongodb"
import User from "@/models/user";
import Otp from "@/models/otp";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";


export async function POST(req) {
  await connectDB()
  const bodyData = await req.json()
  const { username, email, password, gender, first_name, confirmPassword, last_name, date_of_birth, age, country, state, city, otp } = bodyData


  // Validate input fields
  var validationErrors = [
    body("first_name")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters")
      .isAlpha()
      .withMessage("First name must contain only letters")
      .isLength({ max: 30 })
      .withMessage("First name must be less than 30 characters")
      .trim(),

    body("last_name")
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters")
      .isAlpha()
      .withMessage("Last name must contain only letters")
      .isLength({ max: 15 })
      .withMessage("Last name must be less than 15 characters")
      .trim(),

    body("date_of_birth")
      .notEmpty()
      .withMessage("Date of birth is required")
      .trim()
      .isDate()
      .withMessage("Invalid date format"),

    body("age")
      .isInt({ min: 0 })
      .withMessage("Age must be a positive integer")
      .custom((value, { req }) => {
        const dateOfBirth = new Date(bodyData.date_of_birth);
        const today = new Date();
        let calculatedAge = today.getFullYear() - dateOfBirth.getFullYear();
        const monthDiff = today.getMonth() - dateOfBirth.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
        ) {
          calculatedAge--;
        }
        if (calculatedAge !== parseInt(value)) {
          throw new Error("Age does not match date of birth");
        }
        return true;
      }),

    body("gender")
      .notEmpty()
      .withMessage("Gender is required")
      .isIn(["Male", "Female", "Other"])
      .withMessage("Invalid gender value"),

    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 8 })
      .withMessage("Username must be at least 8 characters")
      .isLength({ max: 20 })
      .withMessage("Username must be less than 20 characters")
      .matches(/^[a-z0-9_]+$/)
      .withMessage("Username can only contain lowercase letters, numbers, and underscores")
      .custom(async (value) => {
        const user = await User.findOne({ username: value });
        if (user) {
          throw new Error("Username already exists");
        }
        return true;
      })
      .trim(),

    body("country")
      .notEmpty()
      .withMessage("Country is required"),

    body("state")
      .notEmpty()
      .withMessage("State is required"),

    body("city")
      .notEmpty()
      .withMessage("City is required"),

    body("email")
      .notEmpty().withMessage("Email required")
      .isEmail().withMessage("Invalid email")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email already exists");
        }
        return true;
      }),

    body("otp")
      .notEmpty()
      .withMessage("OTP is required")
      .custom(async (value) => {
        const otpRecord = await Otp.findOne({ email });
        if (!otpRecord) {
          throw new Error("OTP not found");
        }
        if (otpRecord.otp !== value) {
          throw new Error("Invalid OTP");
        }
        return true;
      })
    ,
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .isStrongPassword()
      .withMessage("Password must include upper, lower, number, special char"),

    body("confirmPassword")
      .notEmpty().withMessage("Confirm password required")
      .custom((value) => {
        if (value !== bodyData.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      })
  ];

  const fakeReq = { body: bodyData };

  for (let validation of validationErrors) {
    await validation.run(fakeReq);
  }

  const errors = validationResult(fakeReq);

  console.log("Validation Errors:", errors.array());
  if (!errors.isEmpty()) {
    return Response.json({
      success: false,
      errors: errors.array(),
    });
  }


  const cookieStore = await cookies();
  const csrfTokenFromCookie = cookieStore.get("csrfToken")?.value;
  const csrfTokenFromHeader = req.headers.get("csrf-token");
  if (csrfTokenFromCookie !== csrfTokenFromHeader) {
    return new Response(JSON.stringify({ success: false, message: "Invalid CSRF token" }), {
      headers: { "Content-Type": "application/json" },
      status: 403
    });
  }

  if (!password) {
    return Response.json({
      success: false,
      message: "Password missing",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const colection = await User.create({ first_name, last_name, username, email, date_of_birth, age, country, state, city,   password: hashedPassword })
  if (colection) {
    await Otp.deleteOne({ email });
  }
  return Response.json({
    success: true,
    message: "Signup successful"
  })
}
