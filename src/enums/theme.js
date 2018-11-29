import { remCalc } from 'utils';

export const colors = {
  primary: '#137dc3',
  secondary: '#CED4DB',
  alert: '#E33A4F',
  success: '#17C122',
  warning: '#FFB843',
  white: '#fff',
};

export const theme = {
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.alert,
    },
    contrastThreshold: 3,
    tonalOffset: 0.08,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'Quicksand',
      'sans-serif',
    ].join(','),
		useNextVariants: true,
  },
  shape: {
    borderRadius: remCalc(3),
  },
  overrides: {
    MuiButton: {
      root: {
        height: remCalc(40),
        fontFamily: 'Quicksand',
      },
      label: {
        textTransform: 'none',
      },
    },
    MuiDialogTitle: {
      root: {
        fontSize: remCalc(16),
        padding: remCalc(20),
      },
    },
    MuiTableCell: {
      body: {
        fontFamily: 'Quicksand',
        padding: `0px ${remCalc(15)}`,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      head: {
        padding: `${remCalc(5)} ${remCalc(15)}`,
      },
    },
    MuiFormHelperText: {
      root: {
        fontFamily: 'Quicksand',
      },
    },
    MuiCollapse: {
      wrapperInner: {
        overflowX: 'auto',
      }
    }
  },
};