# e-NagarSetu: Unified Municipal Services Platform

e-NagarSetu is a modern, full-stack digital governance platform designed for Indian municipalities (Nagar Palikas). It integrates AI-driven waste management, grievance redressal, digital payments, and real-time administrative analytics into a single seamless experience.

## 🏗️ Project Structure

This is a **monorepo** containing both the frontend and backend services:

- **`/frontend`**: React + Vite + Tailwind CSS application.
- **`/backend`**: Spring Boot (Java 22) + MongoDB application.

## 🚀 Getting Started

### Prerequisites

- **Java 22** or higher
- **Node.js 18** or higher
- **MongoDB** (Atlas or local instance)

### 1. Running the Backend

```bash
cd backend
./mvnw spring-boot:run
```
*The API will be available at `http://localhost:8080`*

### 2. Running the Frontend

```bash
cd frontend
npm install
npm run dev
```
*The UI will be available at `http://localhost:5173`*

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Recharts, Framer Motion.
- **Backend**: Spring Boot, Spring Security (BCrypt), Spring Data MongoDB.
- **Database**: MongoDB Atlas.

## 📱 Features

- **Smart Waste Management**: AI-optimized routing and garbage ready marking.
- **Citizen Dashboard**: Personalized civic index and impact tracking.
- **Grievance Redressal**: Geo-tagged incident reporting with real-time tracking.
- **Digital Payments**: Secure property tax and utility bill settlements.
- **Admin Dashboard**: Comprehensive monitoring of city-wide metrics.

## 🔐 Credentials (Demo)

- **Citizen**: `john@example.com` / `password`
- **Admin**: `admin@enagarsetu.gov` / `admin123`
