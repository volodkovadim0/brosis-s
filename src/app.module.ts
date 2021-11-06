import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.strategy';
import { AppGateway } from './app.gateway';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, AppGateway],
})
export class AppModule {
}
