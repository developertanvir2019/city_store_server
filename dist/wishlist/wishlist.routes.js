"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("./wishlist.controller");
const router = express_1.default.Router();
// Add a product to the user's wishlist
router.post("/add", wishlist_controller_1.addToWishlist);
// Get specific user's wishlist products by email
router.get("/user/:userEmail", wishlist_controller_1.getUserWishlist);
router.delete("/:itemId", wishlist_controller_1.deleteFromWishlist);
exports.default = router;
//# sourceMappingURL=wishlist.routes.js.map