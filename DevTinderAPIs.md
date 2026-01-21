# DevTinder API's

## auth Router
- POST / signUp
- POST / Login
- POST / login

## profile Router
- GET /profile/view
- GET /profile/password
- GET /profile/edit

## ConnectionRequestRouter
- GET /request/send/intersted/:userId
- GET /request/send/ignore/:userId
- GET /request/review/accepted/:userId
- GET /request/review/rejected/:userId

## User Router
- GET /user/connections
- GET /user/feed - get the profiles of other user in instagram
- GET /user/requests/received

Status : ignore , accepted , rejected , intrested .