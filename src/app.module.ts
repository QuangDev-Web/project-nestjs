import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: 'db' (không phải localhost) vì container app sẽ kết nối đến container db.
      host: 'db',// tên service trong docker-compose
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'testdb',
      autoLoadEntities: true,
      synchronize: true,// chỉ dùng trong dev
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
  ],
})
export class AppModule {}