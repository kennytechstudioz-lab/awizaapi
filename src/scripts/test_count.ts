import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Operation } from '../models/operationModel';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI_CLOUD || '';

const check = async () => {
  await mongoose.connect(MONGO_URI);
  const count = await Operation.countDocuments({ operation: 'Production' });
  console.log('Total Production Operations:', count);
  process.exit(0);
}

check();
