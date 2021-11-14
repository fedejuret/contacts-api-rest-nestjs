import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './modules/contact/contact.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ContactModule,
    MongooseModule.forRoot('mongodb://localhost/contacts-nest-ms'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
