import { Document } from 'mongoose';

export interface Contact extends Document {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly created_at: Date;
}
