# User Authentication API Documentation

This documentation covers the user-related endpoints for the Uber Clone Backend. All responses follow a standardized format using the `ApiResponse` class.

## Base URL
The base URL for these routes depends on your server configuration (e.g., `http://localhost:4000/users`).

## Response Format

### Success Response
```json
{
  "statusCode": number,
  "data": object | null,
  "message": "string",
  "success": true
}
```

### Error Response
```json
{
  "success": false,
  "message": "string"
}
```

---

## Endpoints

### 1. Register User
Creates a new user account.

- **URL:** `/register`
- **Method:** `POST`
- **Authentication Required:** No
- **Request Body:**
  | Field | Type | Requirement | Description |
  | :--- | :--- | :--- | :--- |
  | `firstName` | String | Required | Min 3 characters |
  | `lastName` | String | Optional | Min 3 characters |
  | `email` | String | Required | Must be a valid email |
  | `password` | String | Required | Min 6 characters |

---

### 2. Login User
Authenticates a user and returns access/refresh tokens. Access tokens are also set in cookies.

- **URL:** `/login`
- **Method:** `POST`
- **Authentication Required:** No
- **Request Body:**
  | Field | Type | Requirement | Description |
  | :--- | :--- | :--- | :--- |
  | `email` | String | Required | Valid user email |
  | `password` | String | Required | User password |

- **Success Headers:** Sets `accessToken` and `refreshToken` as `HttpOnly` cookies.
- **Success Response Data:**
  ```json
  {
    "userExists": { ...userObject },
    "accessToken": "jwt_token_string",
    "refreshToken": "jwt_token_string"
  }
  ```

---

### 3. Logout User
Logs out the currently authenticated user by clearing cookies and invalidating the refresh token.

- **URL:** `/logout`
- **Method:** `POST`
- **Authentication Required:** Yes (Valid Access Token)
- **Success Action:** Clears `accessToken` and `refreshToken` cookies.

---

### 4. Get User Profile
Retrieves the profile information of the currently logged-in user.

- **URL:** `/profile`
- **Method:** `GET`
- **Authentication Required:** Yes (Valid Access Token)
- **Success Response Data:** Returns the authenticated user object (excluding the password).

---

## Middleware: Authentication

Protected routes require a valid JWT access token. The middleware checks for the token in the following order:
1. **Cookies:** `req.cookies.accessToken`
2. **Headers:** `Authorization: Bearer <token>`

If no token is found or the token is invalid, the API returns a `401 Unauthorized` error.

## Validation
Input validation is handled using `express-validator`. If validation fails, a `400 Bad Request` error is returned with a detailed `errors` array in the response body.