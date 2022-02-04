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
# bring up Docker stack with Mongo
docker-compose up -d
npm run dev
```

testing protected end points

```sh
# user login and getting JWT
curl -X POST http://localhost:4001/login -H 'Content-Type: application/json' -d '{"email":"test@example.com", "password":"1234567"}'

# add a book POST request
curl -X POST http://localhost:4001/book -H 'Content-Type: application/json' -H 'x-access-token: ' -d '{"title":"cool title"}'

# list books not protected route
curl -X GET http://localhost:4001/books

# Delete book
curl -X DELETE http://localhost:4001/book/61fd468bf8f3c544d6adb6b7 -H 'x-access-token: '
```

