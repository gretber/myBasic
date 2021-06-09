import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import moment from 'moment';

// Icons
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { DoubleArrowSvgButtonIcon } from "../../assets/icons/doubleArrowIcon";

// API 
import { updateTimeLine } from '../../bus/briks/api/updateTimeLine';

// Components
import { WeekCountInput } from "../WeekCountInput.tsx";
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
      display: 'flex',
      flexDirection: 'row',
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
      cursor: 'pointer',
      backgroundColor: 'transparent',
      
      '&:hover': {
        boxShadow:'4px 4px 15px 0px rgba(34, 60, 80, 0.5);',
      },
     
    },

    arrowButtonRevers: {
      transform: 'rotate(180deg)',
    },

    doubleArrowButton : {
      height: 15,
      color: '#000',
    },
    arrowButtonsWrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    periodSelect : {
      width: 105,
    }
  })
);

export const PeriodPicker = ({config, period }: 
  {config: any,  period: string, offLineEndDate: Date}) => {
  const classes = useStyles();
  
  const [periode, setPeriode] = React.useState(period);
  const  startDate = moment(config.startDate);
  const endDate = moment(config.endDate);
     moment.updateLocale('da', {
                    months :['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
                    monthsShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'Maj', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dec.'],
                    weekdays: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
                    weekdaysMin: ['Ma.', 'Ti.', 'On.', 'To.', 'Fr.', 'Lø.', 'Søn.']
     }); 
     const displayedStartDate = startDate.format('MMM, YYYY');
     const displayedEndDate = endDate.format('MMM, YYYY');

   useEffect(() => {
     console.log({period});
     setPeriode(period);
   }, [period])
  //   Select Handler
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    
    if(event.target.value !==  periode)
    {
      const newState = Object.assign({}, config);
      const newEndDate = moment(newState.startDate)
      const newStartDate = moment(newState.startDate);
      
        if(event.target.value === 'Uge')
        {
          // newState.viewPreset = 'myDayAndWeekPreset';
          newState.weekStartDay = 1;
          newState.startDate = newStartDate.toDate();
          newState.endDate = newEndDate.add(1, 'weeks').toDate();
          updateTimeLine(newState.startDate, newState.endDate, event.target.value as string);
        }

        else if(event.target.value === 'To uger')
        {
          // newState.viewPreset = 'myDayAndWeekPreset';
          newState.weekStartDay = 1;
          newState.startDate = newStartDate.toDate();
          newState.endDate = newEndDate.add(2, 'weeks').toDate();
          updateTimeLine(newState.startDate, newState.endDate, event.target.value as string);
        }

       else if(event.target.value === 'Måned')
        {
          // newState.viewPreset ='myDayAndMonthPreset';
          newState.weekStartDay = 1;
          newState.startDate = newStartDate.toDate();
          newState.endDate = newEndDate.add(1, 'months').toDate();
          updateTimeLine(newState.startDate, newState.endDate, event.target.value as string);
        }

        else if(event.target.value === event.target.value as string)
        {
          // newState.viewPreset ='my24WeeksPreset';
          newState.weekStartDay = 1;
          newState.startDate = newStartDate.toDate();
          newState.endDate = newEndDate.add(24, 'weeks').toDate();
          updateTimeLine(newState.startDate, newState.endDate, event.target.value as string);
        }
    }
   
   setPeriode(event.target.value as string);
  };

  // Toggle Handlers

  // const changeTimeLineByPeriod = (direction: string) => {

  //   const newState = Object.assign({}, config);
  //   newState.startDate = moment(newState.startDate);
  //   const newEndDate = moment(newState.endDate);
  //   switch(periode)
  //   {
  //     case "Uge":
  //     {
  //       if(direction === 'Left')
  //     {
  //       newState.startDate = newState.startDate.add(-1, 'week');
  //       newEndDate.add(-1, 'week');
  //       break;
  //     }
  //     else
  //     {
  //       newState.startDate = newState.startDate.add(1, 'week');
  //       newEndDate.add(1, 'week');
  //       break;
  //     }
  //     }
  //     case "To uger" : 
  //     {
  //        if(direction === 'Left')
  //     {
  //       newState.startDate = newState.startDate.add(-2, 'week');
  //      newEndDate.add(-2, 'week');
  //       break;
  //     }
  //     else
  //     {
  //       newState.startDate = newState.startDate.add(2, 'week');
  //       newEndDate.add(2, 'week');
  //       break;
  //     }
  //     }
  //     case "Måned": 
  //     {
  //       if(direction === 'Left')
  //       {
  //         newState.startDate.add(-1, 'months');
  //         newEndDate.add(-1, 'months');
  //       }
  //   else
  //      {
  //         newState.startDate.add(1, 'months');
  //         newEndDate.add(1, 'months');
  //      }
  //       break;
  //     }

  //     case "24 uger" : 
  //     {
  //       if(direction === 'Left')
  //     {
  //       newState.startDate = newState.startDate.add(-24, 'week');
  //       newEndDate.add(-24, 'week');
  //       break;
  //     }
  //     else
  //     {
  //       newState.startDate = newState.startDate.add(24, 'week');
  //       newEndDate.add(24, 'week');
  //       break;
  //     }
  //     }
      
  //   }
  //   newState.startDate = newState.startDate.toDate();
 
  //   updateTimeLine(newState.startDate, newEndDate.toDate(), periode);
  // }

  const changeTimeLineByWeek = (direction: string) => {
    const newState = Object.assign({}, config);
    newState.startDate = moment(newState.startDate);
    const newEndDate = moment(newState.endDate);
 
    if(direction === 'Left')
    {
      newState.startDate.add(-1, 'week');
      newEndDate.add(-1, 'week');
    }
    else
    {
      newState.startDate.add(1, 'week');
      newEndDate.add(1, 'week');
    }
    newState.startDate = newState.startDate.toDate();
    
    console.log({periode});
    updateTimeLine(newState.startDate, newEndDate.toDate(), periode);
    
  }
  const changeTimeLineByMonth = (direction: string) => {
    
    const newState = Object.assign({}, config);
    newState.startDate = moment(newState.startDate);
    const newEndDate = moment(newState.endDate);
    if(direction === 'Left')
    {
      newState.startDate.add(-4, 'weeks');
      newEndDate.add(-4, 'weeks');
    }
    else
    {
      newState.startDate.add(4, 'weeks');
      newEndDate.add(4, 'weeks');
    }
    newState.startDate = newState.startDate.toDate();
    
    console.log({periode});
    updateTimeLine(newState.startDate, newEndDate.toDate(), periode);
  }

  return (
    <div className={classes.root}>
      <div className={classes.displayedPeriod}>{displayedStartDate} - {displayedEndDate}</div>
      <div className ={classes.arrowButtonsWrapper}> 
          <DoubleArrowSvgButtonIcon className={`${classes.arrowButtons} ${classes.arrowButtonRevers} ${classes.doubleArrowButton}`}  onClick={(e:any) => {e.stopPropagation(); changeTimeLineByMonth('Left')}}/>
          <KeyboardArrowLeftIcon className={`${classes.arrowButtons}`} onClick={(e) => {e.stopPropagation(); changeTimeLineByWeek('Left')}}/>
          <KeyboardArrowLeftIcon className={`${classes.arrowButtons} ${classes.arrowButtonRevers}`} onClick={(e) => {e.stopPropagation(); changeTimeLineByWeek('Right')}}/>
          <DoubleArrowSvgButtonIcon className={`${classes.arrowButtons} ${classes.doubleArrowButton}`} onClick={(e:any) => {e.stopPropagation(); changeTimeLineByMonth('Right') }}/>
      </div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="periode">Periode</InputLabel>
        <Select 
        className = {classes.periodSelect}
          labelId="periode"
          id="periode"
          value={periode}
          onChange={handleChange}
          label="periode"
        > 
        
          <MenuItem value={"Other"} disabled>Other</MenuItem>
          <MenuItem value={"24 uger"}>24 uger</MenuItem>
          <MenuItem value={"Måned"}>Måned</MenuItem>
          <MenuItem value={"To uger"}>To uger</MenuItem>
          <MenuItem value={"Uge"}>Uge</MenuItem>
        </Select>
        <WeekCountInput config={config}/>
      </FormControl>
    </div>
  );
}
