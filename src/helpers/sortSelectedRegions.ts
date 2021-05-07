export  const sortSelectedRegions = (projects: any, regions: any) => {
  let sorted: any = [];

  regions.forEach( (el: any) => {
    if (el['-selected'] === true) {
      projects.forEach((elem: any, j: any) => {
          if (el.name === elem.regionId) {
              sorted.push(projects[j]);
          }
      });
    }
  });

  return sorted
}