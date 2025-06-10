# Air Quality Monitoring System Retrospective

## System developer retrospective

### Project Overview
The Air Quality Monitoring System was designed to collect environmental data using an Arduino Uno R4 WiFi board connected to multiple sensors (BME280, ENS160, SPS30), and transmit this data to a server for analysis and visualization. The system monitors temperature, humidity, pressure, air quality index, VOCs, eCO2, and particulate matter.

### What Went Well

#### Hardware Integration
- Successfully integrated three different sensors (BME280, ENS160, SPS30) with the Arduino Uno R4 WiFi
- Implemented proper temperature and humidity compensation for the ENS160 sensor
- Achieved reliable I2C communication with all sensors

#### Software Development
- Created modular code structure separating sensor reading, data processing, and communication
- Implemented WiFi connection handling with reconnection capabilities
- Set up proper JSON formatting for data transmission
- Applied appropriate error handling for sensor initialization

#### Data Transmission
- Successfully implemented data transmission to cloud services
- Established secure data transmission via HTTPS/SSL
- Created a consistent data format for server integration

### Challenges Faced

#### WiFi Connectivity
- The Arduino Uno R4 WiFi had some intermittent connection issues requiring reconnection logic
- Initial challenges with WiFi credentials management and security
- Limited built-in support for WiFi connection management compared to ESP boards

#### HTTPS Implementation
- Implementing secure HTTPS connections with the Arduino Uno R4 WiFi proved challenging
- Limited support for certificate handling required workarounds
- Had to evaluate multiple options (proxy server, ThingSpeak, direct SSL) before finding a suitable solution

#### Sensor Calibration
- The ENS160 air quality sensor required proper temperature and humidity compensation
- SPS30 particulate matter sensor needed specific initialization sequences
- Ensuring accurate readings across different environmental conditions was difficult
- The ENS160 temperature sensor is not totally reliable, leading to occasional inaccuracies in air quality readings

### Lessons Learned

1. **Platform Selection Matters**: The Arduino Uno R4 WiFi has strengths but also limitations for IoT projects compared to ESP32/ESP8266 boards
2. **Security Planning**: WiFi credentials and secure connections should be planned from the beginning
3. **Sensor Integration**: Temperature and environmental compensation significantly improve air quality sensor accuracy
4. **Data Architecture**: Consider data flow architecture early - direct-to-server vs. cloud service intermediary
5. **Library Dependencies**: Managing library versions and dependencies is crucial for stability

### Future Improvements

1. **Power Management**: Implement sleep modes and power optimization for battery operation
2. **Local Storage**: Add SD card support for offline data logging when WiFi is unavailable
3. **OTA Updates**: Implement over-the-air firmware updates for remote maintenance
4. **Configuration Interface**: Create a web interface for on-device configuration
5. **Sensor Fusion**: Implement advanced algorithms to combine sensor data for better accuracy
6. **Alert System**: Add threshold-based alerts for dangerous air quality conditions
7. **MQ2 Sensor Integration**: Consider adding an MQ2 gas sensor for additional VOC detection

### Technical Debt

1. Hardcoded server addresses and WiFi credentials need to be moved to configuration management
2. Better error handling for HTTP response codes needed
3. Memory optimization for JSON creation to prevent fragmentation
4. More robust reconnection logic for both WiFi and sensors
5. Better documentation of sensor calibration processes

### Conclusion

The Air Quality Monitoring System successfully meets its core requirements of gathering environmental data and transmitting it securely. While we faced challenges with HTTPS implementation and WiFi management on the Arduino Uno R4 WiFi platform, we found workable solutions that maintain security and reliability.

Going forward, focusing on power management and configuration interfaces would make the system more suitable for long-term deployment. Overall, the project demonstrates the feasibility of creating a connected air quality monitoring system using Arduino hardware, with room for continued improvement and optimization.
