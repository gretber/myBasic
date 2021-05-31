import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import moment from 'moment';

// Icons
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowLeftOutlinedIcon from '@material-ui/icons/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

// API 
import { updateTimeLine } from '../../bus/briks/api/updateTimeLine';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    displayedPeriod : {
      marginRight: 7,
      fontSize: 16,
      color: '#000',
      border: 'solid 1px rgba(0, 0, 0, 0.23)',
      height: 56,
      width: 200,
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    arrowButtons: {
      borderRadius: '50%',
      '&:hover': {
        boxShadow:'4px 4px 15px 0px rgba(34, 60, 80, 0.5);',
      },
    },
  })
);





export const PeriodPicker = ({config, setConfig, period, offLineEndDate, saveOffLineEndDate}: {config: any, setConfig : React.Dispatch<any>, period: string, offLineEndDate:Date, saveOffLineEndDate: React.Dispatch<React.SetStateAction<Date>>}) => {
  const classes = useStyles();
  
  const [periode, setPeriode] = React.useState(period);
  
  
   const  startDate = moment(config.startDate);
   const endDate = moment(offLineEndDate);
     moment.updateLocale('da', {
                    months :['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
                    monthsShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'Maj', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dec.'],
                    weekdays: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
                    weekdaysMin: ['Ma.', 'Ti.', 'On.', 'To.', 'Fr.', 'Lø.', 'Søn.']
     }); 
     const displayedStartDate = startDate.format('MMM, YYYY');
     const displayedEndDate = endDate.format('MMM, YYYY');

   
    // Select Handler
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
   
    if(event.target.value !==  periode)
    {
      const newState = Object.assign({}, config);
      const newEndDate = moment(newState.startDate)
      const newStartDate = moment(newState.startDate);
      let savedEndDate = moment(offLineEndDate);
        if(event.target.value === 'Uge')
        {
          
          newState.startDate = newStartDate.toDate();
          newState.endDate = newEndDate.add(1, 'weeks').toDate();
          savedEndDate = moment(newEndDate);
          updateTimeLine(newState.startDate, newState.endDate, event.target.value as string);
          setConfig(newState);
          
        }

        else if(event.target.value === 'To uger')
        {
          newState.startDate = newStartDate.toDate();
          newState.endDate = newEndDate.add(2, 'weeks').toDate();
          savedEndDate = moment(newEndDate);
          updateTimeLine(newState.startDate, newState.endDate, event.target.value as string);
          setConfig(newState); 
        }

       else if(event.target.value === 'Måned')
        {

          newState.startDate = newStartDate.toDate();
          newState.endDate = newEndDate.add(1, 'months').toDate();
          savedEndDate =  moment(newEndDate);
          updateTimeLine(newState.startDate, newState.endDate, event.target.value as string);
          setConfig(newState);
        }

        else if(event.target.value === event.target.value as string)
        {
         
          newState.startDate = newStartDate.toDate();
          newState.endDate = newEndDate.add(24, 'weeks').toDate();
          savedEndDate =  moment(newEndDate);
          updateTimeLine(newState.startDate, newState.endDate, event.target.value as string);
          setConfig(newState);
        }
        saveOffLineEndDate(savedEndDate.toDate()) ;
    }
   
   setPeriode(event.target.value as string);
  };

  // Toggle Handlers

  const changeTimeLineByPeriod = (direction: string) => {

    const newState = Object.assign({}, config);
    newState.startDate = moment(newState.startDate);
    const newEndDate = moment(newState.endDate);
    const savedEndDate = moment(offLineEndDate);
    switch(periode)
    {
      case "Uge":
      {
        if(direction === 'Left')
      {
        newState.startDate = newState.startDate.add(-1, 'week');
        newEndDate.add(-1, 'week');
        savedEndDate.add(-1, 'week');
        break;
      }
      else
      {
        newState.startDate = newState.startDate.add(1, 'week');
        newEndDate.add(1, 'week');
        savedEndDate.add(1, 'week');
        break;
      }
      }
      case "To uger" : 
      {
         if(direction === 'Left')
      {
        newState.startDate = newState.startDate.add(-2, 'week');
       newEndDate.add(-2, 'week');
       savedEndDate.add(-2, 'week');
        break;
      }
      else
      {
        newState.startDate = newState.startDate.add(2, 'week');
        newEndDate.add(2, 'week');
        savedEndDate.add(2, 'week');
        break;
      }
      }
      case "Måned": 
      {
        if(direction === 'Left')
        {
          newState.startDate.add(-1, 'months');
          newEndDate.add(-1, 'months');
          savedEndDate.add(-1, 'months');
        }
    else
       {
          newState.startDate.add(1, 'months');
          newEndDate.add(1, 'months');
          savedEndDate.add(1, 'months');
       }
        break;
      }

      case "24 uger" : 
      {
        if(direction === 'Left')
      {
        newState.startDate = newState.startDate.add(-24, 'week');
        newEndDate.add(-24, 'week');
        savedEndDate.add(-24, 'week');
        break;
      }
      else
      {
        newState.startDate = newState.startDate.add(24, 'week');
        newEndDate.add(24, 'week');
        savedEndDate.add(24, 'week');
        break;
      }
      }
      default: console.log('default');
    }
    newState.startDate = newState.startDate.toDate();
 
    saveOffLineEndDate(savedEndDate.toDate());
    updateTimeLine(newState.startDate, newEndDate.toDate(), periode);
    setConfig(newState);
  }

  const changeTimeLineByMonth = (direction: string) => {
    
    const newState = Object.assign({}, config);
    newState.startDate = moment(newState.startDate);
    const newEndDate = moment(newState.endDate);
    const savedEndDate = moment(offLineEndDate);
    if(direction === 'Left')
    {
      newState.startDate.add(-1, 'months');
      newEndDate.add(-1, 'months');
      savedEndDate.add(-1, 'months');
    }
    else
    {
      newState.startDate.add(1, 'months');
      newEndDate.add(1, 'months');
      savedEndDate.add(1, 'months');
    }
    newState.startDate = newState.startDate.toDate();
    
    saveOffLineEndDate(savedEndDate.toDate());
    updateTimeLine(newState.startDate, newEndDate.toDate(), periode);
    setConfig(newState);
  }

  return (
    <div className={classes.root}>
      <div className={classes.displayedPeriod}>{displayedStartDate} - {displayedEndDate}</div>
      <div>
          <ArrowLeftOutlinedIcon className={classes.arrowButtons}  onClick={(e) => {e.stopPropagation(); changeTimeLineByPeriod('Left')}}/>
          <ArrowBackIosOutlinedIcon className={classes.arrowButtons} onClick={(e) => {e.stopPropagation(); changeTimeLineByMonth('Left')}}/>
          <ArrowForwardIosOutlinedIcon className={classes.arrowButtons} onClick={(e) => {e.stopPropagation(); changeTimeLineByMonth('Right')}}/>
          <ArrowRightOutlinedIcon className={classes.arrowButtons} onClick={(e) => {e.stopPropagation(); changeTimeLineByPeriod('Right')}}/>
      </div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="periode">Periode</InputLabel>
        <Select
          labelId="periode"
          id="periode"
          value={periode}
          onChange={handleChange}
          label="periode"
        >
          <MenuItem value={"24 uger"}>24 uger</MenuItem>
          <MenuItem value={"Måned"}>Måned</MenuItem>
          <MenuItem value={"To uger"}>To uger</MenuItem>
          <MenuItem value={"Uge"}>Uge</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
