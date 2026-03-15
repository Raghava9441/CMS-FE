# College Management System (ScholarSync)

## Overview

The College Management System, branded as ScholarSync, is a comprehensive web application designed to streamline the management of educational institutions. It serves as a centralized platform for students, parents, teachers, and administrators to interact and manage academic processes efficiently.

## Tech Stack

The project is built using modern technologies that enhance performance, user experience, and maintainability:

### Frontend Technologies
- **React 18.3.1**: UI library for building interactive user interfaces
- **TypeScript 5.5.3**: Static typing for improved code quality and maintainability
- **Vite 5.4.1**: Fast build tool and development server
- **Material UI (MUI) 6.1.0**: React UI framework with pre-designed components
- **React Router DOM 6.26.2**: Client-side routing for single-page applications
- **Redux Toolkit 2.2.7**: State management library with simplified API
- **Axios 1.7.7**: HTTP client for API communication
- **Socket.IO Client 4.8.1**: Real-time communication for chat and notifications
- **Recharts 3.7.0**: Data visualization library
- **React Hook Form 7.53.0**: Form management library
- **Lottie React 2.4.0**: Animation library for Lottie files
- **i18next 23.15.1**: Internationalization library

### Build and Development Tools
- **ESLint 9.9.0**: JavaScript/TypeScript linting
- **Prettier 3.5.3**: Code formatter
- **Husky 9.1.7**: Git hooks for code quality checks
- **Lint-staged 15.5.1**: Run linters on staged files
- **Jest 29.7.0**: Testing framework
- **Testing Library React 16.3.0**: Testing utilities for React components

## Features

The College Management System includes a range of features catering to different user roles, including students, parents, teachers, and administrators:

### User Authentication
- **Login and Registration**: Secure login and registration process for users.
- **JWT Authentication**: Utilization of JSON Web Tokens for secure user sessions and authorization.
- **Forgot Password**: Password recovery functionality.
- **Persistent Sessions**: Redux Persist for maintaining login sessions.

### Role-Based Access Control (RBAC)

The system supports five user roles with different permissions:

#### Admin
- Full access to all system features
- User management (create, edit, delete users)
- System configuration
- Organization management

#### Org Admin
- Manage organization-specific settings
- User management within the organization
- Course and class management
- Attendance and grade management

#### Teacher
- Manage assigned courses and classes
- Grade assignments and exams
- Record attendance
- Communicate with students and parents

#### Student
- View enrolled courses and grades
- Submit assignments
- View attendance records
- Communicate with teachers and peers

#### Parent
- View child's academic progress
- Check attendance records
- Communicate with teachers
- View exam results

### Core Features

#### Dashboard
- Overview of key metrics for each user role
- Analytics and visualizations (charts, graphs)
- Quick access to common features
- Recent activity and notifications

#### User Management
- Create, edit, and delete users
- Assign roles and permissions
- Manage user profiles
- Search and filter users

#### Course Management
- Create and manage courses
- Assign teachers to courses
- Enroll students in courses
- Manage course materials and resources

#### Class Management
- Create and manage classes
- Schedule classes
- Manage class rosters
- View class attendance

#### Attendance Management
- Record and manage student attendance
- View attendance reports
- Bulk attendance marking
- Attendance statistics and analytics

#### Exam Management
- Create and schedule exams
- Manage exam results
- View exam statistics
- Generate exam reports

#### Assignment Management
- Create and assign assignments
- Grade submissions
- View assignment history
- Manage assignment deadlines

#### Communication System
- Real-time chat with socket.io
- Conversation management
- Friend requests and connections
- Notifications for messages and updates

#### Settings and Configuration
- Profile settings (edit personal information)
- Notification settings
- Theme and display settings
- Danger zone (account deletion, etc.)

## Role-Based Route Access for UI

### Route Access Matrix

| **Model/Feature**       | **Student**                                | **Parent**                               | **Teacher**                                                      |
| ----------------------- | ------------------------------------------ | ---------------------------------------- | ---------------------------------------------------------------- |
| **Profile**             | View and edit own profile                  | View own profile, and child’s profile    | View and edit own profile                                        |
| **Courses**             | View enrolled courses, assignments, grades | View child’s enrolled courses and grades | View, edit, and manage assigned courses, assignments, and grades |
| **Classes**             | View scheduled classes                     | View child’s scheduled classes           | Manage classes, view enrolled students                           |
| **Attendance**          | View own attendance                        | View child’s attendance                  | Manage attendance records                                        |
| **Exams**               | View exam schedule and own results         | View child’s exam schedule and results   | Schedule exams, view/manage results for students                 |
| **Assignments**         | View own assignments, submissions          | View child’s assignments, status, grades | Assign tasks, manage submissions, grade assignments              |
| **Events**              | View college events                        | View college events                      | View and manage events, share announcements                      |
| **Parents**             | Not visible                                | View/edit own profile, contact teachers  | Not visible                                                      |
| **Teachers**            | View assigned teachers                     | View assigned teachers, contact teachers | Not visible                                                      |
| **Students**            | Not visible                                | View child’s profile, progress           | View and manage assigned students                                |
| **Classes & Schedules** | View class schedule                        | View child’s schedule                    | Manage schedule                                                  |
| **Organizations**       | Not visible                                | Not visible                              | Not visible                                                      |
| **Exam Results**        | View own results                           | View child’s results                     | Manage/view results for assigned students                        |

