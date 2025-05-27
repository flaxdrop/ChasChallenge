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
│   ├── Background.jsx              # Reusable background component
│   ├── BoxGradient.jsx             # Reusable component container with a themed gradient background
│   ├── ContainerGradient.jsx       # Reusable themed wrapper component that wraps most content
│   ├── CurrentAQI.jsx              # Displays the most recent AQI, with color-coded rating and health advice
│   ├── CustomSwitch.jsx            # Customizable switch used in settings for toggles like notifications and theme
│   ├── RefreshButton.jsx           # Manual refresh button to fetch new chart data
│   ├── ReusableChart.jsx           # Displays sensor data in a chart, visualizing changes over time
│   ├── ReusableCurrentValue.jsx    # Fetches and displays the latest data point of a given sensor
│   ├── ValueInfoModal.jsx          # Modal showing info about the current sensor value when the info icon is pressed
│   └── WeeklyAverageChart.jsx      # Displays a chart of average sensor values over the past 7 days
├── docs/                       # Project documentation
│   ├── README.md
│   ├── ACCESSIBILITY.md          # Accessibility features and considerations
│   └── TEST.md                   # Test documentation
├── hooks/                      # Custom hooks for data fetching
│   ├── useManualRefresh.js        # Hook for manually triggering a fetch
│   └── useRefresh.js              # Hook for auto-refreshing data
├── navigation/
│   └── Navigation.js              # Stack and tab navigation configuration
├── screens/                    # App screens
│   ├── AQI.jsx                    # Contains ReusableChart and CurrentAQI for AQI data display
│   ├── Dashboard.jsx              # Dashboard view
│   ├── Humidity.jsx               # Displays humidity data via chart and current value
│   ├── OnboardingScreen.jsx       # Intro/setup screens for new users
│   ├── Overview.jsx               # Shows latest sensor values; updates every 30 seconds
│   ├── Settings.jsx               # Settings for notifications, dark/light mode, etc.
│   ├── SplashScreen.jsx           # Initial splash screen
│   └── Temperature.jsx            # Displays temperature data via chart and current value
├── tests/                      # Unit and integration tests
├── theme/                      # Theme context
    ├── colors.js                   # Colors for dark and light themes
    ├── customTheme.js              # Custom theme, fonts etc
    ├── ThemeContext.js             # Theme Context Provider
├── App.js                      # App entry point
├── app.json                    # Expo project config
├── index.js                    # Main index file
├── package.json                # Dependency list
└── package-lock.json           # Locked dependency versions

