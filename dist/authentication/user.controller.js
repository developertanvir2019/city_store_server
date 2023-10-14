"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("./user.model"));
// User Registration (Signup)
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Check if email already exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new user
        const user = new user_model_1.default({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        // Save the user to the database
        yield user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});
exports.signup = signup;
// User Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Verify the password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Create and send a JWT token for authentication
        const key = "my_secrate_key##4ofajofeiweojfkjal";
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, key, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});
exports.login = login;
//# sourceMappingURL=user.controller.js.map