# REST API with JWT

content of .env file

```
API_PORT=4001
MONGO_URI=mongodb://root:example@localhost:27017/admin
TOKEN_KEY=random4654434hbgh
```

set up

```sh
npm install
npm run dev
# bring up Docker stack with Mongo
docker-compose up
```

testing protected end point

```sh
# register user
curl -X POST http://localhost:4001/register -H 'Content-Type: application/json' -d '{"first_name":"foo","last_name":"bar", "email":"qw@qw.io", "password":"1234567"}'

# user login and getting JWT
curl -X POST http://localhost:4001/login -H 'Content-Type: application/json' -d '{"email":"qw@qw.io", "password":"1234567"}'

# pass JWT in header
curl -X GET http://localhost:4001/welcome -H 'Content-Type: application/json' -H 'Content-Type: application/json' -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFmYzg4Mjc0MzEyODU3ZTUyYTJkYTI4IiwiZW1haWwiOiJxd0Bxdy5pbyIsImlhdCI6MTY0Mzk0MDE5OCwiZXhwIjoxNjQzOTQ3Mzk4fQ.zCrwuFnyDdVXWT0Fc6BqguEi7nlwE6I4Ci-ib79F328'
```
