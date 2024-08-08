import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot('YOUR_MONGODB_CONNECTION_STRING'),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}