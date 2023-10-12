"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const router = express_1.default.Router();
// Add a product to the user's cart
router.post("/add", cart_controller_1.addToCart);
router.get("/user/:userEmail", cart_controller_1.getUserCart);
router.delete("/:itemId", cart_controller_1.deleteFromCart);
exports.default = router;
//# sourceMappingURL=cart.route.js.map