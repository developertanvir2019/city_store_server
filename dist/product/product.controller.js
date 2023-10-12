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
exports.getProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("./product.model"));
// Create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { img, title, description, category, rating, oldPrice, newPrice } = req.body;
        const product = new product_model_1.default({
            img,
            title,
            description,
            category,
            rating,
            oldPrice,
            newPrice,
        });
        yield product.save();
        res.status(201).json({ message: "Product created successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Product creation failed" });
    }
});
exports.createProduct = createProduct;
// Get all products with optional filtering and search
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, title, page } = req.query;
        const filter = {};
        const perPage = 12;
        if (category) {
            const categoryString = category; // Explicitly cast to string
            filter.category = { $regex: new RegExp(categoryString, "i") }; // Case-insensitive search
        }
        if (title) {
            filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
        }
        const skip = (parseInt(page, 10) - 1) * perPage;
        const products = yield product_model_1.default.find(filter).skip(skip).limit(perPage);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
exports.getProducts = getProducts;
//# sourceMappingURL=product.controller.js.map