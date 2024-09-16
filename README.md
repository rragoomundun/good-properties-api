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


# AWS SES Region
AWS_SES_REGION=sesregion

# AWS API Access Key
AWS_ACCESS_KEY_ID=accesskeyid

# AWS API Secret Access Key
AWS_SECRET_ACCESS_KEY=secretaccesskey

# AWS S3 Upload Bucket Region
AWS_S3_REGION=s3region

# AWS S3 Upload Image Bucket Name
AWS_S3_IMAGE_BUCKET_NAME=s3bucketname

# AWS S3 Upload Image Bucket Directory
AWS_S3_IMAGE_BUCKET_FOLDER=directory


# From email name
FROM_NAME=Good Properties

# From email adress
FROM_EMAIL=noreply@test.com

# Reply email adress
REPLY_EMAIL=contact@test.com


# JWT Token secret code
JWT_SECRET=secret

# JWT Token duration. On this example it will expire in 180 days
JWT_EXPIRE=180d

# JWT Token cookie duration. The value is in days.
JWT_COOKIE_EXPIRE=180


# The user password minimum length
PASSWORD_MIN_LENGTH=12


# Clear token cron execution date
CLEAR_TOKENS_CRON_DATE=* * * * *


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

- Version: 0.6.0
- Author: Raphaël RAGOOMUNDUN
- License: MIT
