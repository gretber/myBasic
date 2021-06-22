import moment from "moment";


export const calculateWeekStartDate = (startDate: Date, endDate: Date) => {
    const momentStartDate = moment(startDate);
    const momentEndDate = moment(endDate).add(1, 'day');
    const startDateDayNumber = momentStartDate.isoWeekday();
    const endDateDayNumber = momentEndDate.isoWeekday();
   
    momentStartDate.subtract(startDateDayNumber - 1, 'days');
    momentEndDate.subtract(endDateDayNumber - 1, 'days');
       
    // console.log('startDate: ', momentStartDate.toDate());
    // console.log('endDate: ', momentEndDate.toDate());
    const calculatedStartDate =  momentStartDate.toDate();
    const calculatedEndtDate = momentEndDate.toDate();
    return {
        calculatedStartDate,
        calculatedEndtDate 
    }
}