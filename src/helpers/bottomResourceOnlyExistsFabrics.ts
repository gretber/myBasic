
export const bottomResourceOnlyExistsFabrics = (projects: any, allFabrics: any) => {
  const resource: any = []

  allFabrics.forEach( (items: any) => {
    const foundedElements = projects.find( (element: any) => {
      return items["id"] === element.resourceId
    })
    if(foundedElements !== undefined){
      resource.push({id: items.id, name: items.name})
    }
  })

  return resource
}