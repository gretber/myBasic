// Core
import ReactDOM from 'react-dom'
import App from './App'
import { AppWrap } from './AppWrap';
// import {AuthorizationPage} from './pages/AuthPage';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
  
// } from "react-router-dom";

// Material theme
import { ThemeProvider } from "@material-ui/core/styles"

// App initializaion
import { theme } from './@init'

// Redux
import { Provider as ReduxProvider } from 'react-redux'
import { store as reduxStore } from './@init/redux'
import { useState } from 'react'




ReactDOM.render(
    <ReduxProvider store={reduxStore}>
        <ThemeProvider theme={theme}>
            {/* <Router>
                <Switch>
                    <Route  path="/" exact>
                        <AuthorizationPage />
                    </Route>
                    <Route path='/sheduler'> */}
                        <AppWrap />
                    {/* </Route>
                </Switch>
            </Router> */}
        </ThemeProvider>
    </ReduxProvider>,
    document.getElementById('root')
);
