// Funktion för att formatera mätdata på ett konsekvent sätt genom hela API:et

export const formatMeasurement = (type, data) => {
  return data.measurements.map((m) => {
    const base = {
      id: m.id,
      timestamp: m.timestamp,
    };

    switch (type) {
      case "temperature":
        return { ...base, temperature: m.temperature };
      case "humidity":
        return { ...base, humidity: m.humidity };
      case "pressure":
        return { ...base, pressure: m.pressure };
      case "aqi":
        return { ...base, aqi: m.airQuality.aqi };
      case "tvoc":
        return { ...base, tvoc: m.airQuality.tvoc };
      case "eco2":
        return { ...base, eco2: m.airQuality.eco2 };

      case "airquality":
        return {
          ...base,
          aqi: m.airQuality.aqi,
          tvoc: m.airQuality.tvoc,
          eco2: m.airQuality.eco2,
        };

      case "measurements":
        return {
          ...base,
          temperature: m.temperature,
          humidity: m.humidity,
          pressure: m.pressure,
        };

      case "all":
        return {
          ...base,
          temperature: m.temperature,
          humidity: m.humidity,
          pressure: m.pressure,
          aqi: m.airQuality.aqi,
          tvoc: m.airQuality.tvoc,
          eco2: m.airQuality.eco2,
        };

      default:
        return base;
    }
  });
};
