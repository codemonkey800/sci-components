import { common } from "@material-ui/core/colors";
import createMuiTheme, {
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme";
import { AppTheme, appTheme } from "../common/appTheme";

export const defaultThemeOptions: AppThemeOptions = {
  app: appTheme,
  palette: {
    divider: appTheme.colors.gray[200],
    error: {
      dark: appTheme.colors.error[600],
      light: appTheme.colors.error[200],
      main: appTheme.colors.error[400],
    },
    grey: {
      "100": appTheme.colors.gray[100],
      "200": appTheme.colors.gray[200],
      "300": appTheme.colors.gray[300],
      "400": appTheme.colors.gray[400],
      "500": appTheme.colors.gray[500],
      "600": appTheme.colors.gray[600],
    },
    info: {
      dark: appTheme.colors.info[600],
      light: appTheme.colors.info[200],
      main: appTheme.colors.info[400],
    },
    primary: {
      dark: appTheme.colors.primary[600],
      light: appTheme.colors.primary[300],
      main: appTheme.colors.primary[400],
    },
    secondary: {
      main: appTheme.colors.secondary[400],
    },
    success: {
      dark: appTheme.colors.success[600],
      light: appTheme.colors.success[200],
      main: appTheme.colors.success[400],
    },
    text: {
      disabled: appTheme.colors.gray[300],
      primary: common.black,
      secondary: appTheme.colors.gray[500],
    },
    type: "light",
    warning: {
      dark: appTheme.colors.warning[600],
      light: appTheme.colors.warning[200],
      main: appTheme.colors.warning[400],
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  shadows: [
    appTheme.shadows.none,
    appTheme.shadows.s,
    appTheme.shadows.s,
    appTheme.shadows.s,
    appTheme.shadows.s,
    appTheme.shadows.s,
    appTheme.shadows.s,
    appTheme.shadows.s,
    appTheme.shadows.s,
    appTheme.shadows.m,
    appTheme.shadows.m,
    appTheme.shadows.m,
    appTheme.shadows.m,
    appTheme.shadows.m,
    appTheme.shadows.m,
    appTheme.shadows.m,
    appTheme.shadows.m,
    appTheme.shadows.l,
    appTheme.shadows.l,
    appTheme.shadows.l,
    appTheme.shadows.l,
    appTheme.shadows.l,
    appTheme.shadows.l,
    appTheme.shadows.l,
    appTheme.shadows.l,
  ],
  shape: {
    borderRadius: appTheme.corners.m,
  },
  spacing: [
    appTheme.spacing.default,
    appTheme.spacing.xxxs,
    appTheme.spacing.xxs,
    appTheme.spacing.xs,
    appTheme.spacing.s,
    appTheme.spacing.m,
    appTheme.spacing.l,
    appTheme.spacing.xl,
    appTheme.spacing.xxl,
  ],
  transitions: {
    duration: {
      complex: 200,
      enteringScreen: 20,
      leavingScreen: 10,
      short: 150,
      shorter: 100,
      shortest: 50,
      standard: 200,
    },
    easing: {
      easeIn: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      sharp: "cubic-bezier(0, 0.2, 0.6, 1)",
    },
  },
  typography: {
    body1: appTheme.typography.styles.body.xs,
    body2: appTheme.typography.styles.body.xxs,
    button: appTheme.typography.styles.body.button,
    caption: appTheme.typography.styles.body.xxxs,
    fontFamily: `${appTheme.typography.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif`,
    h1: appTheme.typography.styles.header.xxl,
    h2: appTheme.typography.styles.header.xl,
    h3: appTheme.typography.styles.header.l,
    h4: appTheme.typography.styles.header.m,
    h5: appTheme.typography.styles.header.s,
    h6: appTheme.typography.styles.header.xs,
    overline: appTheme.typography.styles.caps.xxxs,
    subtitle1: appTheme.typography.styles.body.xs,
    subtitle2: appTheme.typography.styles.header.xxs,
  },
};

interface AppThemeOptions extends ThemeOptions {
  app: AppTheme;
}

export const defaultTheme = createMuiTheme(defaultThemeOptions);
