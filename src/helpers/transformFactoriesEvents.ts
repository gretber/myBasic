import moment from 'moment';


const startFormat = (el: any) => {
  let date = el.startDate;
  date = date.split("-");
  // date = date.reverse();
  date = date.join(" ");
  return date;
};

const endFormat = (el: any) => {
  let date = el.endDate;
  date = date.split("-");
  // date = date.reverse();
  date = date.join(" ");
  return date;
};

const calculateWeekend = (startDate: any, endDate: any) => {
  const totalDays = moment(endDate).diff(moment(startDate), "days") + 1;
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
  
  events.forEach((el: any) => {
    let startDate = startFormat(el);
    let endDate = endFormat(el);
    let weekends = !el.weekendWork ? calculateWeekend(startDate, endDate) : 0;
    let daysAmount = Math.abs(moment(startDate).diff(endDate, "days"))+1;
    let avgTotal = Math.round(el.tons / (daysAmount - weekends));

    // console.log("el.tons 300",el.tons, "(daysAmount - weekends)", (daysAmount - weekends), "weekends", weekends )

    for (let i = 0; i < daysAmount; i++) {
      let _startDate = moment(startDate).add(i, "days").format("YYYY-MM-DD");

      modifiedDB.push(
        new Object({
          resourceId: el.resourceId,
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

  const weekendRemove = () => {
    modifiedDB.forEach((el: any, i: any) => {
      if (el.weekendWork === false && moment(el.startDate).day() === 6) {
        modifiedDB.splice(i, 1);
      }
    });
    modifiedDB.forEach((el: any, i: any) => {
      if (el.weekendWork === false && moment(el.startDate).day() === 0) {
        modifiedDB.splice(i, 1);
      }
    });
  };
  weekendRemove();


   let sorted: any = [];

  const letSplice = () => {
    modifiedDB.forEach((el: any) => {
      modifiedDB.forEach((elem: any, j: any) => {
        if (
          el.startDate === modifiedDB[j].startDate &&
          el !== elem &&
          el.resourceId === elem.resourceId
        ) {
          sorted.push(modifiedDB[j]);
          modifiedDB.splice(j, 1);
        }
      });
    });
  };
  letSplice();

  const letAssign = () => {
    modifiedDB.map((el: any) => {
      sorted.forEach((elem: any) => {
        if (el.startDate === elem.startDate) {
          el.tons = el.tons + elem.tons;
          el.name = `${el.tons + elem.tons} tons`
        }
      });
    });
  };

  letAssign();

  // console.log("modified", modifiedDB);
  return modifiedDB
}

 