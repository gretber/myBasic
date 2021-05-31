export type User = {
          id: string,
          name: string,
          type: "edit",
        }

export type View = {
            startDate: string,
            endDate: string,
            timeframe: "year" | "month" | "2weeks"| "week",
            view: "team",
            project: string | "null"
}

export type Project = {
            id: string | null,
            regionId: string,
            leaderId: string | null,
            projectNo: string | null,
            factoryItemName: string,
            factoryItemId: string | null,
            customerId: string | null,
            customerName: string | null,
            state: string,
            status: string,
            name: string,
            name2: string | null,
            startDate: string,
            endDate: string,
            duration?: number,
            weekendWork: boolean,
            jobType: string | null,
            teamId: string,
            factoryId: string,
            tons: number,
            area: number,
            color: string,
            details: string,
            resourceId?: string,
            eventColor?: string,
            durationDays?: number
            calculatedDuration: number,
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

export type SelectionValue = {
                  '-selected': boolean,
                  '-id': string,
                  resourceId?: string, 
                  id?: string,
                  name: string
}
export type SelectionValues = Array<SelectionValue>


type Selection = 
  {
    type: SelectionType,
    values: {
      value: SelectionValues
    }
  }

export type Selections = {
  selection: Array<Selection>
}