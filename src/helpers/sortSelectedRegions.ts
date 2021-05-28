export  const sortSelectedRegions = (projects: any, regions: any) => {
  let sorted: any = [];

  regions.forEach( (region: any) => {
    if (region['-selected'] === true) {
      projects.forEach((project: any, j: any) => {
        if (region.name === project.regionId) {
            sorted.push(projects[j]);
        }
      });
    }
  });

  return sorted
}