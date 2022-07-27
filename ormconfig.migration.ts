/* eslint-disable prettier/prettier */
export const config = {
  type: 'mysql',
  host: 'mysql0.small.pl',
  port: 3306,
  username: 'm1640_grupa17',
  password: 'BaixQ4hHY4Yk.7+5?Qfg5EETRB}S5S',
  database: 'm1640_nest',
  entities: [ __dirname + '/**/**.entity{.ts,.js}', ],
  bigNumberStrings: false,
  logging: true,
  migrations: [ 'src/migrations/*.ts', ],
  cli: {
    migrationsDir: 'migration',
  },
  synchronize: false,
};
