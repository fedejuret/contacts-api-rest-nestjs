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

import { ApiResponser } from '../../helpers/api-responser';

@Controller('contact')
export class ContactController {
  constructor(
    private _contactService: ContactService,
    private _apiResponser: ApiResponser,
  ) {}

  @Post('/')
  async createPost(@Body() createContactDTO: CreateContactDTO) {
    const contact = await this._contactService.createContact(createContactDTO);
    return this._apiResponser.successResponse(HttpStatus.CREATED, contact);
  }

  @Get('/')
  async getContacts() {
    const contacts = await this._contactService.getContacts();
    return this._apiResponser.successResponse(HttpStatus.FOUND, contacts);
  }

  @Get('/:id')
  async getContact(@Param('id') contactID) {
    const contact = await this._contactService.getContact(contactID);
    if (!contact) {
      this._apiResponser.errorResponse(
        HttpStatus.NOT_FOUND,
        'Contact Not Found',
      );
    }

    return this._apiResponser.successResponse(HttpStatus.FOUND, contact);
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

    if (!contact) {
      this._apiResponser.errorResponse(
        HttpStatus.NOT_FOUND,
        'Contact Not Found',
      );
    }

    return this._apiResponser.successResponse(HttpStatus.OK, contact);
  }

  @Delete('/:id')
  async deleteContact(@Res() res, @Param('id') contactID) {
    const contact = await this._contactService.deleteContact(contactID);
    if (!contact) {
      this._apiResponser.errorResponse(
        HttpStatus.NOT_FOUND,
        'Contact Not Found',
      );
    }

    return this._apiResponser.successResponse(HttpStatus.OK, contact);
  }
}
