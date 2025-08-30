import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../auth/roles';
import { Lgu } from '../entities/lgu.entity';
import { User } from '../entities/user.entity';
import { SystemAlert } from '../entities/system-alert.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const lguRepository = app.get<Repository<Lgu>>(getRepositoryToken(Lgu));
  const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
  const systemAlertRepository = app.get<Repository<SystemAlert>>(
    getRepositoryToken(SystemAlert),
  );
  const authService = app.get(AuthService);

  // Clear existing users and system alerts
  await systemAlertRepository.query('TRUNCATE TABLE "system_alerts" CASCADE;');
  await userRepository.query('TRUNCATE TABLE "users" CASCADE;');

  // Check if LGU exists
  let lgu = await lguRepository.findOne({ where: { name: 'Camarines Sur' } });
  if (!lgu) {
    lgu = await lguRepository.save({
      name: 'Camarines Sur',
      region: 'V',
      province: 'Camarines Sur',
    });
  }

  // Check if users exist
  const adminUser = await userRepository.findOne({
    where: { username: 'admin' },
  });
  if (!adminUser) {
    await authService.register(
      'admin',
      'password',
      'admin@example.com',
      UserRole.Admin,
      lgu.id,
    );
  }

  const operatorUser = await userRepository.findOne({
    where: { username: 'operator' },
  });
  if (!operatorUser) {
    await authService.register(
      'operator',
      'password',
      'operator@example.com',
      UserRole.Operator,
      lgu.id,
    );
  }

  const viewerUser = await userRepository.findOne({
    where: { username: 'viewer' },
  });
  if (!viewerUser) {
    await authService.register(
      'viewer',
      'password',
      'viewer@example.com',
      UserRole.Viewer,
      lgu.id,
    );
  }

  await app.close();
}

bootstrap();
