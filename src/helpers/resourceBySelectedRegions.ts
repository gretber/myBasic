import { Project, Team } from "../bus/briks/dataTypes"


export const resourceBySelectedRegions = (sortedListByRegion: Array<Project>, allTeams: Array<Team>) => {
  const resourceBySelectedRegions: any = []

  allTeams.forEach( items => {
    const foundedElements = sortedListByRegion.find( element => {
      return items["-id"] === element.teamId
    })
    if(foundedElements !== undefined){
      resourceBySelectedRegions.push({id: items["-id"], name: items.name})
    }
  })

  return resourceBySelectedRegions
}