import React, { ReactNode } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const theme = createMuiTheme({
    palette: {
      common: {
        white: '#ffffff',
      },
      primary: {
        main: '#00D6A1',
        light: '#FF7A68',
        dark: '#1F3366',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#1F3366',
        light: '#FFCA00',
        dark: '#00D6A1',
        contrastText: '#ffffff',
      },
      background: {
        default: '#1F3366',
      },
    },
    typography: {
      fontFamily: `Saira-Regular`,
    },
    overrides: {
      MuiStepLabel: {
        label: {
          '&$active': {
            color: '#1F3366',
            fontWeight: 800,
            fontSize: '1.2em',
          },
        },
      },
    },
  });

  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
