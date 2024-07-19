# Good Properties API

API for Good Property Website.

## Configuration

Rename the file **.config.env** to .env and update the values.

### config.env example

```
# The port to use
PORT=5000


# The maximum number of requests per minute (only used in prod mode)
RATE_LIMIT=100


# The database user
DB_USER=username

# The database host
DB_HOST=localhost

# The database name
DB_DATABASE=databasename

# The database password
DB_PASSWORD=123456789

# The database port
DB_PORT=5432


# The application front end url
APP_URL=good-properties.r3tests.net
```

## Migrations

Rename **migrations/config/config.example.json** to **migrations/config/config.json** and update the values.

### config.json example

```
{
  "development": {
    "username": "developmentuser",
    "password": "developmentpassword",
    "database": "developmentdatabase",
    "host": "developmenthost",
    "dialect": "postgres",
    "migrationStorageTableName": "migrations"
  },
  "test": {
    "username": "testuser",
    "password": "testpassword",
    "database": "testdatabase",
    "host": "testhost",
    "dialect": "postgres",
    "migrationStorageTableName": "migrations"
  },
  "production": {
    "username": "productionuser",
    "password": "productionpassword",
    "database": "productiondatabase",
    "host": "productionhost",
    "dialect": "postgres",
    "migrationStorageTableName": "migrations"
  }
}
```

### Commands

```
# Create a new migration called migration-name
npm run migration:create -- --name migration-name

# Apply the migration
npm run migration:migrate

# Cancel the migration
npm run migration:rollback
```

## Run API

```
# Run in development mode
npm run dev

# Run in production mode
npm run prod
```

## Database configuration

Configure the database by creating tables and adding some data.

Warning: this command will delete all previous data. Do a backup to avoid lost of data.

```
npm run dbsetup
```

## Generate documentation

```
npm run gendoc
```

---

- Version: 0.1.0
- Author: Raphaël RAGOOMUNDUN
- License: MIT
