import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Transaction } from '../models/transactionModel';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI_CLOUD || '';

const migrate = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const transactions = await Transaction.find({ invoiceNumber: { $regex: /^SBG-/ } });
    console.log(`Found ${transactions.length} transactions with SBG- prefix.`);

    let count = 0;
    for (const trx of transactions) {
      if (trx.invoiceNumber.startsWith('SBG-')) {
        const newInvoiceNumber = trx.invoiceNumber.replace(/^SBG-/, 'AWZ-');
        trx.invoiceNumber = newInvoiceNumber;
        await trx.save();
        count++;
      }
    }

    console.log(`Successfully migrated ${count} transactions to AWZ- prefix.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

migrate();
