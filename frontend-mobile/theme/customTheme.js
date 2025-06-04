export const buildCustomTheme = (baseTheme, isDark) => ({
    dark: isDark,
    colors: {
        primary: baseTheme.primary,
        secondary: baseTheme.secondary,
        textAccentPrimary: baseTheme.textAccentPrimary,
        textAccentSecondary: baseTheme.textAccentSecondary,

        backgroundPrimary: baseTheme.backgroundPrimary,
        backgroundSecondary: baseTheme.backgroundSecondary,

        textPrimary: baseTheme.textPrimary,
        textSecondary: baseTheme.textSecondary,
        iconAccent: baseTheme.iconAccent,

        notification: baseTheme.notification,
        dotPrimary: baseTheme.dotPrimary,
        dotSecondary: baseTheme.dotSecondary,
        circleBackground: baseTheme.circleBackground,
        shadow: baseTheme.shadow,
        textBox: baseTheme.textBox,

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