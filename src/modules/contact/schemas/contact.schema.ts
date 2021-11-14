import { Schema } from 'mongoose';

export const ContactSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
