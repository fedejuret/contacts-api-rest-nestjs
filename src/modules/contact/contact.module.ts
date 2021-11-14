import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ContactSchema } from './schemas/contact.schema';
import { ApiResponserService } from 'src/api-responser/api-responser.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
  ],
  controllers: [ContactController],
  providers: [ContactService, ApiResponserService],
})
export class ContactModule {}
