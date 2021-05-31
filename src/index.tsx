// Core
import ReactDOM from 'react-dom'
import App from './App'
import {AuthorizationPage} from './pages/AuthPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

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
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <AuthorizationPage />
                    </Route>
                    <Route path='/sheduler'>
                        <App />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    </ReduxProvider>,
    document.getElementById('root')
);
