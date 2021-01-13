import React, { ReactNode } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#8a0f4a',
        light: '#ffffff',
        dark: '#333441',
      },
      secondary: {
        main: '#ffffff',
        light: '#e7e8ec',
        dark: '#8a0f4a',
      },
    },
    typography: {
      fontFamily: `Montserrat`,
    },
    overrides: {
      MuiStepLabel: {
        label: {
          '&$active': {
            color: '#8a0f4a',
            fontWeight: 800,
            fontSize: '1.2em',
          },
        },
      },
      MuiCssBaseline: {
        '@global': {
          '*': {
            'scrollbar-width': 'thin',
          },
          '*::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
          },
        },
      },
    },
  });

  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
