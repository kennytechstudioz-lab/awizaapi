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
const dotenv_1 = __importDefault(require("dotenv"));
const operationModel_1 = require("../models/operationModel");
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI_CLOUD || '';
const check = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(MONGO_URI);
    const ops = yield operationModel_1.Operation.find({ operation: 'Production' }).limit(5);
    for (const op of ops) {
        console.log(`id: ${op._id}, type: ${op.type}, productName: ${op.productName}`);
    }
    const ops2 = yield operationModel_1.Operation.find({ productName: { $regex: 'egg', $options: 'i' } }).limit(5);
    for (const op of ops2) {
        console.log(`EGG id: ${op._id}, type: ${op.type}, productName: ${op.productName}`);
    }
    process.exit(0);
});
check();
