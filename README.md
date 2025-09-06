# lmsViber - Next-Generation Learning Management System

A comprehensive full-stack educational platform built with Next.js 14, featuring advanced course management, student enrollment, payment processing, and certificate generation capabilities.

## Live Demo

- **Live Link:** [lmsviber](https://lmsviber.vercel.app/)
- **GitHub Repository:** [View Source Code](https://github.com/mehedi8430/lmsviber)

## Project Overview

lmsViber is a modern Learning Management System designed to provide an intuitive platform for educators to create, manage, and deliver courses while offering a seamless learning experience for students. The platform features comprehensive dashboards, advanced course management, and robust file handling capabilities.

## Key Features

### Course Management System

- **Complete CRUD Operations** for courses with rich media support
- **Modular Course Structure** with organized lessons, modules, and curriculum
- **Drag-and-Drop Interface** for easy course image uploads
- **Advanced Filtering & Search** system for course discovery
- **Course Categorization** with multiple category support
- **Instructor Analytics Dashboard** with enrollment tracking and revenue insights

### Multi-Role Authentication & Authorization

- **Secure Authentication** using NextAuth.js with multiple providers
- **Google OAuth Integration** for seamless social login
- **Role-Based Access Control** (Students, Instructors, Admins)
- **Password Security** with bcryptjs hashing
- **Session Management** with secure token handling

### Payment Integration

- **Stripe Payment Gateway** for secure course purchases
- **Hosted Checkout Sessions** for seamless payment experience
- **Revenue Tracking** and analytics for instructors
- **Payment Intent API** for advanced payment processing
- **Currency Support** with USD formatting

### Student Learning Experience

- **Interactive Video Player** with React Player integration
- **Progress Tracking** and course completion monitoring
- **Personalized Dashboard** with enrolled courses overview
- **Certificate Generation** upon course completion using PDF-lib
- **Course Reviews & Testimonials** system
- **Lesson Navigation** with sidebar and mobile-friendly interface

### Assessment & Quiz System

- **Comprehensive Quiz Creation** and management tools
- **Quiz Sets** with multiple question types support
- **Student Assessment** and progress evaluation
- **Quiz Analytics** for instructors
- **Interactive Quiz Interface** with real-time feedback

### Live Streaming Capabilities

- **Live Session Management** and scheduling
- **Real-time Educational Content** delivery
- **Live Event Dashboard** for instructors
- **Student Live Session Access** with enrollment tracking

### Responsive Design & UI/UX

- **Mobile-First Approach** with Tailwind CSS
- **Modern UI Components** using Radix UI and shadcn/ui
- **Responsive Design** optimized for all device sizes
- **Dark/Light Theme Support** with next-themes
- **Accessibility Features** with proper ARIA labels
- **Smooth Animations** with Tailwind CSS animations

## Technical Stack

### Frontend Technologies

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Beautiful icon library

### Backend Technologies

- **Next.js API Routes** - Serverless API endpoints
- **Server Actions** - Server-side form handling
- **MongoDB** - NoSQL database
- **Mongoose ODM** - Object Document Mapper
- **NextAuth.js** - Authentication framework

### Third-Party Integrations

- **Stripe** - Payment processing
- **Google OAuth** - Social authentication
- **Cloudinary** - Media storage and optimization
- **Resend** - Email service
- **PDF-lib** - PDF generation

### Development Tools

- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Dropzone** - File upload handling
- **Sharp** - Image optimization
- **React Player** - Video playback
- **React Quill** - Rich text editor
- **Sonner** - Toast notifications

## Architecture & Design Patterns

### Project Structure

\\\
lmsvider/
app/ # Next.js App Router
(main)/ # Public routes
dashboard/ # Instructor/Admin dashboard
api/ # API routes
actions/ # Server actions
components/ # Reusable UI components
lib/ # Utility functions
model/ # Database models
queries/ # Database queries
service/ # External services
\\\

### Database Schema

- **Users** - Student and instructor profiles
- **Courses** - Course information and metadata
- **Modules** - Course module organization
- **Lessons** - Individual lesson content
- **Enrollments** - Student course enrollments
- **QuizSets** - Quiz collections
- **Quizzes** - Individual quiz questions
- **Testimonials** - Course reviews
- **Reports** - Progress and completion tracking

### Key Design Patterns

- **Server-Side Rendering (SSR)** for SEO optimization
- **Static Site Generation (SSG)** for performance
- **Component-Based Architecture** for maintainability
- **Custom Hooks** for reusable logic
- **Context API** for state management
- **Middleware** for route protection

## Getting Started

### Prerequisites

- Node.js 22.x
- MongoDB database
- Stripe account
- Google OAuth credentials

### Installation

1. **Clone the repository**
   \\\ash
   git clone https://github.com/mehedi8430/lmsviber.git
   cd lmsviber
   \\\

2. **Install dependencies**
   \\\ash
   npm install
   \\\

3. **Environment Setup**
   \\\ash
   cp .env.example .env.local

   # Configure your environment variables

   \\\

4. **Run the development server**
   \\\ash
   npm run dev
   \\\

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Performance Features

- **Image Optimization** with Next.js Image component
- **Code Splitting** for optimal bundle sizes
- **Lazy Loading** for improved performance
- **Caching Strategies** for database queries
- **CDN Integration** with Cloudinary
- **Responsive Images** with multiple breakpoints

## Security Features

- **Password Hashing** with bcryptjs
- **JWT Token Management** with NextAuth.js
- **CSRF Protection** with Next.js built-in features
- **Input Validation** with Zod schemas
- **SQL Injection Prevention** with Mongoose ODM
- **XSS Protection** with React's built-in sanitization

## Scalability Considerations

- **Database Indexing** for optimal query performance
- **Pagination** for large datasets
- **Caching** with Redis (planned)
- **CDN Integration** for global content delivery
- **Microservices Architecture** (future enhancement)
- **Load Balancing** ready infrastructure

## Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] Mobile app with React Native
- [ ] Advanced analytics dashboard
- [ ] AI-powered course recommendations
- [ ] Multi-language support
- [ ] Advanced reporting features
- [ ] Video streaming optimization
- [ ] Social learning features

## Developer Information

**Developer:** Mehedi Hasan  
**Portfolio:** [mehedihasan.dev](https://mehedihasanrakib.vercel.app/)  
**Email:** mehedialhasan1999@gmail.com  
**LinkedIn:** [Connect with me](https://linkedin.com/in/mehedi-hasan-rakib)

## License

This project is private and proprietary. All rights reserved.

---

_Built with using Next.js, React, and modern web technologies_
