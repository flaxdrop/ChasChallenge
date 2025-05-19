# IoT System for Air Quality Monitoring

This project is part of the **Chas Challenge** and focuses on the IoT system responsible for collecting air quality data using sensors and sending it to the backend for processing and storage.

## Overview

The IoT system is built around an Arduino-based microcontroller and various environmental sensors. It collects real-time data on air quality, including metrics such as temperature, humidity, pressure, CO₂ levels, and volatile organic compounds (VOCs). The data is transmitted to the backend for further analysis and integration with the mobile app.

## Hardware Components

- **Microcontroller**: Arduino UNO REV 4 WiFi
- **Sensors**:
  - SparkFun ENS160/BME280 Environmental Combo Breakout
  - SPS30 Particulate Matter (PM) Sensor

## Features

- Real-time air quality monitoring
- Data transmission to the backend via WiFi
- Compensation for temperature and humidity in sensor readings
- Integration with backend APIs for data storage and analysis

## How It Works

1. The Arduino collects data from the connected sensors.
2. The data is processed locally, including compensation for environmental factors.
3. The processed data is sent to the backend using HTTP POST requests.
4. The backend stores the data and makes it available for the mobile app.

## Repository Structure

- **/src**: Source code for the Arduino, including sensor drivers and data transmission logic.
- **/examples**: Example sketches demonstrating sensor usage and data collection.
- **/docs**: Documentation for hardware setup and system integration.

## Getting Started

1. Clone this repository.
2. Set up the hardware as described in the [HARDWARE.md](../docs/HARDWARE.md) file.
3. Upload the Arduino code from the `/src` directory to the microcontroller.
4. Ensure the backend is running and accessible.
5. Power on the system and monitor the serial output for data transmission logs.

## License

This project is licensed under the [Creative Commons Share-alike 4.0 International](http://creativecommons.org/licenses/by-sa/4.0/).

## Contributors

This project is developed by the IoT team as part of the Chas Challenge.