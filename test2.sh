

### curl -v -d '{"first_name": "CK", "last_name":"Goh", "email":"cheowkwee@gmail.com", "phone_number": "+60126196869", "password": "May@2020"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users/add

curl -v -d '{"id": 2, "first_name": "KC", "last_name":"Goh", "email":"cheowkwee@gmail.com", "phone_number": "+60126196869", "password": "May@2020"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users/update
