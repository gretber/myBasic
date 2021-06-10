import moment from "moment";


export const calculateWeekStartDate = (startDate: Date, endDate: Date) => {
    const momentStartDate = moment(startDate);
    const momentEndDate = moment(endDate);
    const startDateDayNumber = momentStartDate.isoWeekday();
    const endDateDayNumber = momentEndDate.isoWeekday();
    if(startDateDayNumber !== 1)
    {
        momentStartDate.subtract(startDateDayNumber - 1, 'days');
    }
    if(endDateDayNumber !== 1)
    {
        momentEndDate.subtract(endDateDayNumber - 1, 'days');
    }
   
    console.log('startDate: ', momentStartDate.toDate());
    console.log('endDate: ', momentEndDate.toDate());
    const calculatedStartDate =  momentStartDate.toDate();
    const calculatedEndtDate = momentEndDate.toDate();
    return {
        calculatedStartDate,
        calculatedEndtDate 
    }
}