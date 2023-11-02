

## 1. Setting Up Environment Variables

Created .env file in the root directory and define the following variables:

- JWT_SECRET = 'Scret'
- DB_URL =  'mongodb+srv://abhishektiwari9720:qgybWqwiaGjRmno2@cluster0.9vzbxsb.mongodb.net/'

## 2. Authentication for this application is done using JWT 
- Upon a successful user login, a token is generated and stored in a cookie.
- Each Subsequent requests to protected routes require JWT token.
- The server validates the token to ensure the user is authenticate

## 3. Mongoose's schema validation.
- Mongoose's schema validation is used to validate fields in the schema. This ensures that the data entered into the database follows the specified structure and rules.

## 4. Here Signup route for teacher is only exposed to only Logged In teacher 
Admin Teacher login 