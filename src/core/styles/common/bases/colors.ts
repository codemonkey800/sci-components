interface Color {
  600?: string;
  500?: string;
  400: string;
  300?: string;
  200?: string;
  100?: string;
}

export interface Colors {
  beta: Color;
  primary: Color;
  secondary: Color;
  gray: Color;
  info: Color;
  success: Color;
  warning: Color;
  error: Color;
}

export const colors: Colors = {
  beta: {
    "100": "#F4F0F9",
    "200": "#F0EBF6",
    "400": "#7A41CE",
    "600": "#693BAC",
  },
  error: {
    "100": "#FEF2F2",
    "200": "#FBE8E8",
    "400": "#DC132C",
    "600": "#B70016",
  },
  gray: {
    "100": "#F8F8F8",
    "200": "#EAEAEA",
    "300": "#CCCCCC",
    "400": "#999999",
    "500": "#767676",
    "600": "#545454",
  },
  info: {
    "100": "#EFF2FC",
    "200": "#EBEFFC",
    "400": "#3867FA",
    "600": "#223F9C",
  },
  primary: {
    "100": "#F8F9FE",
    "200": "#EFF2FC",
    "300": "#A9BDFC",
    "400": "#3867FA",
    "500": "#2B52CD",
    "600": "#223F9C",
  },
  secondary: {
    "400": "#9BC74E",
  },
  success: {
    "100": "#ECF5F0",
    "200": "#E6F7ED",
    "400": "#3CB371",
    "600": "#1C7F48",
  },
  warning: {
    "100": "#FCF6EC",
    "200": "#FFF3E1",
    "400": "#F5A623",
    "600": "#946314",
  },
};
