import moment from 'moment';


const startFormat = (el: any) => {
  let date = el.startDate;
  date = date.split("-");
  date = date.join(" ");
  return date;
};

const endFormat = (el: any) => {
  let date = el.endDate;
  date = date.split("-");
  date = date.join(" ");
  return date;
};

const calculateWeekend = (startDate: any, endDate: any) => {
  const totalDays = moment(endDate).diff(moment(startDate), "days") + 1; // Number of days between start and end days
  const dayOfWeek = moment(startDate).isoWeekday();
  let totalWorkdays = 0;

  for (let i = dayOfWeek; i < totalDays + dayOfWeek; i++) {
    if (i % 7 !== 6 && i % 7 !== 0) {
      totalWorkdays++;
    }
  }
  return totalDays - totalWorkdays;
};

export const transformFactoriesEvents = (events: any) => {
  
  const modifiedDB: any = [];
  // console.log(events)
  events.forEach((el: any) => {
    
    let startDate = startFormat(el);
    let endDate =  endFormat(el);
    let weekends = !el.weekendWork ? calculateWeekend(startDate, endDate) : 0;
    let daysAmount = Math.abs(moment(startDate).diff(endDate, "days"))+1;
    let avgTotal = Math.round(el.tons / (daysAmount - weekends));

    for (let i = 0; i < daysAmount; i++) {
      let _startDate = moment(startDate).add(i, "days").format("YYYY-MM-DD");
      modifiedDB.push(
        new Object({
          resourceId: el.resourceId,  // Change el.resourceID to el.factoryId !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          startDate: _startDate,
          endDate: _startDate,
          tons: avgTotal,
          duration: 1,
          name: `${avgTotal} tons`,
          eventColor: "#aaa",
          weekendWork: el.weekendWork,
        })
      );
    }
  });
 
   const weekendRemove = (modifiedDB: any) => {
    const copyModDB = modifiedDB.map((item: any) => ({...item}))
    copyModDB.forEach((el: any, i: any) => {
      if (el.weekendWork === false && moment(el.startDate).day() === 6) {
        copyModDB.splice(i, 1);
      }
    });
    copyModDB.forEach((el: any, i: any) => {
      if (el.weekendWork === false && moment(el.startDate).day() === 0) {
        copyModDB.splice(i, 1);
      }
    });
    return copyModDB;
  };

  const modDBRemovedWeekends = weekendRemove(modifiedDB);
 
  let sorted: any = [];

  const letSplice = () => {
    modDBRemovedWeekends.forEach((el: any) => {
     modDBRemovedWeekends.forEach((elem: any, j: any) => {
        if (
          el.startDate === modDBRemovedWeekends[j].startDate &&
          el !== elem &&
          el.resourceId === elem.resourceId
        ) {
          sorted.push(modDBRemovedWeekends[j]);
          modDBRemovedWeekends.splice(j, 1);
        }
      });
    });
  };

  letSplice();

const calculateTons = () => {
  const calculatedTons: any = [];
  modDBRemovedWeekends.forEach((unic: any, i: any) => {

    const filtered =  sorted.filter((el: any) =>  el.startDate === unic.startDate && el.resourceId === unic.resourceId && el.endDate === unic.endDate)
     const reducer = (accumulator: any, currentValue: any) => accumulator + currentValue.tons;
    const tons = filtered.reduce(reducer, unic.tons);

    
    if (calculatedTons.length === 0)
    calculatedTons.push({...unic, tons: tons, name: `${tons} tons`});
    
    const filteredCalcTons = calculatedTons.filter((el: any) =>  el.startDate === unic.startDate && el.resourceId === unic.resourceId && el.endDate === unic.endDate)
    if(filteredCalcTons.length === 0)
    calculatedTons.push({...unic, tons: tons, name: `${tons} tons`});
  })
  return calculatedTons;
}

const calculatedTons = calculateTons()

return calculatedTons
}

 