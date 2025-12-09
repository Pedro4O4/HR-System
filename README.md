# HR Management System

A comprehensive HR Management System built with NestJS (backend) and Next.js (frontend).

## Features

- **Employee Profile Management** - Employee information, profiles, and file uploads
- **Organization Structure** - Departments, positions, and organizational hierarchy
- **Performance Management** - Performance reviews and tracking
- **Recruitment** - Candidate management and hiring workflows
- **Time Management** - Time tracking and attendance
- **Leave Management** - Leave requests and approvals
- **Payroll Configuration** - Salary configurations and components
- **Payroll Execution** - Payroll processing and calculations
- **Payroll Tracking** - Payroll history and reporting

## Tech Stack

### Backend
- **Framework**: NestJS 10.x with TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport
- **File Upload**: Multer
- **Password Hashing**: bcryptjs

### Frontend
- **Framework**: Next.js 16 with React 19
- **UI Library**: Material-UI 7.x
- **State Management**: TanStack React Query
- **HTTP Client**: Axios
- **Build Tool**: Turbopack

## Project Structure

```
HR-System/
├── backend/              # NestJS backend application
│   ├── src/
│   │   ├── employee-profile/
│   │   ├── organization-structure/
│   │   ├── performance/
│   │   ├── recruitment/
│   │   ├── leaves/
│   │   ├── payroll-configuration/
│   │   ├── payroll-execution/
│   │   ├── payroll-tracking/
│   │   ├── time-management/
│   │   └── seeds/
│   ├── uploads/          # File upload storage
│   ├── test/
│   └── package.json
├── frontend/             # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── services/
│   └── package.json
├── docs/                 # Documentation
└── package.json          # Root package.json for monorepo management
```

## Installation

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/yahiawaleed/HR-System.git
cd HR-System
```

### Install Dependencies

**Option 1: Install all dependencies at once**
```bash
npm run install:all
```

**Option 2: Install separately**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Environment Configuration

Create `.env` file in the `backend/` folder:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hr-system
JWT_SECRET=your-secret-key
PORT=3000
```

## Running the Application

### Run both Backend and Frontend
```bash
npm run dev
```

### Run Backend only
```bash
npm run dev:backend
# OR
cd backend
npm run start:dev
```

### Run Frontend only
```bash
npm run dev:frontend
# OR
cd frontend
npm run dev
```

The backend will run on `http://localhost:3000` and the frontend on `http://localhost:3001`.

## Database Seeding

Seed the database with default users and roles:
```bash
npm run seed:roles
# OR
cd backend
npm run seed:roles
```

### Default Credentials
After seeding, you can login with:
- **Email**: ahmed.hassan@company.com
- **Password**: Password@EMP-ADMIN-001
- **Role**: System Admin

## Building for Production

```bash
# Build both applications
npm run build

# Build backend only
cd backend
npm run build

# Build frontend only
cd frontend
npm run build
```

## Running in Production

```bash
npm run start
```

## Testing

cd backend
npm test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## API Documentation

The backend API runs on `http://localhost:3000`. Key endpoints include:

- **Auth**: `/auth/login`, `/auth/register`
- **Employees**: `/employee-profile/*`
- **Organization**: `/organization-structure/*`
- **Performance**: `/performance/*`
- **Recruitment**: `/recruitment/*`
- **Leaves**: `/leaves/*`
- **Payroll**: `/payroll-configuration/*`, `/payroll-execution/*`, `/payroll-tracking/*`
- **Time Management**: `/time-management/*`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or open an issue on GitHub.
