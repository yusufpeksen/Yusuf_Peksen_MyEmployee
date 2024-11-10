# MyEmployee Project Setup Guide

**Technologies Used**: Next.js, Java Spring Boot, Tailwind CSS, PostgreSQL, Postman , TypeScript

---

## Prerequisites

Before starting, ensure you have PostgreSQL, Maven, Java 17 and Node.js installed on your system.

---

## Setup Instructions

Use the PostgreSQL terminal to create the `myemployee` database:

```sql
CREATE DATABASE myemployee;
```

Make sure to replace postgres with your actual PostgreSQL username if it differs:
Open backuped sql file :
```bash
psql -U postgres -h localhost -d myemployee -f path/to/myemployee_backup.sql
```

Open the Spring Boot backend project in IntelliJ. In the IntelliJ terminal, run the following command to clean and build the project:

```bash
mvn clean install
```

Open application.properties in the backend project and ensure the PostgreSQL settings (username, password, etc.) match your local configuration. Update them if necessary. Start the backend application in IntelliJ. By default, the backend will run on port 8080. Ensure it is running on this port, as the frontend will make requests to this address.

Open the Next.js frontend project in Visual Studio Code. In the terminal, install the npm dependencies:

```bash
npm install
```

Start the frontend application:

```bash
npm run dev
```

The frontend application will start on port 3000. Visit http://localhost:3000 to access the application.

You can find the usernames and passwords in the users table of the database. Note: All passwords are encrypted but are originally set to "12345". You do not need to re-encode them.

Ensure both the backend (port 8080) and frontend (port 3000) are running simultaneously for the application to work correctly. Use Postman to test the API endpoints or troubleshoot backend issues if needed.

---

## Key Features
Role-Based Access: Users with an admin role have access to more features compared to those with an employee role. Admin-specific features include:
Sorting employees by last name or start date.
Adding new employees.
Viewing and updating employee details.
Middleware: Implemented to check the JSESSIONID cookie, ensuring that users are logged in before accessing the system.
Data Fetching: Repeated fetching logic is efficiently handled using custom hooks (useGetAddressTypes, useGetEmployees, useUserInfo).

---
Additionally : 
- I could not implement Profil Picture because I do not have aws account. I registered but It says 24 - 48 hours to confirm your account. So I cant implement with S3 and I do not know how to implement with file path.
- I could implement Exception handling , better DTOs (Data Transfer Objects) , Mappers but I did not implement because of time. I am preparing my midterms right now so I had to keep simple this project.

Other Requirements work solid.

---

You will see different pages with when you authorized admin role and employee role. Admins can see more feature than Employees such as Sort by Last Name , Start Date , Add New Employee , Detail Employee's , Update Employee.

---

contact : ahmetpeksen77@gmail.com
