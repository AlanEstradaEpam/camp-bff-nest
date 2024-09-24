import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { globalConfig } from './app.config.global';
import { rootModules } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [globalConfig]
    }),
    ...rootModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
