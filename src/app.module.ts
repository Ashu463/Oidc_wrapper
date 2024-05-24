import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OidcModule } from './oidc/oidc.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DatabaseService } from './database/database.service';
import {CacheModule} from "@nestjs/cache-manager";
import { InteractionService } from './interaction/interaction.service';
// import { InteractionModule } from './interaction/interaction.module';

@Module({
  imports: [OidcModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService, InteractionService],
})
export class AppModule {}
