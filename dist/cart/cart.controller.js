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
exports.deleteFromCart = exports.getUserCart = exports.addToCart = void 0;
const cart_model_1 = __importDefault(require("./cart.model"));
const wishlist_model_1 = __importDefault(require("../wishlist/wishlist.model"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, productId } = req.body;
        // Check if the product is already in the cart
        const existingCartItem = yield cart_model_1.default.findOne({ userEmail, productId });
        if (existingCartItem) {
            // If the product is already in the cart, update the quantity
            existingCartItem.quantity += 1;
            yield existingCartItem.save();
            // Remove the product from the wishlist (if it exists)
            yield wishlist_model_1.default.findOneAndDelete({ userEmail, productId });
            return res.status(200).json({
                message: "Product quantity updated in the cart",
            });
        }
        // If the product is not in the cart, add it
        const cartItem = new cart_model_1.default({
            userEmail,
            productId,
        });
        yield cartItem.save();
        // Remove the product from the wishlist (if it exists)
        yield wishlist_model_1.default.findOneAndDelete({ userEmail, productId });
        res.status(201).json({ message: "Product added to the cart successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add product to the cart" });
    }
});
exports.addToCart = addToCart;
const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail } = req.params;
        const cartItems = yield cart_model_1.default.aggregate([
            {
                $match: { userEmail }, // Filter by user's email
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productInfo",
                },
            },
        ]);
        res.status(200).json(cartItems);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch user wishlist" });
    }
});
exports.getUserCart = getUserCart;
const deleteFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.params;
        const deletedItem = yield cart_model_1.default.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found in the Cart" });
        }
        res.status(200).json({ message: "Product removed from cart successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to remove product from cart" });
    }
});
exports.deleteFromCart = deleteFromCart;
//# sourceMappingURL=cart.controller.js.map