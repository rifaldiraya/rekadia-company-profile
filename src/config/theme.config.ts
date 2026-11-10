import { THEME_BORDER_RADIUS } from "@/constants";
import { Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const shadows = createTheme().shadows;

export const themeConfig: Theme = createTheme({
  shadows,
  typography: {
    fontFamily: "'Inter', 'sans-serif'",
  },
  color: {
    accent: {
      50: "rgba(238, 247, 255, 1)",
      100: "rgba(218, 236, 255, 1)",
      200: "rgba(189, 222, 255, 1)",
      300: "rgba(144, 202, 255, 1)",
      400: "rgba(76, 165, 255, 1)",
      500: "rgba(53, 139, 252, 1)",
      600: "rgba(31, 107, 241, 1)",
      700: "rgba(23, 85, 222, 1)",
      800: "rgba(25, 70, 180, 1)",
      900: "rgba(26, 62, 142, 1)",
      950: "rgba(21, 39, 86, 1)",
    },
    bmw: {
      50: "rgba(246, 247, 249, 1)",
      100: "rgba(236, 238, 242, 1)",
      200: "rgba(213, 219, 226, 1)",
      300: "rgba(176, 186, 201, 1)",
      400: "rgba(133, 149, 171, 1)",
      500: "rgba(102, 121, 145, 1)",
      600: "rgba(81, 97, 120, 1)",
      700: "rgba(66, 78, 98, 1)",
      800: "rgba(57, 67, 83, 1)",
      900: "rgba(51, 59, 71, 1)",
      950: "rgba(34, 39, 47, 1)",
    },
  },
  palette: {
    background: {
      default: "rgba(255,255,255)",
      paper: "white",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {},
      variants: [
        {
          props: { variant: "h1" },
          style: { fontSize: "32px", fontWeight: 600 },
        },
        {
          props: { variant: "h2" },
          style: { fontSize: "30px", fontWeight: 600 },
        },
        {
          props: { variant: "h3" },
          style: { fontSize: "28px", fontWeight: 600 },
        },
        {
          props: { variant: "h4" },
          style: { fontSize: "26px", fontWeight: 600 },
        },
        {
          props: { variant: "h5" },
          style: { fontSize: "24px", fontWeight: 600 },
        },
        {
          props: { variant: "h6" },
          style: { fontSize: "22px", fontWeight: 600 },
        },
        {
          props: { variant: "body1" },
          style: { fontSize: "16px" },
        },
        {
          props: { variant: "body2" },
          style: { fontSize: "14px" },
        },
      ],
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: "auto",
          borderRadius: `${THEME_BORDER_RADIUS}px`,
          border: "1px solid rgba(0, 0, 0, .1)",
          width: "fit-content",
          padding: 2,
          "&.MuiTabs-vertical": {
            maxWidth: "180px",
            width: "100%",
          },
          "&.MuiTabs-vertical ~ .MuiTabPanel-root": {
            margin: "0 0 0 18px",
            width: "100%",
          },
        },
        indicator: {
          height: "100%",
          width: "100%",
          borderRadius: `${THEME_BORDER_RADIUS - 2}px`,
          background: "white",
          border: "1px solid rgba(0,0,0,.1)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: "auto",
          zIndex: 1,
          borderRadius: `${THEME_BORDER_RADIUS - 2}px`,
          textTransform: "none",
          "&.MuiButtonBase-root": {
            padding: "8px 12px",
            minHeight: "auto",
          },
          "&.Mui-selected": {
            fontWeight: 600,
            color: "MenuText",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: "500px",
          width: "100%",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "14px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "18px",
          fontWeight: 600,
          paddingTop: "24px",
          paddingBottom: "0",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: "16px !important",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "0 24px 24px 24px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "36px",
          ".MuiSvgIcon-root": {
            width: 21,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: `${THEME_BORDER_RADIUS}px`,
        },
      },
    },
    MuiTouchRipple: {
      styleOverrides: {
        root: {
          opacity: 0.2,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          ".MuiTouchRipple-root": {
            opacity: 0.5,
          },
        },
      },
      defaultProps: {
        variant: "contained",
        disableElevation: true,
        size: "medium",
      },
      variants: [
        // {
        //   props: { size: 'large' },
        //   style: { padding: '14px 18px', fontSize: '16px', fontWeight: 600 }
        // },
        // {
        //   props: { size: 'medium' },
        //   style: { padding: '12px 16px', fontSize: '16px', fontWeight: 600 }
        // },
        // {
        //   props: { size: 'small' },
        //   style: { padding: '9px 13px', fontSize: '14px', fontWeight: 600 }
        // }
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: THEME_BORDER_RADIUS,
        },
      },
    },
  },
  shape: {
    borderRadius: THEME_BORDER_RADIUS,
  },
});

declare module "@mui/material/styles" {
  interface Theme {
    color: {
      background: string;
      accent: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
      };
      bmw: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
      };
    };
  }
  interface ThemeOptions {
    color?: {
      background?: string;
      accent?: {
        50?: string;
        100?: string;
        200?: string;
        300?: string;
        400?: string;
        500?: string;
        600?: string;
        700?: string;
        800?: string;
        900?: string;
        950?: string;
      };
      bmw?: {
        50?: string;
        100?: string;
        200?: string;
        300?: string;
        400?: string;
        500?: string;
        600?: string;
        700?: string;
        800?: string;
        900?: string;
        950?: string;
      };
    };
  }
}
