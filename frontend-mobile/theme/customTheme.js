export const buildCustomTheme = (baseTheme, isDark) => ({
    dark: isDark,
    colors: {
        primary: baseTheme.primary,
        secondary: baseTheme.secondary,
        accent: baseTheme.accent,

        backgroundPrimary: baseTheme.backgroundPrimary,
        backgroundSecondary: baseTheme.backgroundSecondary,

        textPrimary: baseTheme.textPrimary,
        textSecondary: baseTheme.textSecondary,
        textAccent: baseTheme.textAccent,

        notification: baseTheme.notification,

        tabBar: baseTheme.tabBar,
        tabBarIcon: baseTheme.tabBarIcon,
        infoIcon: baseTheme.infoIcon,
        headerBackground: baseTheme.headerBackground,

        themeButton: baseTheme.themeButton,
    },
    fonts: {
        regular: {
            fontFamily: "System",
            fontWeight: "normal",
        },
        medium: {
            fontFamily: "System",
            fontWeight: "800",
        }
    }
})