// Core
import ReactDOM from 'react-dom'

import { AppWrap } from './AppWrap';

// Material theme
import { ThemeProvider } from "@material-ui/core/styles"

// App initializaion
import { theme } from './@init'

// Cookies
import { CookiesProvider } from "react-cookie";

// Redux
import { Provider as ReduxProvider } from 'react-redux'
import { store as reduxStore } from './@init/redux'

ReactDOM.render(
    <ReduxProvider store={reduxStore}>
        <ThemeProvider theme={theme}>
            <CookiesProvider>
            <AppWrap />
            </CookiesProvider>
        </ThemeProvider>
    </ReduxProvider>,
    document.getElementById('root')
);
