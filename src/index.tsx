// Core
import ReactDOM from 'react-dom'

import { AppWrap } from './AppWrap';

// Material theme
import { ThemeProvider } from "@material-ui/core/styles"

// App initializaion
import { theme } from './@init'

// Redux
import { Provider as ReduxProvider } from 'react-redux'
import { store as reduxStore } from './@init/redux'

ReactDOM.render(
    <ReduxProvider store={reduxStore}>
        <ThemeProvider theme={theme}>
            <AppWrap />
        </ThemeProvider>
    </ReduxProvider>,
    document.getElementById('root')
);
