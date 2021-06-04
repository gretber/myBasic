
export const getProjectDetails = async (
  setRegionId: any, projectNo: string, setCustomerName: any,
  setCustomerId: any, setFactoryId: any, setProjectName: any,
  setProjectNo: any, setCurrentProject:any, setName2: any
  ) => {

  const projectDetails = process.env.REACT_APP_GET_PROJECT_DETAILS;

  const encoded = window.btoa('lei-lmk:AAABBB')
  const response = await fetch(`${projectDetails}${projectNo}`, {
        method:  'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encoded}`,
        },
    });

        
  const project: any = await response.json();

  if(project.root.projects.project[0]){
      const {
      regionId, customerName, factoryId,
      customerId, name, projectNo: numberOfProject, name2
    } = project.root.projects.project[0]
    
    setRegionId(regionId)
    setCustomerName(customerName)
    setFactoryId(factoryId)
    setCustomerId(customerId)
    setProjectName(name)
    setProjectNo(numberOfProject)
    setName2(name2)
    setCurrentProject({id: projectNo, name: name})

  }

};