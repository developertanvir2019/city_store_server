"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// Create a new product
router.post("/create", product_controller_1.createProduct);
// Get all products
router.get("/list", product_controller_1.getProducts);
exports.default = router;
//# sourceMappingURL=product.routes.js.map