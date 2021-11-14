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

import { ApiResponserService } from '../../api-responser/api-responser.service';

@Controller('contact')
export class ContactController {
  constructor(
    private _contactService: ContactService,
    private _apiResponser: ApiResponserService,
  ) {}

  @Post('/')
  async createPost(@Res() res, @Body() createContactDTO: CreateContactDTO) {
    const contact = await this._contactService.createContact(createContactDTO);
    return this._apiResponser.successResponse(res, HttpStatus.CREATED, contact);
  }

  @Get('/')
  async getContacts(@Res() res) {
    const contacts = await this._contactService.getContacts();
    return this._apiResponser.successResponse(res, HttpStatus.FOUND, contacts);
  }

  @Get('/:id')
  async getContact(@Res() res, @Param('id') contactID) {
    const contact = await this._contactService.getContact(contactID);
    if (!contact) {
      this._apiResponser.errorResponse(
        res,
        HttpStatus.NOT_FOUND,
        'Contact Not Found',
      );
    }

    return this._apiResponser.successResponse(res, HttpStatus.FOUND, contact);
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
        res,
        HttpStatus.NOT_FOUND,
        'Contact Not Found',
      );
    }

    return this._apiResponser.successResponse(res, HttpStatus.OK, contact);
  }

  @Delete('/:id')
  async deleteContact(@Res() res, @Param('id') contactID) {
    const contact = await this._contactService.deleteContact(contactID);
    if (!contact) {
      this._apiResponser.errorResponse(
        res,
        HttpStatus.NOT_FOUND,
        'Contact Not Found',
      );
    }

    return this._apiResponser.successResponse(res, HttpStatus.OK, contact);
  }
}
