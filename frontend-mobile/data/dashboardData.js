const dashboardData = {
  AQI_LEVELS: [
    {
      color: "#00E400",
      range: "0 - 50",
      text: "Air quality is satisfactory, and air pollution poses little or no risk."
    },
    {
      color: "#FFFF00",
      range: "51 - 100",
      text: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."
    },
    {
      color: "#FF7E00",
      range: "101 - 150",
      text: "Members of sensitive groups may experience health effects. The general public is less likely to be affected."
    },
    {
      color: "#FF0000",
      range: "151 - 200",
      text: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects."
    },
    {
      color: "#8F3F97",
      range: "201 - 300",
      text: "Health alert: The risk of health effects is increased for everyone."
    },
    {
      color: "#7E0023",
      range: "301+",
      text: "Health warning of emergency conditions: everyone is more likely to be affected."
    }
  ],
  AQI_LABELS: [
    "Good",
    "Moderate",
    "Unhealthy for sensitive groups",
    "Unhealthy",
    "Very Unhealthy",
    "Hazardous"
  ],
  INFO_ITEMS: [
    {
      type: "temperature",
      label: "Temperature",
      icon: "thermometer",
      color: "#FF3B30"
    },
    {
      type: "humidity",
      label: "Humidity",
      icon: "cloud",
      color: "#00FF1A"
    },
    {
      type: "pressure",
      label: "Air Pressure",
      icon: "gauge",
      color: "#00BAFF"
    }
  ]
};

export default dashboardData;
