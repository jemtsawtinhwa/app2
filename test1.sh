

### curl -v -d '{"username":"t2", "email":"cheowkwee@gmail.com", "mobile_number": "+6012 619 6868", "password": "May@2020"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users/add

curl -v -d '{"id": 1, "user_id": "1", "title":"Title1", "story":"xxx...", "visibility ": "true", "cause_type": "1", "cause_related_1": "a", "cause_related_2": "2", "cause_related_3": "3", "photo": "base64", "beneficiary_flag": "true", "beneficiary_first_name": "Goh", "beneficiary_last_name ": "CS", "beneficiary_email": "csgoh@hotmail.com", "created_on": "2020-05-18T06:09:07.599Z", "updated_on": "2020-05-18T06:09:08.599Z"}' -H "Content-Type: application/json" -X GET http://localhost:3000/users

curl -v -d "{\"id\": \"1\"}" -H "Content-Type: application/json" -X GET http://localhost:3000/causes



curl -H "Content-Type: application/json; charset=UTF-8" -d "{\"id\": \"9\", \"user_id\": \"1\", \"title\":\"Title3\", \"story\":\"xxx...\", \"visibility \": \"true\", \"cause_type\": \"1\", \"cause_related_1\": \"cause_related_1\", \"cause_related_2\": \"cause_related_2\", \"cause_related_3\": \"cause_related_3\", \"photo\": \"iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAIAAAATPL11AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABKSURBVFhH7c4xDQAgEAAxhPyIf2d4wAG3MjSpgK4z+ytCRagIFaEiVISKUBEqQkWoCBWhIlSEilARKkJFqAgVoSJUhIpQEXqbfQH0os4HJfEMigAAAABJRU5ErkJggg==\", \"beneficiary_flag\": \"true\", \"beneficiary_first_name\": \"Jemt\", \"beneficiary_last_name\": \"tinhwa\", \"beneficiary_email\": \"tinhwa@hotmail.com\", \"created_on\": \"2020-05-18T06:09:07.599Z\", \"updated_on\": \"2020-05-18T06:09:08.599Z\"}" -X POST http://localhost:3000/causes/add

curl -H "Content-Type: application/json; charset=UTF-8" -d "{\"user_id\": \"1\", \"title\":\"Title3\", \"story\":\"xxx...\", \"visibility \": \"true\", \"cause_type\": \"1\", \"cause_related_1\": \"cause_related_1\", \"cause_related_2\": \"cause_related_2\", \"cause_related_3\": \"cause_related_3\", \"photo\": \"iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAIAAAATPL11AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABKSURBVFhH7c4xDQAgEAAxhPyIf2d4wAG3MjSpgK4z+ytCRagIFaEiVISKUBEqQkWoCBWhIlSEilARKkJFqAgVoSJUhIpQEXqbfQH0os4HJfEMigAAAABJRU5ErkJggg==\", \"beneficiary_flag\": \"true\", \"beneficiary_first_name\": \"Jemt\", \"beneficiary_last_name\": \"tinhwa\", \"beneficiary_email\": \"tinhwa@hotmail.com\", \"created_on\": \"2020-05-18T06:09:07.599Z\", \"updated_on\": \"2020-05-18T06:09:08.599Z\"}" -X POST http://localhost:3000/causes/add

curl -v -d "{\"id\": \"1\", \"title\":\"Title1-update\"，\"beneficiary_email\": \"th@hotmail.com\" }" -H "Content-Type: application/json" -X GET http://localhost:3000/causes/update

curl -v -d "{\"id\": \"3\"}" -H "Content-Type: application/json" -X GET http://localhost:3000/causes/delete




curl -v -d "{\"id\": \"1\", \"title\":\"Title1-update\"}" -H "Content-Type: application/json" -X GET http://localhost:3000/actions/update

curl -H "Content-Type: application/json; charset=UTF-8" -d "{\"cause_id\": \"2\", \"action_type \":\"3\", \"action_id\":\"1\", \"title\": \"action title\", \"description\": \"new cause action for...\"}" -X POST http://localhost:3000/actions/add

curl -v -d "{\"id\": \"1\"}" -H "Content-Type: application/json" -X GET http://localhost:3000/actions/delete
