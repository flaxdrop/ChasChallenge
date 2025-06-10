# Team Name: SyntaxSquad

## Members

**System Development**  
[Alexander Arvedson](https://github.com/alexanderchasacademy)  
[John Collinder](https://github.com/flaxdrop)  
[Robert Bagunda](https://github.com/robag1137)  
[Emanuela Aseidu](https://github.com/ema-asi)

**Frontend**  
[Jesper Olsson](https://github.com/jesperolsson89)  
[Erik Torres Puente](https://github.com/ErikTP)

**Fullstack**  
[Benjamin Stenlund](https://github.com/benjamin762)    
[Anton Athley](https://github.com/AntonAthley)  
[Rebecca Lindman](https://github.com/rebeccalindman)

## Product Codename: AirAware

- [Introduction](#introduction)
- [Technology and Architecture Choices](#technology-and-architecture-choices)
- [Team Structure and Responsibilities](#team-structure-and-responsibilities)
- [Minimum Requirements for the Final Product](#minimum-requirements-for-the-final-product)
- [Timeline and Milestones](#timeline-and-milestones)
- [Problem Handling](#problem-handling)
- [List of Required Hardware, Especially Sensors](#list-of-required-hardware-especially-sensors)

---

### Introduction

In today’s society, air quality is becoming an increasingly important aspect of our health and well-being. Poor indoor air can affect our concentration, productivity, and long-term health. Therefore, it is crucial to have the ability to measure and monitor the air quality where we spend the most time – at home and at the office.

Our project aims to develop a smart product that continuously monitors air quality and provides users with real-time information on environmental factors such as CO2 levels, volatile organic compounds (VOC), particulate concentrations (PM2.5 and PM10), temperature, and humidity. By using a combination of sensors and a user-friendly app, users gain detailed insight into the indoor air they breathe and can take action to improve the environment when needed.

We choose to create a mobile app to allow users to quickly and easily access the desired information. A website would not provide the same value as a well-produced and specialized app.

Our product will be easy to use and install, and its purpose is to create a healthier and more productive indoor environment. We believe this tool can help both individuals and offices take control of their indoor environment, leading to better air quality, increased comfort, and health.

This product plan outlines the technical specifications, user flow, and resources needed to develop our air quality monitor – from sensor selection and hardware design to app development and marketing.

---

## Technology and Architecture Choices

- **Frontend – Mobile App UI:** React Native  
- **Backend – Server and API:** Node.js  
- **IoT – Sensors, Microcontroller, and Communication:** Arduino  
- **Database and API Structure:** PostgreSQL  
- **Microcontroller Programming:** Arduino  

---

## Team Structure and Responsibilities

### Frontend Developers

- Mobile app for users  
- Dashboard showing real-time data on air quality, temperature, and humidity  
- Notifications for poor air quality or high humidity (e.g., risk of mold)  
- Manual ventilation control and preferred air quality settings  
- Historical data and trend analysis  
- Integration with smart home systems (e.g., Google Home, Home Assistant)

### Backend (Fullstack Developers)

- **Data Collection and Analysis:**  
  - Collect data from IoT sensors  
  - Algorithms to analyze air quality and generate recommendations  
  - Store historical data to analyze air quality changes  
  - Real-time updates via WebSockets  

- **Security and System Integration:**  
  - User authentication for personal configurations  
  - API to control smart ventilation based on user settings  
  - Integration with external systems (e.g., weather data) to adjust ventilation

### Embedded Systems (System Developers)

- **IoT Sensors and Smart Communication:**  
  - Sensors for CO2, particulates, VOC, temperature, and humidity  
  - Communication via WiFi, Bluetooth, or Zigbee  
  - Compatibility with smart home systems (e.g., Google Home, Apple HomeKit)  
  - Low power consumption and energy-efficient design  

- **Automated Ventilation Control:**  
  - Airflow control based on sensor data  
  - Integration with home ventilation systems  
  - Fail-safe solution to ensure operation during network outages  

---

## Minimum Requirements for the Final Product

To be fully functional and useful, the final product should meet the following minimum requirements:

- Air quality monitoring (CO2, VOC, PM2.5/PM10), as well as temperature and humidity  
- Real-time data updates and display through a user-friendly mobile app  
- Alarm functions and alerts based on user-defined thresholds  
- Database storage and history to show data over time  
- Secure data transfer and user authentication when needed  

By meeting these requirements, the product will be useful, reliable, and user-friendly for monitoring and managing air quality at home or in the office.

---

## Timeline and Milestones

- **Week 1:** Planning, requirements, and design  
- **Week 2:** Hardware setup and prototype  
- **Week 3:** Software development (app/web)  
- **Week 4:** Integration and testing  
- **Week 5:** Improvements and debugging  
- **Week 6:** Final testing and optimization  
- **Week 7:** Marketing and presentation  
- **Week 8:** Documentation and finalization  

---

## Problem Handling

Everyone should be aware that things will go wrong, and the most important thing is to address issues the right way. As long as everyone does their best, problems will be resolved. Communication is key. We will handle problems by being open and speaking as transparently with each other as possible. A lack of communication can quickly lead to bad morale, which we aim to avoid at all costs.

For more details on problem handling and team rules, see our [Group Contract (click here)](https://docs.google.com/document/d/1EWehsIZdjVD1zrrV2AYrWF8tX78TgLg2jFfP-Z-giwM/edit?usp=sharing).

---

## List of Required Hardware, Especially Sensors

1. **CO2 sensor** – To measure carbon dioxide concentration  
2. **VOC sensor** – To detect volatile organic compounds  
3. **PM sensor** – To measure particulate matter (PM2.5 and PM10)  
4. **Temperature and humidity sensor** – For measuring air’s physical properties  
5. **Air pressure sensor** – To measure pressure which can affect ventilation  
6. **DHT11 temperature and humidity sensor module**  
7. **GY-68 BMP180 barometer and temperature sensor module**  

---

## Communication Tools

Primary tools used:  
- **Discord**  
- **GitHub**  
- **Slack**  
- **Fritzing**  
- **VS Code**
