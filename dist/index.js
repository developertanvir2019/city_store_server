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
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const user_router_1 = __importDefault(require("./authentication/user.router"));
const product_routes_1 = __importDefault(require("./product/product.routes"));
const wishlist_routes_1 = __importDefault(require("./wishlist/wishlist.routes"));
const cart_route_1 = __importDefault(require("./cart/cart.route"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
const port = process.env.PORT || 5000;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(" city store server is running ");
}));
app.use("/api/user", user_router_1.default);
app.use("/api/product", product_routes_1.default);
app.use("/api/wishlist", wishlist_routes_1.default);
app.use("/api/cart", cart_route_1.default);
app.all("*", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return next(new Error("Invalid route"));
}));
app.use((err, req, res, next) => {
    res.json({
        message: err.message || "an unknown error occurred!",
    });
});
// Connecting to Mongodb
const uri = "mongodb+srv://city_owner:city_owner@cluster0.kigilpn.mongodb.net/city_store";
const initializeConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(uri);
        console.log("Connected to MongoDb");
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeConfig();
    console.log(`Listening on port ${port}!!!!!`);
}));
//# sourceMappingURL=index.js.map