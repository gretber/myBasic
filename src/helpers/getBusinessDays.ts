import moment from 'moment';

export const getBusinessDays = (startDate: any, endDate: any) => {
  // console.log(new Date('04-11-2021'))
  // console.log(moment(new Date('04-11-2021')).day())
  const startDateMoment = moment(startDate);
  const endDateMoment = moment(endDate)
  let days = Math.round(startDateMoment.diff(endDateMoment, 'days') - startDateMoment .diff(endDateMoment, 'days') / 7 * 2);

  if (endDateMoment.day() === 6) {
    console.log('if (endDateMoment.day() === 6)')
    days--;
  }

  if (endDateMoment.day() === 0) {
    console.log('if (endDateMoment.day() === 0)')
    days--;
  }

  if (startDateMoment.day() === 5) {
    console.log('if (startDateMoment.day() === 0)')
    days--;
  }
  
  return days * -1;
}

