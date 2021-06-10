//  Core

import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import  React, { useEffect, useState }  from 'react';
import TextField from '@material-ui/core/TextField';

// Components 
import { App } from './App';



// Styles
const useStyles = makeStyles((theme: Theme) => 
 createStyles({
    root: {
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     width: '100%',
     height: '100%',
     flexDirection: 'column',
    },
    formStyle: {
      
        height: 200,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
    },
    errorText : {
        color: 'red',
        height: 24,
    }
  })
)

export const AppWrap = () => {

const [isAuthorized, setAuthorized] = useState(false);
const [authError, setAuthError] = useState(false);
const [login, setLogin] = useState('');
const [password, setPassword] = useState('');

const classes = useStyles();

 useEffect(()=> {
        if(localStorage.getItem('schedulerUserLogin') !== null)
        {
            if(localStorage.getItem('schedulerUserPassword') !== null)
            {
              setAuthorized(true);
              
            }
        }
        
    }, []);

    // Authorization
        const InitBriksUrl = process.env.REACT_APP_INIT_BRIK_URL;
     const authorize = async (login: string, password:string) => {
    
        const encoded = window.btoa(`${login}:${password}`)
        try {
            const response = await fetch(`${InitBriksUrl}`, {
                method:  'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encoded}`,
                },
            });

            if (response.status !== 200) {
                throw new Error('Data fetch failed');
            };

             await response.json().then((data) => {
                if("root" in data)
                {
               
                if ("name" in data.root.user && "id" in data.root.user)
                {
                    if(data.root.user.type === "edit")
                    localStorage.setItem("schedulerUserType", "edit")
                    else
                    {
                        localStorage.setItem("schedulerUserType", 'read')
                    }
                    localStorage.setItem('schedulerUserLogin', login);
                    localStorage.setItem('schedulerUserPassword', password);
                    setAuthError(false);
                    setAuthorized(true);
                    
                }
                 }
                 else setAuthError(true);
        });}
        catch (error) {
            console.log(error);
            setAuthError(true);
            setAuthorized(false);
            return false; 
        } 
    }

    // Login button handler
    const signInHandler = async(event: any) => {
       if(  await authorize(login, password))
       {
        setAuthorized(true);
        
       }
       else
       {
            setAuthError(true);
       }
    }

    const onMouseMoveHandler = (e: any) => {
        console.log(e);

    }
    const dragHandler = (e:any) => {
        console.log('click')
    }

    if(isAuthorized)
    {

       return (<App dragHandler={dragHandler} isAuthorized={isAuthorized}  setAuthorized={setAuthorized}/>)
    }
    else 
    {
        return (
    <div className ={classes.root}>
        {authError ? <Typography className={classes.errorText}>Invalid login or password!</Typography> : <Typography className={classes.errorText}></Typography>}
        <form className ={classes.formStyle}>
            <Typography>Please identify yourself:</Typography>
                
                    <TextField id="login" label="User name" variant="outlined" onChange = {(e:any) => {setLogin(e.target.value)}}/>
                    <TextField type='password' id="password" label="Password"variant="outlined" onChange = {(e:any) => {setPassword(e.target.value)}}/>
                  
                
            <Button variant="outlined" color="primary"  onClick={signInHandler}>Sign in</Button>
        </form>
    </div>);
    }
}
