export  const sortSelectedFabriks = (projects: any, fabriks: any) => {
  let sorted: any = [];

  fabriks.forEach( (el: any) => {
    if (el['-selected'] === true) {
      projects.forEach((elem: any, j: any) => {
        if (el['-id'] === elem.factoryId) {
            sorted.push(projects[j]);
        }
      });
    }
  });

  return sorted
}