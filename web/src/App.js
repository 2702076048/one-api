import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { SET_THEME } from 'store/actions';
// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// auth
import UserProvider from 'contexts/UserContext';
import StatusProvider from 'contexts/StatusContext';
import { SnackbarProvider } from 'notistack';
import CopySnackbar from 'ui-component/Snackbar';

// i18n
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// ==============================|| APP ||============================== //

const App = () => {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      dispatch({ type: SET_THEME, theme: storedTheme });
    }
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <I18nextProvider i18n={i18n} defaultNS={'common'}>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <SnackbarProvider
              autoHideDuration={5000}
              maxSnack={3}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              Components={{ copy: CopySnackbar }}
            >
              <UserProvider>
                <StatusProvider>
                  <Routes />
                </StatusProvider>
              </UserProvider>
            </SnackbarProvider>
          </NavigationScroll>
        </ThemeProvider>
      </I18nextProvider>
    </StyledEngineProvider>
  );
};

export default App;
