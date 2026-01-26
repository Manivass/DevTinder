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

- Validata data in Signup API 
- Install bcrypt package 
- Create  Password Hash using bcrypt.hash & save the user is excrupted password

- Install cookie-pareser
- just send a dummy cooker to the user
- create GET / profile  API and check if the is comming back or not 
- install jsonwebtoken
- in login API , after password validation , email validation , create a token and send to user using a cookie
- read the cookies inside your Profile API and find the logger in the user
- userAuth Middleware 
- add the userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and contains to 1 day

- Explore Tinder API 
- Create a list of all api
- Group multiple routes under respective routers
- Read documentaiton for express.js
- create route folder for managing auth , profile , request routers
- create authRouter , profilerRouter , requestRouter
- Import these routers in app.js
- Create POST/logout API
- Create PATCH /profile/edit
- Make you validate all data in ever POST ,PATCH apis

- Create a connection Request Schema
- Send Connection Request 
- Proper validation Data
- Think about All corner case
- mongoDB query($or , $and)
- schema.pre("save") function
- Read more about indexes 
- Why you need index in DB
- What is the advantage and disadvantage of creating ?
- Read the article about compund indexes

- create a connection accpet/reject api
- ref and pop in mongoose
- creating user/request/received api and user/connections api