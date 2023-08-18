# weather-sensor

To try the authenticated endpoints first login with the user:
email: 'admin@admin.com',
password: 'pass',
Then paste the "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX..." at authentication header Bearer Token.

## Steps to run the project:

- if you haven't already: copy `.env.example` to `.env` at the project folder level.

```bash
$ cd ./docker
# Db and application will start, at mac the first time it takes some time due to the copy of the volumes.
$ docker-compose up
```
