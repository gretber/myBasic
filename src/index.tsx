// Core
import ReactDOM from 'react-dom'

// Material theme
import { ThemeProvider } from "@material-ui/core/styles"

// App initializaion
import { theme } from './@init'

// Redux
import { Provider as ReduxProvider } from 'react-redux'
import { store as reduxStore } from './@init/redux'

// Component
import { App } from './App'

ReactDOM.render(
    <ReduxProvider store={reduxStore}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </ReduxProvider>,
    document.getElementById('root')
);
