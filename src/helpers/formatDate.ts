export function formatDate(date: string) {
    const d = new Date(date)

    if (Object.prototype.toString.call(d) === "[object Date]") {

    // it is a date
    if (isNaN(d.getTime())) {  // d.valueOf() could also work

        // date is not valid
        console.error('date is not valid in formatDate')
    } else {

        // date is valid
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    } else {

        // not a date
        console.error('not a date in formatDate')
    }
}
