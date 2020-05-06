export = {
  development: {
    client: 'pg',
    connection: {
      database: 'measure_prj',
      user: 'postgres',
      password: '0000'
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    }
  }
}
