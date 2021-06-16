import { Project, Team } from "../bus/briks/dataTypes"


export const resourceOnlyExistsTeams = (projects: Array<Project>, allTeams: Array<Team>) => {
  const resource: any = []

  allTeams.forEach( items => {
    const foundedElements = projects.find( element => {
      return items["-id"] === element.teamId
    })
    if(foundedElements !== undefined){
      resource.push({id: items["-id"], name: items.name})
    }
  })

  return resource
}