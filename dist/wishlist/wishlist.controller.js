"use strict";
// wishlist.controller.js
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
exports.deleteFromWishlist = exports.getUserWishlist = exports.addToWishlist = void 0;
const wishlist_model_1 = __importDefault(require("./wishlist.model"));
// Add a product to the user's wishlist
const addToWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, productId } = req.body;
        const wishlistItem = new wishlist_model_1.default({
            userEmail,
            productId,
        });
        yield wishlistItem.save();
        res.status(201).json({ message: "Product added to wishlist successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add product to wishlist" });
    }
});
exports.addToWishlist = addToWishlist;
// Get specific user's wishlist products
const getUserWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail } = req.params;
        const wishlistItems = yield wishlist_model_1.default.aggregate([
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
        res.status(200).json(wishlistItems);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch user wishlist" });
    }
});
exports.getUserWishlist = getUserWishlist;
const deleteFromWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.params;
        const deletedItem = yield wishlist_model_1.default.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found in the wishlist" });
        }
        res
            .status(200)
            .json({ message: "Product removed from wishlist successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to remove product from wishlist" });
    }
});
exports.deleteFromWishlist = deleteFromWishlist;
//# sourceMappingURL=wishlist.controller.js.map