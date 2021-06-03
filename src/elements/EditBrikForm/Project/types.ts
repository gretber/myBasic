export type ProjectType = {
  root: {
    projectsList: {
      projectNo: Array<ProjectNo>
    }
  }
}

export type ProjectNo = {
  id: string,
  name: string
}