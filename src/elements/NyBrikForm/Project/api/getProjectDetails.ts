
export const getProjectDetails = async (setRegionId: any, projectNo: string, setCustomerName: any, setCustomerId: any, setFactoryId: any) => {
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
  console.log(project)
  setRegionId(project.root.projects.project[0].regionId);
  setCustomerName(project.root.projects.project[0].customerName)
  setFactoryId(project.root.projects.project[0].factoryId)
  setCustomerId(project.root.projects.project[0].customerId)
};