import { TypographyStyle } from "@material-ui/core/styles/createTypography";

enum FontWeight {
  bold = 700,
  light = 300,
  medium = 800,
  regular = 400,
  semibold = 600,
}

export interface Typography {
  fontFamily: React.CSSProperties["fontFamily"];
  styles: {
    header: {
      xxl: TypographyStyle;
      xl: TypographyStyle;
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
    };
    body: {
      button: TypographyStyle;
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
    };
    caps: {
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
    };
  };
}

export const typography: Typography = {
  fontFamily: "Open Sans",
  styles: {
    body: {
      button: {
        fontSize: 13,
        fontWeight: FontWeight.semibold,
        letterSpacing: "0.3px",
        lineHeight: "20px",
        textTransform: "none",
      },
      l: {
        fontSize: 18,
        fontWeight: FontWeight.regular,
        letterSpacing: "0.3px",
        lineHeight: "28px",
      },
      m: {
        fontSize: 16,
        fontWeight: FontWeight.regular,
        letterSpacing: "0.3px",
        lineHeight: "26px",
      },
      s: {
        fontSize: 14,
        fontWeight: FontWeight.regular,
        letterSpacing: "0.3px",
        lineHeight: "24px",
      },
      xs: {
        fontSize: 13,
        fontWeight: FontWeight.regular,
        letterSpacing: "0.3px",
        lineHeight: "20px",
      },
      xxs: {
        fontSize: 12,
        fontWeight: FontWeight.regular,
        letterSpacing: "0.3px",
        lineHeight: "18px",
      },
      xxxs: {
        fontSize: 11,
        fontWeight: FontWeight.regular,
        letterSpacing: "0.3px",
        lineHeight: "16px",
      },
    },
    caps: {
      xxs: {
        fontSize: 12,
        fontWeight: FontWeight.semibold,
        letterSpacing: "1.0px",
        lineHeight: "18px",
        textTransform: "uppercase",
      },
      xxxs: {
        fontSize: 11,
        fontWeight: FontWeight.semibold,
        letterSpacing: "1.0px",
        lineHeight: "16px",
        textTransform: "uppercase",
      },
      xxxxs: {
        fontSize: 10,
        fontWeight: FontWeight.semibold,
        letterSpacing: "1.0px",
        lineHeight: "14px",
        textTransform: "uppercase",
      },
    },
    header: {
      l: {
        fontSize: 18,
        fontWeight: FontWeight.semibold,
        letterSpacing: "0.3px",
        lineHeight: "24px",
      },
      m: {
        fontSize: 16,
        fontWeight: FontWeight.semibold,
        letterSpacing: "0.3px",
        lineHeight: "22px",
      },
      s: {
        fontSize: 14,
        fontWeight: FontWeight.semibold,
        letterSpacing: "0.3px",
        lineHeight: "20px",
      },
      xl: {
        fontSize: 22,
        fontWeight: FontWeight.semibold,
        letterSpacing: "0.3px",
        lineHeight: "30px",
      },
      xs: {
        fontSize: 13,
        fontWeight: FontWeight.semibold,
        letterSpacing: "0.3px",
        lineHeight: "18px",
      },
      xxl: {
        fontSize: 26,
        fontWeight: FontWeight.semibold,
        letterSpacing: "0.3px",
        lineHeight: "34px",
      },
      xxs: {
        fontSize: 12,
        fontWeight: FontWeight.semibold,
        letterSpacing: "0.3px",
        lineHeight: "18px",
      },
      xxxs: {
        fontSize: 11,
        fontWeight: FontWeight.semibold,
        letterSpacing: "0.3px",
        lineHeight: "16px",
      },
    },
  },
};
