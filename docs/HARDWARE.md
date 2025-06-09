# Hardware

This document contains all the hardware used in the projects, along with a brief explanation of their functions.

## Hardware List:

### Microcontroller:
- **Arduino UNO REV 4 WiFi**

### Sensors:
- **SparkFun ENS160/BME280 Environmental Combo Breakout**
- **SPS30 Particulate Matter (PM) sensor**
- **MQ2 Gas sensor (currently not implemented)**

### Additional Components:
- **LED Traffic Light Module**

---

## Hardware Explanation:

### Arduino UNO REV 4 WiFi
A microcontroller from Arduino. It is used to program various components, control their behavior, and provide them with power. It includes built-in WiFi functionality as well as a QWIIC connection.

For more information, visit the Arduino website:  
[Link to Arduino UNO REV 4 WiFi at Arduino](https://docs.arduino.cc/hardware/uno-r4-wifi/)

---

## Sensors:

### SparkFun ENS160/BME280 Environmental Combo Breakout

This component is a combination of two sensors: **ENS160** and **BME280**.

#### ENS160
- Calculates indoor air quality using the standardized **AQI (Air Quality Index)** scale from 5 to 1, where 1 represents the best air quality.
- Measures **TVOC (Total Volatile Organic Compounds)** in **ppb (Parts Per Billion)** — the lower the ppb value, the fewer VOCs are present in the air.
- Based on the ppb value of TVOC, it also estimates **eCO₂ (equivalent Carbon Dioxide)** — an approximation of the CO₂ concentration.
- In addition to reading TVOC, the ENS160’s **MOX (Metal Oxide)** sensors produce raw values in **ohms (Ω)**, which can be used for further calculations in combination with other sensors.

#### BME280
- Measures air pressure in **hPa** or **Pa (hectopascal / pascal)**.
- Measures temperature in **°C (Celsius)**, with a range from -40°C to +85°C.
- Measures relative humidity in **RH (Relative Humidity)**, ranging from 0% to 100%.

---

### SPS30 Particulate Matter (PM) Sensor

Measures **PM (Particulate Matter)** concentration in the air using laser-based light scattering.  
PM is divided into several categories based on particle size in **µm (micrometers)**.

SPS30 detects and reads the following PM categories:

#### PM1.0
- Particles ≤ 1 µm.
- Includes ultrafine particles such as those from vehicle exhaust.

#### PM2.5
- Particles ≤ 2.5 µm.
- Includes smoke, soot, and smaller pollen particles.

#### PM4.0
- Particles ≤ 4 µm.
- May include a mix of particles from other PM categories, such as soot or dust.

#### PM10
- Particles ≤ 10 µm.
- Includes dust, larger spores, or pollen.

For each PM category, the SPS30 sensor provides both **mass concentration** and **particle count** values.

#### Mass Concentration
- Measured in **micrograms per cubic meter (µg/m³)**.
- Indicates the total weight of particles in one cubic meter of air.
- The higher the mass concentration value, the more particles are present in the air.

#### Particle Count
- Measured in **number of particles per cubic centimeter (#/cm³)**.  
  **NOTE:** `#` denotes the number of particles.
- Indicates how densely packed the particles are in a given space, without accounting for their size.

---

### MQ2 Gas Sensor *(Note: Not implemented at this stage)*

The MQ2 is a gas sensor that detects flammable and harmful gases.

**Detected gases:**
- Liquefied Petroleum Gas (LPG)
- Butane
- Propane
- CH₄ (Methane)
- H₂ (Hydrogen)
- CO (Carbon Monoxide)
- Alcohol (e.g., Ethanol)

The voltage generated when MQ2 reacts to these gases can be converted into a **ppm (Parts Per Million)** value.  
However, MQ2 cannot automatically distinguish between the different gases and requires calibration depending on the intended environment or use case.
