# College Management System

## Overview
The College Management System is a comprehensive web application designed to streamline the management of educational institutions. It serves as a centralized platform for students, parents, teachers, and administrators to interact and manage academic processes efficiently.

## Tech Stack
The project is built using modern technologies that enhance performance, user experience, and maintainability:

- **ReactJS**: A powerful JavaScript library for building user interfaces, allowing for the development of a responsive and interactive UI.
- **TypeScript**: A superset of JavaScript that adds static typing, making the code more robust and easier to maintain.
- **Vite**: A fast development server and build tool that leverages modern browser features for a quicker build process.
- **SWC**: A super-fast compiler for JavaScript and TypeScript that offers better performance compared to traditional build tools.
- **Material UI**: A popular React UI framework that provides pre-designed components and styles, enhancing the look and feel of the application.
- **X-Data-Grid**: A powerful data grid component from Material UI that offers features like sorting, filtering, and pagination for efficient data handling.
- **Redux Toolkit**: A modern state management library that simplifies the process of managing application state, enabling predictable and efficient state updates.
- **Axios**: A promise-based HTTP client for making API calls, providing an easy way to interact with backend services.
- **React-Toastify**: A library for displaying toast notifications, improving user feedback and interaction within the application.
- **React Router DOM**: A routing library for React that enables navigation between different views and components in a single-page application.

## Features
The College Management System includes a range of features catering to different user roles, including students, parents, teachers, and administrators:

### User Authentication
- **Login and Registration**: Secure login and registration process for users.
- **JWT Authentication**: Utilization of JSON Web Tokens for secure user sessions and authorization.

### Student Features
- **Profile Management**: Students can view and edit their profiles, including personal details and academic information.
- **Course Management**: View enrolled courses, assignments, grades, and attendance records.
- **Exam Management**: Access exam schedules and view results.
- **Assignment Management**: View assigned tasks and submission statuses.
- **Event Notifications**: Stay informed about college-wide events and announcements.

### Parent Features
- **Profile Management**: Parents can view and edit their profiles.
- **Child Monitoring**: Access their child's profile, courses, grades, attendance, and assignments.
- **Communication with Teachers**: Contact teachers regarding their child's progress.

### Teacher Features
- **Profile Management**: Teachers can view and edit their profiles.
- **Course Management**: Manage assigned courses, assignments, and grades.
- **Student Management**: View and manage students in assigned classes.
- **Attendance Management**: Record and manage attendance for classes.
- **Exam Scheduling**: Schedule exams and manage/view results.
- **Event Management**: Create and manage events, share announcements with students and parents.

### Admin Features
- **User Management**: Admins can manage user accounts, including students, parents, and teachers.
- **Course Management**: Admins have full control over course creation, modification, and deletion.
- **Attendance Management**: Admins can monitor and manage attendance records for all users.

## Conclusion
This College Management System aims to enhance the educational experience by providing a user-friendly interface, centralized access to information, and streamlined management processes for all stakeholders involved. With a modern tech stack and well-defined features, it is positioned to meet the needs of contemporary educational institutions.



# Role-Based Route Access for UI

## Route Access Matrix

| **Model/Feature**        | **Student**                           | **Parent**                                    | **Teacher**                              |
|--------------------------|---------------------------------------|-----------------------------------------------|------------------------------------------|
| **Profile**              | View and edit own profile            | View own profile, and child’s profile         | View and edit own profile                |
| **Courses**              | View enrolled courses, assignments, grades | View child’s enrolled courses and grades     | View, edit, and manage assigned courses, assignments, and grades |
| **Classes**              | View scheduled classes               | View child’s scheduled classes                | Manage classes, view enrolled students   |
| **Attendance**           | View own attendance                  | View child’s attendance                       | Manage attendance records                |
| **Exams**                | View exam schedule and own results   | View child’s exam schedule and results       | Schedule exams, view/manage results for students |
| **Assignments**          | View own assignments, submissions    | View child’s assignments, status, grades     | Assign tasks, manage submissions, grade assignments |
| **Events**               | View college events                  | View college events                           | View and manage events, share announcements |
| **Parents**              | Not visible                          | View/edit own profile, contact teachers       | Not visible                              |
| **Teachers**             | View assigned teachers               | View assigned teachers, contact teachers      | Not visible                              |
| **Students**             | Not visible                          | View child’s profile, progress                | View and manage assigned students        |
| **Classes & Schedules**  | View class schedule                  | View child’s schedule                         | Manage schedule                          |
| **Organizations**        | Not visible                          | Not visible                                   | Not visible                              |
| **Exam Results**         | View own results                     | View child’s results                          | Manage/view results for assigned students |

## Detailed Access by Role

### Student
Focus on personal academic and class-related features.
- **Visible Routes**:
  - **/profile**: View/edit personal details.
  - **/courses**: View enrolled courses, assignments, grades.
  - **/classes**: View class schedules.
  - **/attendance**: View own attendance records.
  - **/exams**: View exam schedules, results.
  - **/assignments**: View assigned tasks and submissions.
  - **/events**: View college-wide events.

### Parent
Focus on monitoring child’s performance and contacting teachers.
- **Visible Routes**:
  - **/profile**: View/edit own profile.
  - **/children/:id**: View child’s profile.
  - **/courses/children/:id**: View child’s enrolled courses and grades.
  - **/classes/children/:id**: View child’s schedule.
  - **/attendance/children/:id**: View child’s attendance.
  - **/exams/children/:id**: View child’s exam schedule and results.
  - **/assignments/children/:id**: View child’s assignments and grades.
  - **/events**: View college-wide events.
  - **/teachers**: Contact assigned teachers.

### Teacher
Focus on managing classes, assignments, student records.
- **Visible Routes**:
  - **/profile**: View/edit own profile.
  - **/courses**: View, edit, and manage assigned courses.
  - **/students**: View/manage students in assigned classes.
  - **/classes**: Manage schedules for assigned classes.
  - **/attendance**: Record attendance for classes.
  - **/exams**: Schedule exams, manage/view results.
  - **/assignments**: Assign and grade student submissions.
  - **/events**: View/manage events for students.

## Route Visibility Summary
- **Student**: Limited to personal academic records, attendance, courses, assignments, and college events.
- **Parent**: Limited to child’s progress, contact with teachers, and event notifications.
- **Teacher**: Comprehensive control over course management, class schedules, assignments, exams, attendance, and event announcements.

This UI-based role setup ensures that each user only sees the features necessary for their role, enhancing user experience and data security.



logins 
teacher logins
--------------
teachert@gamil.com
Teacher@1234

admin logins
--------------
newnew@gmail.lcom
Raghava@9441



Exampleorgadmin@gmail.com  orgId: 66976aa3b8ebf8df5217e255
pass:Exampleorgadmin@gmail.com

Exampleteacher@gmail.com   id: 6766dc8b1067ef015c7bdb78
pass: Exampleteacher@gmail.com


Examplestudent@gmail.com
pass: Examplestudent@gmail.com


Exampleparent@gmail.com
pass:Exampleparent@gmail.com
