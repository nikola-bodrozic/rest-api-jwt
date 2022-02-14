# REST API with JWT

## Set Up

content of .env file

```text
API_PORT=4001
MONGO_URI=mongodb://root:example@localhost:27017/admin
JWT_SERVER_SECRET=s9RaZepGwd20NXTgMNUJy92qQKHzurb9
JWT_EXPIRES_IN=1d
```

Install and run

```sh
npm install
# bring up Docker stack with Mongo & Mongo Express
docker-compose up -d
npm start
```

## Testing End Points

```sh
# create user
curl -X POST http://localhost:4001/api/user/register -H 'Content-Type: application/json' -d '{"name":"test123", "email":"test@example.com", "password":"1234567"}'

# user login and getting JWT
curl -i -X POST http://localhost:4001/api/user/login -H 'Content-Type: application/json' -d '{"email":"test@example.com", "password":"1234567"}'

# add a book POST request on protected route
curl -X POST http://localhost:4001/api/books -H 'Content-Type: application/json' -H 'Authorization: Bearer ' -d '{"title":"cool title"}'

# list books not protected route
curl -X GET http://localhost:4001/api/books | jq

# get single book
curl -X GET http://localhost:4001/api/books/BOOKID -H 'Content-Type: application/json'

# Delete book
curl -X DELETE http://localhost:4001/api/books/BOOKID -H 'Content-Type: application/json' -H 'Authorization: Bearer '
```

