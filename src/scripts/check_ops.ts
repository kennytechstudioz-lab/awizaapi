import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Operation } from '../models/operationModel';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI_CLOUD || '';

const check = async () => {
  await mongoose.connect(MONGO_URI);
  const ops = await Operation.find({ operation: 'Production' }).limit(5);
  for (const op of ops) {
    console.log(`id: ${op._id}, type: ${op.type}, productName: ${op.productName}`);
  }
  const ops2 = await Operation.find({ productName: { $regex: 'egg', $options: 'i' } }).limit(5);
  for (const op of ops2) {
    console.log(`EGG id: ${op._id}, type: ${op.type}, productName: ${op.productName}`);
  }
  process.exit(0);
}

check();
