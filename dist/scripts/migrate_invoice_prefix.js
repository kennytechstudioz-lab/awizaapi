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
const transactionModel_1 = require("../models/transactionModel");
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI_CLOUD || '';
const migrate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        const transactions = yield transactionModel_1.Transaction.find({ invoiceNumber: { $regex: /^SBG-/ } });
        console.log(`Found ${transactions.length} transactions with SBG- prefix.`);
        let count = 0;
        for (const trx of transactions) {
            if (trx.invoiceNumber.startsWith('SBG-')) {
                const newInvoiceNumber = trx.invoiceNumber.replace(/^SBG-/, 'AWZ-');
                trx.invoiceNumber = newInvoiceNumber;
                yield trx.save();
                count++;
            }
        }
        console.log(`Successfully migrated ${count} transactions to AWZ- prefix.`);
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
migrate();
