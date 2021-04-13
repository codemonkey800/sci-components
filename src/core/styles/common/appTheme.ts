import { Colors, colors } from "../common/bases/colors";
import { Corners, corners } from "../common/bases/corners";
import { Shadows, shadows } from "../common/bases/shadows";
import { Spacing, spacing } from "../common/bases/spacing";
import { Typography, typography } from "../common/bases/typography";

export interface AppTheme {
  colors: Colors;
  corners: Corners;
  shadows: Shadows;
  spacing: Spacing;
  typography: Typography;
}

export const appTheme: AppTheme = {
  colors: colors,
  corners: corners,
  shadows: shadows,
  spacing: spacing,
  typography: typography,
};
