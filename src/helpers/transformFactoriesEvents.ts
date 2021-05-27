import moment from 'moment';

export const transformFactoriesEvents = (events: any) => {
  const modifiedDB: any = [];
  events.forEach((el: any) => {

    let startDate = moment(el.startDate, "YYYY-MM-DD").format("YYYY MM DD");
    let endDate = moment(el.endDate, "YYYY-MM-DDY").format("YYYY MM DD");
    let daysAmount = moment(endDate).diff(startDate, "days");
    daysAmount += 1;
    let avgTotal = Math.round(el.tons / daysAmount);

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
          eventColor: "#000",
        })
      );
    }
  });

  let sorted: any = [];

  const letSplice = () => {
    modifiedDB.forEach((el: any) => {
      modifiedDB.forEach((elem: any, j: any) => {
        if (el.startDate === modifiedDB[j].startDate && el !== elem) {
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
          el.avgTotal = el.avgTotal + elem.avgTotal;
        }
      });
    });
  };

  letAssign();

  console.log("modified", modifiedDB);
  return modifiedDB
}