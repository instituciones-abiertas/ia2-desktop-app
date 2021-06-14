import React, { ReactNode } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { version } from '../constants/misc';

const Version = () => (
  <Typography
    style={{
      position: 'absolute',
      bottom: '15px',
      right: '8px',
      color: '#6c757d',
      cursor: 'default',
    }}
  >
    {`v${version}`}
  </Typography>
);

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
  return (
    <ThemeProvider theme={theme}>
      {children}
      <Version />
    </ThemeProvider>
  );
}
