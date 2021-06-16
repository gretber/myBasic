import { Project } from "../bus/briks/dataTypes";

export const sortByJobTypes = (events: Array<Project>, jobTypes: {'Fræs': boolean, 'Striber': boolean, 'Opretning': boolean}) => {
    let filteredEvents: Array<Project> = [...events];
if(!jobTypes.Fræs)
{
    filteredEvents = filteredEvents.filter((event) => {return event.jobType !== '1'})
}
if(!jobTypes.Opretning)
{
    filteredEvents = filteredEvents.filter((event) => {return event.jobType !== '3'})
}
if(!jobTypes.Striber)
{
     filteredEvents = filteredEvents.filter((event) => {return event.jobType !== '2'})
}

return filteredEvents;

}