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
│   │   └── userController.js
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── HealthRecord.js
│   │   ├── Insurance.js
│   │   ├── Telemedicine.js
│   │   └── User.js
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   ├── authRoutes.js
│   │   ├── healthRecordRoutes.js
│   │   ├── insuranceRoutes.js
│   │   ├── telemedicineRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── insuranceService.js
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
│   │   │   └── styles/
│   │   │       ├── main.css
│   │   │       └── theme.css
│   │   ├── components/
│   │   │   ├── Appointment/
│   │   │   ├── Dashboard/
│   │   │   ├── HealthRecords/
│   │   │   ├── Insurance/
│   │   │   ├── Profile/
│   │   │   ├── Telemedicine/
│   │   │   ├── common/
│   │   │   └── layout/
│   │   ├── pages/
│   │   │   ├── AppointmentPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── HealthRecordsPage.js
│   │   │   ├── InsurancePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── ProfilePage.js
│   │   │   └── TelemedicinePage.js
│   │   ├── redux/
│   │   │   ├── actions/
│   │   │   ├── reducers/
│   │   │   └── store.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── setupProxy.js
│   │   └── package.json
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   ├── SYSTEM_DESIGN.md
│   └── USER_GUIDE.md
├── tests/
│   ├── backend/
│   │   ├── authTests.js
│   │   ├── appointmentTests.js
│   │   ├── healthRecordTests.js
│   │   └── insuranceTests.js
│   └── frontend/
│       ├── appointmentTests.js
│       ├── dashboardTests.js
│       ├── healthRecordsTests.js
│       ├── insuranceTests.js
│       └── profileTests.js
├── .gitignore
├── README.md
└── package.json
```

## Installation
### Prerequisites
- Node.js
- MongoDB
- Docker (for containerization)
- Stripe account (for payment integration)

### Backend
1. Clone the repository
   ```sh
   git clone https://github.com/JosephNjorog/medixlink.git
   cd medixlink/backend
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```plaintext
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the server
   ```sh
   npm start
   ```

### Frontend
1. Navigate to the `frontend` directory
   ```sh
   cd ../frontend
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Start the development server
   ```sh
   npm start
   ```

### Docker
1. Build and run the containers
   ```sh
   docker-compose up --build
   ```

## Usage
1. Register and create a profile.
2. Explore the dashboard to book appointments, view health records, and manage insurance details.
3. Use telemedicine for virtual consultations with healthcare providers.
4. Access detailed analytics and health monitoring tools in the premium package.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Joseph Njoroge Mwangi - [njorojoe11173@gmail.com](mailto:njorojoe11173@gmail.com)

Project Link: [https://github.com/yourusername/medixlink](https://github.com/JosephNjorog/medixlink)

---

