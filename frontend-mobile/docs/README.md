# AirAware - Mobile Application

**Frontend Developers**\
[Jesper Olsson](https://github.com/jesperolsson89)\
[Erik Torres Puente](https://github.com/ErikTP)

## Project description and features

    The AirAware React Native application displays real time data from air quality and environment sensors connected to an Arduino unit. Data is transmitted via WiFi to a backend on Render and then displayed automatically in the mobile app. The user can easily monitor the current air quality in their environment and get recommendations and precaution tips based on the latest data from the arduino device.


## Figma design
[Figma Prototype Link](https://www.figma.com/design/zgqiK0v3QNgXFoYyZLTjyT/AirAware?node-id=0-1&p=f&t=86vQwL5EpQnTgC2I-0)

## Installation
```
Create a .env file inside of /frontend-mobile/
Add "EXPO_PUBLIC_RENDER_URL=https://chaschallenge-backend.onrender.com" in it.

Download the Expo Go mobile application from the appstore on your phone.
Enter "cd frontend-mobile" in your terminal.
In terminal enter: npm install,
In terminal enter: npx expo start,

Open the Expo Go app on your phone and scan the QR code that shows up in your terminal. If the Expo Go app isnt able to find the app try: "npx expo start --tunnel"
```

## Required dependencies

## Project folder structure
```plaintext
frontend-mobile/
├── assets/                     # Static images and assets
├── components/                 # Reusable components
│   ├── AqiBar.jsx                  # Displays a chart and the current air quality index, providing users with real-time AQI values and related health information
│   ├── AqiDisplay.jsx              # Displays the latest Air Quality Index (AQI) value fetched from an API, along with related warnings and advice
│   ├── Background.jsx              # Reusable background component
│   ├── BoxGradient.jsx             # Reusable component container with a themed gradient background
│   ├── ContainerGradient.jsx       # Reusable themed wrapper component that wraps most content
│   ├── CurrentAQI.jsx              # Displays the most recent AQI, with color-coded rating and health advice
│   ├── CustomSwitch.jsx            # Customizable switch used in settings for toggles like notifications and theme
│   ├── PaginationDots.jsx          # Visually indicates the current slide position within a two-slide AQI slideshow
│   ├── Powerbutton.jsx             # Displays a large power button that users can press to toggle the air quality sensor system on or off
│   ├── PrecautionBox.jsx           # Shows either AQI-related safety precautions or usage instructions, depending on the selected context
│   ├── RefreshButton.jsx           # Manual refresh button to fetch new chart data
│   ├── ReusableChart.jsx           # Displays sensor data in a chart, visualizing changes over time
│   ├── ReusableCurrentValue.jsx    # Fetches and displays the latest data point of a given sensor
│   ├── SensorInfoCircles.jsx       # Displays a grid of sensor icons and values for temperature, humidity and air pressure 
│   ├── SlideContent.jsx            # Manages and renders the content of a swipeable slideshow, switching between live controls and historical AQI data
│   ├── ValueInfoModal.jsx          # Modal showing info about the current sensor value when the info icon is pressed
│   └── WeeklyAverageChart.jsx      # Displays a chart of average sensor values over the past 7 days
├── data/                       # Data management
│   ├── dashboardData.js            # JSON-like object storing AQI levels, labels, and sensor information for the dashboard
│   ├── infoData.js                 # Provides descriptive titles and explanations for each air quality and environmental sensor value displayed in Overview.js
│   ├── warningData.js              # Provides warning levels, advice, and colors for different AQI values displayed in AQI.jsx
├── docs/                       # Project documentation
│   ├── README.md
│   ├── ACCESSIBILITY.md            # Accessibility features and considerations
│   └── TEST.md                     # Test documentation
├── hooks/                      # Custom hooks for data fetching
│   ├── useDashboardLogic.js        # Hook that manages sensor data, animations, and user interactions for the dashboard screen
│   ├── useManualRefresh.js         # Hook for manually triggering a fetch
│   └── useRefresh.js               # Hook for auto-refreshing data
├── navigation/
│   └── Navigation.js               # Stack and tab navigation configuration
├── screens/                    # App screens
│   ├── AQI.jsx                     # Contains ReusableChart and CurrentAQI for AQI data display
│   ├── Dashboard.jsx               # Displays current air quality, sensor data, and controls in an animated, accessible view for monitoring and managing air quality in real time.
│   ├── Humidity.jsx                # Displays humidity data via chart and current value
│   ├── OnboardingScreen.jsx        # Introduces the app’s features through animated and interactive presentation slides.
│   ├── Overview.jsx                # Shows latest sensor values; updates every 30 seconds
│   ├── Settings.jsx                # Settings for notifications, dark/light mode, etc.
│   ├── SplashScreen.jsx            # Displays a launch animation with the app's logo, before directing the user to the onboarding flow.
│   └── Temperature.jsx             # Displays temperature data via chart and current value
├── tests/                      # Unit and integration tests
├── theme/                      # Theme context
    ├── colors.js                   # Colors for dark and light themes
    ├── customTheme.js              # Custom theme, fonts etc
    ├── ThemeContext.js             # Theme Context Provider
├── utils/                      # Utility function
│   ├── aqiUtils.js                 # Function that categorizes AQI values into levels.
├── App.js                          # App entry point
├── app.json                        # Expo project config
├── index.js                        # Main index file
├── package.json                    # Dependency list
└── package-lock.json               # Locked dependency versions

