import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Contact } from './interfaces/contact.interface';
import { CreateContactDTO } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(@InjectModel('Contact') private contactModel: Model<Contact>) {}

  async getContacts(): Promise<Contact[]> {
    return await this.contactModel.find().exec();
  }

  async getContact(id: string): Promise<Contact> {
    return await this.contactModel.findById(id);
  }

  async createContact(createContactDTO: CreateContactDTO): Promise<Contact> {
    const newContact = new this.contactModel(createContactDTO);
    return await newContact.save();
  }

  async deleteContact(id: string): Promise<Contact> {
    return await this.contactModel.findByIdAndRemove(id);
  }

  async updateContact(
    id: string,
    createContactDTO: CreateContactDTO,
  ): Promise<Contact> {
    return await this.contactModel.findByIdAndUpdate(id, createContactDTO, {
      new: true,
    });
  }
}
