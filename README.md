# MedixLink

MedixLink is an innovative health management platform designed to streamline patient care, enhance communication between healthcare providers, and improve access to health records and insurance information. With MedixLink, patients can manage appointments, view their medical history, monitor their health, and access telemedicine services, all from the comfort of their home.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Subscription Packages](#subscription-packages)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview
MedixLink is built to provide a seamless experience for patients, healthcare providers, and insurance companies. The app integrates various functionalities to ensure that users have easy access to their medical records, can book appointments, and communicate effectively with their healthcare providers. Additionally, it offers real-time insurance balance checks and supports telemedicine consultations.

## Features
- **User Registration and Profile Management**
- **Appointment Booking and Management**
- **Health Records Access**
- **Emergency Access to Health Records**
- **Insurance Integration (NHIF, SHA, SHIF)**
- **Telemedicine Consultations**
- **Health Monitoring and Analytics**
- **Medication Reminders**
- **Health Tips and Alerts**
- **Integration with Wearable Devices**
- **Customer Support and Priority Assistance**

## Subscription Packages
1. **Basic Package (Free)**
   - User Registration and Profile Management
   - View Appointments and Basic Health Records
   - Medication Reminders
   - Health Tips and Alerts

2. **Standard Package (Paid)**
   - All Basic Package Features
   - Appointment Booking and Management
   - Health Monitoring and Analytics
   - Access to Detailed Medical Records and History
   - Emergency Access to Health Records
   - Insurance Integration (NHIF, SHA, SHIF)

3. **Premium Package (Paid)**
   - All Standard Package Features
   - Telemedicine Consultations
   - Detailed Health Analytics and Personalized Recommendations
   - Integration with Wearable Devices
   - Detailed Reports and Data Analytics
   - Customer Support and Priority Assistance

## Technologies Used
- **Frontend**: React, Redux, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Passport.js, JWT
- **Payments**: Stripe
- **Real-time Communication**: Socket.io
- **APIs**: RESTful APIs, FHIR (Fast Healthcare Interoperability Resources)
- **Deployment**: Docker, Kubernetes, Vercel, AWS
- **Testing**: Jest, Mocha, Chai

## Project Structure
```plaintext
medixlink/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── passport.js
│   │   └── jwt.js
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   ├── authController.js
│   │   ├── healthRecordController.js
│   │   ├── insuranceController.js
│   │   ├── telemedicineController.js
│   │   ├── transactionController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── HealthRecord.js
│   │   ├── Insurance.js
│   │   ├── Telemedicine.js
│   │   ├── Transaction.js
│   │   └── User.js
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   ├── authRoutes.js
│   │   ├── healthRecordRoutes.js
│   │   ├── insuranceRoutes.js
│   │   ├── telemedicineRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── insuranceService.js
│   │   ├── paymentService.js
│   │   └── telemedicineService.js
│   ├── utils/
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── validators.js
│   ├── .env
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   │   └── logo.png
│   │   │   └── styles/
│   │   │       ├── main.css
│   │   │       └── theme.css
│   │   ├── components/
│   │   │   ├── Appointment/
│   │   │   │   ├── AppointmentList.js
│   │   │   │   ├── AppointmentForm.js
│   │   │   │   └── AppointmentDetails.js
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.js
│   │   │   │   └── StatsCard.js
│   │   │   ├── HealthRecords/
│   │   │   │   ├── HealthRecordsList.js
│   │   │   │   ├── HealthRecordDetails.js
│   │   │   │   └── AddHealthRecord.js
│   │   │   ├── Insurance/
│   │   │   │   ├── InsuranceDetails.js
│   │   │   │   ├── InsuranceForm.js
│   │   │   │   └── InsuranceBalance.js
│   │   │   ├── Profile/
│   │   │   │   ├── ProfileView.js
│   │   │   │   ├── ProfileEdit.js
│   │   │   │   └── ChangePassword.js
│   │   │   ├── Telemedicine/
│   │   │   │   ├── TelemedicineSession.js
│   │   │   │   ├── TelemedicineHistory.js
│   │   │   │   └── StartTelemedicine.js
│   │   │   ├── Transactions//
│   │   │   │   ├── PackageSelection.js
│   │   │   │   ├── PaymentForm.js
│   │   │   │   └── TransactionHistory.js
│   │   │   ├── common/
│   │   │   │   ├── Header.js
│   │   │   │   ├── Footer.js
│   │   │   │   ├── Sidebar.js
│   │   │   │   └── Loader.js
│   │   │   ├── layout/
│   │   │   │   ├── MainLayout.js
│   │   │   │   └── AuthLayout.js
│   │   ├── pages/
│   │   │   ├── AppointmentPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── HealthRecordsPage.js
│   │   │   ├── InsurancePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── ProfilePage.js
│   │   │   └── TelemedicinePage.js
│   │   │   └── TransactionPage.js
│   │   ├── redux/
│   │   │   ├── actions/
│   │   │   │   ├── appointmentActions.js
│   │   │   │   ├── authActions.js
│   │   │   │   ├── healthRecordActions.js
│   │   │   │   ├── insuranceActions.js
│   │   │   │   ├── profileActions.js
│   │   │   │   └── telemedicineActions.js
│   │   │   │   └── transactionActions.js
│   │   │   ├── reducers/
│   │   │   │   ├── appointmentReducer.js
│   │   │   │   ├── authReducer.js
│   │   │   │   ├── healthRecordReducer.js
│   │   │   │   ├── insuranceReducer.js
│   │   │   │   ├── profileReducer.js
│   │   │   │   └── telemedicineReducer.js
│   │   │   │   └── transactionReducer.js
│   │   │   ├── store.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── setupProxy.js
│   │   └── package.json
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   ├── SYSTEM_DESIGN.md
│   └── USER_GUIDE.md
├── .gitignore
├── README.md
└── LICENSE
```

### Explanation of the Project Structure

#### Backend
- `backend/config/`
  - `db.js`: Database configuration and connection setup.
  - `passport.js`: Passport.js configuration for authentication.
  - `jwt.js`: Configuration for JSON Web Tokens (JWT).

- `backend/controllers/`
  - `

appointmentController.js`: Handles CRUD operations for appointments.
  - `authController.js`: Manages user authentication and authorization.
  - `healthRecordController.js`: Manages CRUD operations for health records.
  - `insuranceController.js`: Handles insurance-related operations.
  - `telemedicineController.js`: Manages telemedicine sessions and history.
  - `transactionController.js`: Handles payment transactions and package selection.
  - `userController.js`: Manages user profiles and related operations.

- `backend/models/`
  - `Appointment.js`: Mongoose schema for appointments.
  - `HealthRecord.js`: Mongoose schema for health records.
  - `Insurance.js`: Mongoose schema for insurance data.
  - `Telemedicine.js`: Mongoose schema for telemedicine sessions.
  - `Transaction.js`: Mongoose schema for transactions.
  - `User.js`: Mongoose schema for user profiles.

- `backend/routes/`
  - `appointmentRoutes.js`: API routes for appointment management.
  - `authRoutes.js`: API routes for authentication and authorization.
  - `healthRecordRoutes.js`: API routes for health records.
  - `insuranceRoutes.js`: API routes for insurance integration.
  - `telemedicineRoutes.js`: API routes for telemedicine services.
  - `transactionRoutes.js`: API routes for transaction management.
  - `userRoutes.js`: API routes for user profile management.

- `backend/services/`
  - `emailService.js`: Service for sending emails.
  - `insuranceService.js`: Service for managing insurance-related logic.
  - `paymentService.js`: Service for handling payment transactions using Stripe.
  - `telemedicineService.js`: Service for handling telemedicine logic.

- `backend/utils/`
  - `errorHandler.js`: Middleware for handling errors.
  - `logger.js`: Logger configuration.
  - `validators.js`: Custom validators for request data.

- `.env`: Environment variables for configuration.
- `app.js`: Main application file.
- `server.js`: Server configuration and startup.
- `package.json`: Backend dependencies and scripts.

#### Frontend
- `frontend/public/`
  - `index.html`: Main HTML file.
  - `favicon.ico`: Favicon for the app.

- `frontend/src/`
  - `assets/`
    - `images/`: Directory for images used in the app.
    - `styles/`: Directory for CSS stylesheets.
      - `main.css`: Main CSS file.
      - `theme.css`: Theme-specific styles.

  - `components/`
    - `Appointment/`
      - `AppointmentList.js`: Component to display the list of appointments.
      - `AppointmentForm.js`: Component for creating and editing appointments.
      - `AppointmentDetails.js`: Component to show appointment details.

    - `Dashboard/`
      - `Dashboard.js`: Main dashboard component.
      - `StatsCard.js`: Component for displaying statistical cards on the dashboard.

    - `HealthRecords/`
      - `HealthRecordsList.js`: Component to display a list of health records.
      - `HealthRecordDetails.js`: Component to show health record details.
      - `AddHealthRecord.js`: Component to add new health records.

    - `Insurance/`
      - `InsuranceDetails.js`: Component to display insurance details.
      - `InsuranceForm.js`: Component to submit insurance claims.
      - `InsuranceBalance.js`: Component to check insurance balance.

    - `Profile/`
      - `ProfileView.js`: Component to view user profile.
      - `ProfileEdit.js`: Component to edit user profile.
      - `ChangePassword.js`: Component to change user password.

    - `Telemedicine/`
      - `TelemedicineSession.js`: Component to manage telemedicine sessions.
      - `TelemedicineHistory.js`: Component to view past telemedicine sessions.
      - `StartTelemedicine.js`: Component to start a new telemedicine session.

    - `Transactions/`
      - `PackageSelection.js`: Component to select subscription packages.
      - `PaymentForm.js`: Component to handle payment processing.
      - `TransactionHistory.js`: Component to display transaction history.

    - `common/`
      - `Header.js`: Header component.
      - `Footer.js`: Footer component.
      - `Sidebar.js`: Sidebar component for navigation.
      - `Loader.js`: Loader component for displaying loading states.

    - `layout/`
      - `MainLayout.js`: Main layout component.
      - `AuthLayout.js`: Authentication layout component.

  - `pages/`
    - `AppointmentPage.js`: Page for managing appointments.
    - `DashboardPage.js`: Dashboard page.
    - `HealthRecordsPage.js`: Page for viewing health records.
    - `InsurancePage.js`: Page for managing insurance.
    - `LoginPage.js`: Login page.
    - `ProfilePage.js`: User profile page.
    - `TelemedicinePage.js`: Page for telemedicine services.
    - `TransactionPage.js`: Page for handling transactions.

  - `redux/`
    - `actions/`: Redux action creators.
      - `appointmentActions.js`: Actions for appointments.
      - `authActions.js`: Actions for authentication.
      - `healthRecordActions.js`: Actions for health records.
      - `insuranceActions.js`: Actions for insurance.
      - `profileActions.js`: Actions for user profiles.
      - `telemedicineActions.js`: Actions for telemedicine.
      - `transactionActions.js`: Actions for transactions.

    - `reducers/`: Redux reducers.
      - `appointmentReducer.js`: Reducer for appointments.
      - `authReducer.js`: Reducer for authentication.
      - `healthRecordReducer.js`: Reducer for health records.
      - `insuranceReducer.js`: Reducer for insurance.
      - `profileReducer.js`: Reducer for user profiles.
      - `telemedicineReducer.js`: Reducer for telemedicine.
      - `transactionReducer.js`: Reducer for transactions.

    - `store.js`: Redux store configuration.

  - `App.js`: Main application component.
  - `index.js`: Entry point for the frontend application.
  - `setupProxy.js`: Proxy setup for API calls.
  - `package.json`: Frontend dependencies and scripts.

#### Documentation
- `docs/`
  - `API_DOCUMENTATION.md`: Detailed API documentation.
  - `DATABASE_SCHEMA.md`: Database schema and models.
  - `SYSTEM_DESIGN.md`: System design and architecture.
  - `USER_GUIDE.md`: User guide and instructions.

#### Root Files
- `.gitignore`: Git ignore file.
- `README.md`: Project README file.
- `LICENSE`: License file.

## Installation
To set up and run this project locally, follow these steps:

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/medixlink.git
   cd medixlink/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add the necessary environment variables:
   ```plaintext
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

### Run Tests
To run tests, use the following command in the respective directories:
```bash
npm test
```

## Usage
Once the application is set up, you can access the frontend at `http://localhost:3000` and the backend API at `http://localhost:5000`.

## Contributing
We welcome contributions from the community! To contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact
For any questions or inquiries, please contact:
- **Joseph Njoroge Mwangi**
- **Email**: [njorojoe11173@gmail.com](mailto:njorojoe11173@gmail.com)

