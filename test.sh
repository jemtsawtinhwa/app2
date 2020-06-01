

### curl -v -d '{"first_name": "CK", "last_name":"Goh", "email":"cheowkwee@gmail.com", "phone_number": "+60126196869", "password": "May@2020"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users/add
curl -v -d "{\"email\": \"cheowkwee@gmail.com\", \"password\": \"abc123\"}" -H "Content-Type: application/json" -X POST http://localhost:3000/api/users/login



curl -v -d '{"id": 9, "first_name": "KC", "last_name":"Goh", "email":"cheowkwee@gmail.com", "phone_number": "+60126196869", "password": "May@2020"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users/update

curl -v -d '{"id": 1}' -H "Content-Type: application/json" -X POST http://localhost:3000/users/id



curl -v  -H "Content-Type: application/json" -X GET http://localhost:3000/api/causes

curl -v -d "{\"id\": \"1\"}" -H "Content-Type: application/json" -X GET http://localhost:3000/api/causes/:id
curl -v -d "{\"id\": \"2\"}" -H "Content-Type: application/json" -X GET http://localhost:3000/api/causes/:id

curl -H "Content-Type: application/json; charset=UTF-8" -d "{\"user_id\": \"1\", \"title\":\"Title5\", \"story\":\"xxx...\", \"visibility \": \"true\", \"cause_type\": \"1\", \"cause_related_1\": \"cause_related_1\", \"cause_related_2\": \"cause_related_2\", \"cause_related_3\": \"cause_related_3\", \"photo\": \"iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAIAAAATPL11AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABKSURBVFhH7c4xDQAgEAAxhPyIf2d4wAG3MjSpgK4z+ytCRagIFaEiVISKUBEqQkWoCBWhIlSEilARKkJFqAgVoSJUhIpQEXqbfQH0os4HJfEMigAAAABJRU5ErkJggg==\", \"beneficiary_flag\": \"true\", \"beneficiary_first_name\": \"Jemt\", \"beneficiary_last_name\": \"tinhwa\", \"beneficiary_email\": \"tinhwa@hotmail.com\", \"created_on\": \"2020-05-18T06:09:07.599Z\", \"updated_on\": \"2020-05-18T06:09:08.599Z\"}" -X POST http://localhost:3000/api/causes/add

curl -v -d "{\"id\": 3, \"title\":\"Title3-update\"，\"beneficiary_email\": \"th@hotmail.com\" }" -H "Content-Type: application/json; charset=UTF-8" -X POST http://localhost:3000/api/causes/update

curl -v -d "{\"id\": \"4\"}" -H "Content-Type: application/json" -X POST http://localhost:3000/api/causes/delete