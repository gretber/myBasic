import moment from 'moment';

const calculateBusinessDays = (startDateMoment: any, endDateMoment: any) => {
    const days = endDateMoment.diff(startDateMoment, "days") + 1;
    let newDay: any = startDateMoment.toDate(),
        workingDays: number = 0,
        sundays: number = 0,
        saturdays: number = 0;

    for (let i = 0; i < days; i++) {
        const day = newDay.getDay();
        newDay = startDateMoment.add(1, "days").toDate();
        const isWeekend = ((day % 6) === 0);
        if (!isWeekend) {
            workingDays++;
        } else {
            if (day === 6) saturdays++;
            if (day === 0) sundays++;
        }
    }

    //console.log("Total Days:", days, "workingDays", workingDays, "saturdays", saturdays, "sundays", sundays);

    return { totalDays: days, workingDays };
  } 

export const lagInDays = (startDate: any, endDate: any, isWorkWeekends: boolean) => {

  const startDateMoment = moment(startDate);
  const endDateMoment = moment(endDate)

  const { totalDays, workingDays } = calculateBusinessDays(startDateMoment, endDateMoment)

  return isWorkWeekends?totalDays:workingDays

}