## Project Architecture

### Application Structure

```
src/
├── api/                # API endpoints and Axios configuration
├── assets/             # Static assets (images, animations, icons)
├── components/         # Reusable React components
├── config/             # Configuration files (routes, environment)
├── constants/          # Constant values (roles, permissions)
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── layout/             # Layout components
├── locales/            # Internationalization files
├── pages/              # Page components
├── redux/              # Redux store and slices
├── routes/             # Route definitions and paths
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### State Management

The application uses Redux Toolkit for state management with the following slices:
- `auth`: User authentication and authorization
- `user`: User management
- `organization`: Organization management
- `teacher`: Teacher management
- `student`: Student management
- `parent`: Parent management
- `chat`: Chat and conversation management
- `friends`: Friend management
- `exam`: Exam management
- `attendance`: Attendance management
- `course`: Course management

### Routing System

The application uses React Router DOM with a custom route configuration system:
- Routes are defined in `src/config/routes.config.ts` with role-based permissions
- Route guards are implemented using `useRouteGuard` hook
- Protected routes use `ProductionRoute` component with error boundaries
- Sidebar navigation is dynamically generated based on user role and permissions

### API Integration

- API calls are centralized in `src/api/api.ts`
- Axios is used with interceptors for request/response handling
- Abort controllers are used for canceling requests
- API endpoints are organized by resource type

## Installation and Setup

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager
- Git

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CMS-FE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables:
   - Copy `.env.example` to `.env.development`
   - Fill in the required variables

4. Start development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Available Scripts

- `npm run dev`: Start development server (development mode)
- `npm run dev:qa`: Start development server (QA mode)
- `npm run dev:beta`: Start development server (beta mode)
- `npm run dev:prod`: Start development server (production mode)
- `npm run build`: Build for production
- `npm run build:dev`: Build for development environment
- `npm run build:qa`: Build for QA environment
- `npm run build:beta`: Build for beta environment
- `npm run build:prod`: Build for production environment
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build
- `npm run preview:dev`: Preview development build
- `npm run preview:qa`: Preview QA build
- `npm run preview:beta`: Preview beta build
- `npm run preview:prod`: Preview production build
- `npm run docs`: Generate TypeDoc documentation
- `npm run deploy`: Deploy to GitHub Pages
- `npm run gen-docs`: Generate custom documentation

## Environment Variables

The application uses environment variables for configuration, with support for multiple environments (development, QA, beta, production). Key variables include:
- `VITE_APP_ENV`: Environment type (local/development/qa/beta/production)
- `VITE_APP_API_ORIGIN`: API base URL
- `VITE_APP_WEBEX_BASE_URL`: Webex API base URL
- `VITE_APP_WEBEX_CLIENT_ID`: Webex client ID
- `VITE_APP_SENTRY_TOKEN`: Sentry error tracking token
- `VITE_APP_SENTRY_DNS`: Sentry DNS for error reporting
- `VITE_APP_ENABLE_CONSOLE_LOGS`: Enable/disable console logs
- `VITE_APP_DEBUG`: Enable/disable debug mode

## Sample Login Credentials

### Teacher
```
Email: teachert@gamil.com
Password: Teacher@1234
```

### Admin
```
Email: newnew@gmail.lcom
Password: Raghava@9441
```

### Org Admin
```
Email: Exampleorgadmin@gmail.com
Password: Exampleorgadmin@gmail.com
OrgId: 66976aa3b8ebf8df5217e255
```

### Teacher (Organization Specific)
```
Email: Exampleteacher@gmail.com
Password: Exampleteacher@gmail.com
Id: 6766dc8b1067ef015c7bdb78
```

### Students (Organization Specific)
```
Email: Examplestudent@gmail.com
Password: Examplestudent@gmail.com

Email: Examplestudent2@gmail.com
Password: Examplestudent2@gmail.com

Email: Examplestudent3@gmail.com
Password: Examplestudent3@gmail.com
```

### Parent (Organization Specific)
```
Email: Exampleparent@gmail.com
Password: Exampleparent@gmail.com
```

### Demo Organization Users (Test-68301.edu)
- **Org Admin**: candice.mayert@test-68301.edu
- **Teachers**: lavada_mraz56@test-68301.edu, lina_bailey@test-68301.edu, michelle.mueller5@test-68301.edu
- **Students**: buford_wilkinson@test-68301.edu, betsy_durgan54@test-68301.edu, isabel.smith88@test-68301.edu, zelma.morar@test-68301.edu
- **Parents**: savanna.renner68@test-68301.edu, margarett_lueilwitz54@test-68301.edu, ethan_willms64@test-68301.edu, terrill.zboncak@test-68301.edu, chasity.osinski@test-68301.edu

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## Documentation

- **Technical Documentation**: `PROJECT_DOCUMENTATION.md` - Detailed technical implementation guide
- **TypeDoc Documentation**: Generated using `npm run docs` - API documentation for all TypeScript files
- **Code Documentation**: JSDoc comments are used throughout the codebase

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact and Support

For support and inquiries:
- Email: support@scholarsync.com
- Phone: +1 (555) 123-4567
- Website: https://www.scholarsync.com
- Documentation: https://docs.scholarsync.com
