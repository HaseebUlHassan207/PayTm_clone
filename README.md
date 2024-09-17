# Paytm Clone

This project is a clone of Paytm, implemented using React with JavaScript for the frontend and Tailwind CSS for styling. The application provides features such as user registration, sign-in, transaction management, and balance tracking.

## Project Structure

### Backend

The backend folder contains routes for user and account management:

- **`backend/routes/index.js`**: Main route file.
- **`backend/routes/user.js`**: Handles user-related routes:
  - `/signup`: Route for user registration.
  - `/signin`: Route for user sign-in.
  - `/profile`: Route for user profile details.
- **`backend/routes/accounts.js`**: Manages account-related routes:
  - `/balance`: Route for fetching account balance.
  - `/transfer`: Route for transferring funds.

### Frontend

The frontend folder contains the React components and pages:

- **Pages:**
  - **`frontend/pages/SignUp.jsx`**: Page for user registration.
  - **`frontend/pages/SignIn.jsx`**: Page for user sign-in.
  - **`frontend/pages/Dashboard.jsx`**: Page for displaying user dashboard with balance and transaction features.
  - **`frontend/pages/Transaction.jsx`**: Page for managing transactions.

- **Components:**
  - **`frontend/components/Appbar.jsx`**: Navigation bar component.
  - **`frontend/components/Users.jsx`**: Displays user-related information.
  - **`frontend/components/Balance.jsx`**: Displays balance on the dashboard.
  - Additional components for sign-in and sign-up pages.
