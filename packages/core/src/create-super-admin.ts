import { MikroORM } from '@mikro-orm/core';
import * as readline from 'readline';

import Settings from './config/mikro-orm/settings';
import { Role } from './modules/role/role.entity';
import { User } from './modules/user/user.entity';

const getInput = async (question: string, hide = false) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const hideChar = () => {
    const len = rl.line.length;
    // move cursor back to the beginning of the input:
    readline.moveCursor(process.stdout, -len, 0);
    // clear everything to the right of the cursor:
    readline.clearLine(process.stdout, 1);
    // replace the original input with asterisks:
    for (let i = 0; i < len; i++) {
      process.stdout.write('*');
    }
  };

  if (hide) {
    process.stdin.on('keypress', hideChar);
  }

  const answer: string = await new Promise((res) => rl.question(question, res));

  process.stdin.off('keypress', hideChar);

  rl.close();

  return answer;
};

type SuperAdminInput = {
  email: string;
  password: string;
};

process.on('SIGINT', function () {
  console.log('hi');
});

const createSuperAdmin = async ({ email, password }: SuperAdminInput) => {
  const orm = await MikroORM.init({ ...Settings, entities: [Role, User] });
  try {
    const roleRepo = orm.em.getRepository(Role);
    const userRepo = orm.em.getRepository(User);

    let adminRole = await roleRepo.findOne({ isAdmin: true });

    if (!adminRole) {
      adminRole = roleRepo.create({
        isAdmin: true,
        name: 'Superadmin',
        permissions: [],
      });

      orm.em.persist(adminRole);
    }

    const user = userRepo.create({
      email,
      password,
      firstname: 'Super',
      lastname: 'Admin',
      role: adminRole,
    });

    await orm.em.persistAndFlush(user);
  } catch (e) {
    await orm.close();
    console.error(e);
    process.exit();
  }

  await orm.close();
};

const main = async () => {
  const email = await getInput('Email: ');

  const password = await getInput('Password: ', true);
  const confirmPassword = await getInput('Confirm password: ', true);

  if (password !== confirmPassword) {
    console.log(`\nPasswords doesn't match. Exiting...`);
    process.exit();
  }

  await createSuperAdmin({ email, password });

  console.log(`Superadmin created!`);
};

main();
