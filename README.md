- Create a repository 
- Initialize the repository 
- node_modules , package.json , pacakage-lock.json , json 
-Install express 
- Create a server 
- Request handlers 
- install nodemon and update scripts inside package.json

- initailize git 
- .gitignore 
- playing with route and route extensions ex . /hello , /hello/2 , /xyz 
- order of routes matter a lot 
- Install Postman app and make a workspace/collection > test API call in browser
- Exploring routing and use of ? , + , () , * in the routes 
- Use of regex in routes /a/ , /.*fly$/
- Reading the query params inthe routes 
- Reading the dynamics routes 

- Multiple route handlers - play with code 
- next() 
- next function and errors along with res.send() 
- app.use("/route" , rH1 , [rH2 , rH3 , rH4] , rH5) -> array doesnt matter
- What is a Middleware ? wht do need it .
- How express JS basically handles requests behind the scenes
- difference between app.use and app.all 
- dummy auth middleware for admin
- dummy auth middleware for users 
- error handlers

- connect the applicatoin to the DB "connection-url"
- call the connectionDB function connect to DB before starting the server
- Create a userSchema & user Model 
- Create POST / signup API to add data to database 
- push some documents using API calls from postman
- Error handling using try , catch

- JS objects vs JSON (differnce)
- Add the express.json middleware to your app 
- Make your sign up API dynamic to receive data from the the end user 
- User.findOne with duplicate email ids , which one retured
- API - Get your email 
- API - Feed API-GET/feed - get all the users from the database
- API - delete / update a user 
- Explore the mongoose documentation for model methods
- API - Update the user with email ID


- Explore schematype options from the documentation
- add required , unique , lowercase , min , minLength , trim 
- Add default 
- Create a custom validate function for gender
- Improve the DB schemas - put all validate appropriate validations on each field in the schemas
- Add timestamps to the userSchema
- Add Runvalidators in the option for patch
- Add API level validations on Patch Request & signUp post api
- Data Sanitizing - Add API validation for each field

- Install validator 
- Explore validator library function and use validator funcs for password , email
- NEVER TRUST req.body