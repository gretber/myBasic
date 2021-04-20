export type User = {
          id: string,
          name: string,
          type: "edit",
        }

export type View = {
            startDate: string,
            endDate: string,
            timeframe: "year" | "month" | "day",
            view: "team",
            project: string | "null"
}

export type Project = {
            id: string,
            regionId: string,
            leaderId: string,
            projectNo: string | "null",
            factoryItemName: string,
            factoryItemId: string,
            customerId: string,
            customerName: string | "null",
            state: string,
            status: string,
            name: string,
            name2: string | "null",
            startDate: string,
            endDate: string,
            duration: number,
            weekendWork: false,
            jobType: string | "null",
            teamId: string,
            factoryId: string,
            tons: 0.0,
            area: 0.0,
            color: string,
            details: string,
            resourceId?: string,
            eventColor?: string
}

export type Projects = {
  project: Array<Project>
}

export type Team = {
  id: string,
  distictId: string,
  name: string
}

export type Teams = {
  team: Array<Team>
}

type Factory = {
  id: string,
  name: string
}

export type Factories = {
  factory: Array<Factory>
}

type Leader = {
  id: string,
  name: string
}

export type Leaders = {
  leader: Array<Leader>
}

type District = {
  id: string,
  name: string
}

export type Districs = {
  district: Array<District>
} 

type JobType =  {
  id: string,
  name: "Fræs" | "Striber" | "Opretning" 
}

export type JobTypes = {
  jobType: Array<JobType>
}

type SelectionType = "team" | "region" | "factory"

type SelectionValue = {
                  selected: boolean,
                  id: string,
                  name: string
}
type SelectionValues = Array<SelectionValue>
type Selection = [
  {
    type: SelectionType,
    value: SelectionValues
  }
]

export type Selections = Array<Selection>