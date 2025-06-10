# Component Guide

Here you can find brief descriptions and resource links for key variables, functions, or classes related to the various components.

---

## BME280

### Functions

This library allows the user to:

- Read pressure in **Pa**  
- Read temperature in **°C**  
- Read humidity in **%RH**

### Mathematical Functions

The library also includes the following mathematical functions based on the above readings:

- Read temperature in **°F**  
- Read altitude in **meters**  
- Read altitude in **feet**

### Resources

- [BME280 – Datasheet (PDF)](https://www.electrokit.com/upload/product/41020/41020823/BST-BME280_DS001-10.pdf)  
- [SparkFun BME280 Arduino Library (GitHub)](https://github.com/sparkfun/SparkFun_BME280_Arduino_Library)

---

## ENS160

### Functions

- Reads air quality and returns a value based on the **AQI** scale  
- Outputs a **TVOC** value in **PPB**  
- Calculates **eCO₂** based on the TVOC value  
- Outputs raw values in **ohms (Ω)**

### Resources

- [ENS160 – Datasheet (PDF)](https://github.com/sparkfun/SparkFun_Indoor_Air_Quality_Sensor-ENS160_Arduino_Library/blob/main/Documentation/SC-001224-DS-7-ENS160-Datasheet.pdf)  
- [SparkFun ENS160 Arduino Library (GitHub)](https://github.com/sparkfun/SparkFun_Environmental_Combo_Breakout_ENS160_BME280_QWIIC)  
- [ENS160 Test Kit Quick Start Guide](https://www.sciosense.com/wp-content/uploads/2023/12/ENS160-Dashboard-Quick-Start-Guide.pdf)

---

## SPS30

**Sensor Hardware (SPS30)**  
SPS is a fine particulate sensor from Sensirion that uses laser scattering to measure **PM1.0**, **PM2.5**, **PM4**, and **PM10** in real time.

### Sensor Components / Functions

| Function                 | Description                          |
|--------------------------|--------------------------------------|
| `start_measurement()`    | Starts an active measurement cycle   |
| `stop_measurement()`     | Stops the measurement                |
| `read_data()`            | Fetches particle data from the sensor |
| `get_serial_number()`    | Returns a unique serial number       |
| `perform_fan_cleaning()` | Initiates cleaning of the sensor fan |
| `check_data_ready()`     | Checks if new data is available      |

### Resources

- [SPS30 – Datasheet (PDF)](https://eu.mouser.com/datasheet/2/682/Sensirion_PM_Sensors_Datasheet_SPS30-3539491.pdf)  
- [SPS30 – Arduino Library (GitHub)](https://github.com/Sensirion/arduino-sps)

---

## MQ2 *(Note: Not currently implemented)*

### Introduction

The MQ2 gas sensor detects the following gases:
- LPG  
- Smoke  
- Alcohol  
- Propane  
- Hydrogen  
- Methane  
- Carbon Monoxide  

### Resources

- [MQ2 – Getting Started Guide](https://arduinogetstarted.com/tutorials/arduino-gas-sensor)  
- [MQ2 – Arduino Project Hub](https://projecthub.arduino.cc/m_karim02/arduino-and-mq2-gas-sensor-f3ae33)
