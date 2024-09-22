#!/usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const program = new Command();
const prompt = inquirer.createPromptModule();

const TOKEN_FILE = path.join(__dirname, 'token.json');
let token = null;

const USERS_DB = {
  admin: 'admin',
};

const saveToken = (tokenValue) => {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify({ token: tokenValue }));
};

const loadToken = () => {
  if (fs.existsSync(TOKEN_FILE)) {
    const data = fs.readFileSync(TOKEN_FILE);
    const { token: savedToken } = JSON.parse(data);
    token = savedToken;
  }
};

const login = async () => {
  try {
    const answers = await prompt([
      { type: 'input', name: 'username', message: 'Введите имя пользователя:' },
      {
        type: 'password',
        name: 'password',
        message: 'Введите пароль:',
        mask: '*',
      },
    ]);

    const userPassword = USERS_DB[answers.username];
    if (userPassword && userPassword === answers.password) {
      token = 'fake-jwt-token';
      saveToken(token);
      console.log('Успешная авторизация!');
    } else {
      console.error('Неверные логин или пароль!');
    }
  } catch (error) {
    if (error.isTtyError) {
      console.error('Ошибка: Не удается отобразить запрос в текущей среде.');
    } else {
      console.log('\nУдачи! Вы вышли из приложения.');
      process.exit();
    }
  }
};

const checkAuthorization = () => {
  loadToken();
  if (!token) {
    console.error('Ошибка: Вы не авторизованы. Сначала выполните login.');
    process.exit(1);
  }
};

const fetchItems = () => {
  checkAuthorization();
  const items = [
    { id: 1, name: 'Элемент 1' },
    { id: 2, name: 'Элемент 2' },
  ];
  console.log('Список элементов:', items);
};

const getItem = (id) => {
  checkAuthorization();
  const item = { id, name: `Элемент ${id}` };
  console.log('Элемент:', item);
};

const updateItem = (id, newData) => {
  checkAuthorization();
  console.log(`Элемент с ID ${id} обновлен данными:`, newData);
};

program.command('login').description('Авторизация пользователя').action(login);

program
  .command('list')
  .description('Получить список элементов')
  .action(fetchItems);

program
  .command('get <id>')
  .description('Получить элемент по ID')
  .action(getItem);

program
  .command('update <id> <data>')
  .description('Обновить элемент по ID')
  .action((id, data) => {
    const newData = JSON.parse(data);
    updateItem(id, newData);
  });

program
  .command('help')
  .description('Показать справку')
  .action(() => {
    console.log(`
Использование:

  node-otus-cli <command>

Команды:

  login                           Авторизация пользователя
  list                            Получить список элементов
  get <id>                        Получить элемент по ID
  update <id> <data>             Обновить элемент по ID

Пример использования:

  node-otus-cli login            # Логин: admin, Пароль: password123
  node-otus-cli list             # Должен показать список элементов
  node-otus-cli get 1            # Получить элемент с ID 1
  node-otus-cli update 1 '{"name": "Updated Name"}'  # Обновить элемент
    `);
  });

program.parse(process.argv);
