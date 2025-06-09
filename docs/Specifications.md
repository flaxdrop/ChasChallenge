# Software Requirements Specification (SRS) – AirAware

## 1. Introduction

### 1.1 Purpose
AirAware is a smart air quality monitor that measures and analyzes air quality in real-time. The system consists of an Arduino-based IoT device that collects environmental data and sends it to a cloud-based backend. Users interact with the system through a mobile app built with React Native.

### 1.2 Target Audience
This requirements specification is intended for the development team (SyntaxSquad), project managers, and other stakeholders who need a clear description of the system’s functionality and technical requirements.

### 1.3 System Overview
AirAware consists of three main components:
- **Hardware:** Arduino-based IoT device with sensors.  
- **Backend:** Node.js server with a database (MongoDB/PostgreSQL) for storage and analysis.  
- **Frontend:** Mobile app in React Native for displaying data and providing notifications.

---

## 2. Functional Requirements

### 2.1 Sensor Data
- The system shall measure and store temperature, humidity, particulate matter (PM2.5, PM10), CO₂ levels, and VOC levels.  
- Data shall be collected continuously and sent to the backend for processing.  
- Users shall be able to view real-time data in the app.

### 2.2 User Management
- Users shall be able to register and log in using email and password.  
- Roles: Admin and regular users.

### 2.3 Notifications
- The system shall send push notifications when critical air quality levels are detected.  
- Users shall be able to customize their notification settings.

### 2.4 Historical Data & Analytics
- Users shall be able to view historical measurements and analyze trends.  
- Data shall be displayed using graphs and tables.

---

## 3. Non-Functional Requirements

### 3.1 Performance
- The system shall support at least 1000 concurrent users.  
- Sensor data shall be updated with a maximum delay of 10 seconds.

### 3.2 Scalability
- The backend shall be designed to easily scale when needed.  
- The database shall be optimized for handling large volumes of data.

### 3.3 Compatibility
- The mobile app shall be compatible with both iOS and Android platforms.  
- The backend shall support both MongoDB and PostgreSQL.

---

## 4. System Architecture

### 4.1 Hardware Components
- Arduino Uno Rev 4

### 4.2 Software Stack
- **Frontend:** React Native  
- **Backend:** Node.js with Express  
- **Database:** MongoDB/PostgreSQL  
- **Embedded Programming:** C++ (PlatformIO)

---

## 5. Limitations
- Sensor accuracy is influenced by physical factors such as temperature and humidity.  
- The system requires an internet connection to function optimally.

---

## 6. Future Development
- Integration with smart home systems (e.g., Google Home, Apple HomeKit).  
- AI-based analysis for air quality prediction.  
- API for third-party integrations.

---

This document outlines the fundamental requirements for AirAware and may be updated as the project progresses.
