// Core
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";


//Material
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {  Typography } from '@material-ui/core';

// import Image from 'material-ui-image';







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

export const AuthorizationPage = () => {

    //  Styles
    const classes = useStyles();

    // State
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(false);
    // Router history
    let history = useHistory();

    
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
                        localStorage.setItem("schedulerUserType", 'view')
                    }
                    localStorage.setItem('schedulerUserLogin', login);
                    localStorage.setItem('schedulerUserPassword', password);
                    history.push('/sheduler');
                }
                 }
                 else setAuthError(true);
        });}
        
        
        catch (error) {
            console.log(error);
            setAuthError(true);
            return false; 
        } 

    }

    // Login button handler
    const signInHandler = (event: any) => {
       if(authorize(login, password))
       {

        
       }
       else
       {
            setAuthError(true);
       }
        
        
      
    }
    useEffect(()=> {
        if(localStorage.getItem('schedulerUserLogin') !== null)
        {
            if(localStorage.getItem('schedulerUserPassword') !== null)
            {
              history.push('/sheduler');
            }
        }
        
    })

    return (
    <div className ={classes.root}>
        {authError ? <Typography className={classes.errorText}>Invalid login or password!</Typography> : <Typography className={classes.errorText}></Typography>}
        <form className ={classes.formStyle}>
            <Typography>Please identify yourself:</Typography>
                
                    <TextField id="login" label="User name" variant="outlined" onChange = {(e:any) => {setLogin(e.target.value)}}/>
                    <TextField id="password" label="Password"variant="outlined" onChange = {(e:any) => {setPassword(e.target.value)}}/>
                  
                
            <Button variant="outlined" color="primary"  onClick={signInHandler}>Sign in</Button>
        </form>
    </div>);
}