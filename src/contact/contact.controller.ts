import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  HttpStatus,
  Param,
} from '@nestjs/common';

import { CreateContactDTO } from './dto/contact.dto';
import { ContactService } from './contact.service';
@Controller('contact')
export class ContactController {
  constructor(private _contactService: ContactService) {}

  @Post('/')
  async createPost(@Res() res, @Body() createContactDTO: CreateContactDTO) {
    const contact = await this._contactService.createContact(createContactDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Contact has been created successfully',
      contact,
    });
  }

  @Get('/')
  async getContacts(@Res() res) {
    const contacts = await this._contactService.getContacts();
    return res.status(HttpStatus.OK).json(contacts);
  }

  @Get('/:id')
  async getContact(@Res() res, @Param('id') contactID) {
    const contact = await this._contactService.getContact(contactID);
    if (!contact) throw new Error('Contact does not exist!');
    return res.status(HttpStatus.OK).json(contact);
  }

  @Put('/:id')
  async updateContact(
    @Res() res,
    @Body() createContactDTO: CreateContactDTO,
    @Param('id') contactID,
  ) {
    const contact = await this._contactService.updateContact(
      contactID,
      createContactDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Contact has been successfully updated',
      contact,
    });
  }

  @Delete('/:id')
  async deleteContact(@Res() res, @Param('id') contactID) {
    const contact = await this._contactService.deleteContact(contactID);
    return res.status(HttpStatus.OK).json({
      message: 'Contact has been deleted',
      contact,
    });
  }
}
