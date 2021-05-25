export const getProjectDetails = async (projectNo: any, project: any, arbejdsplads: any, kundeNavn: any, factory: any, data: any, setEditBrik: any ) => {
    const projectDetails = process.env.REACT_APP_GET_PROJECT_DETAILS;

    const encoded = window.btoa('lei-lmk:AAABBB')

    // Get editing project
    const projectResponse = await fetch(`${projectDetails}${projectNo}`, {
            method:  'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encoded}`,
            },
        });
            
    const projects: any = await projectResponse.json();
    const editingProject = projects.root.projects.project[0]

    if(editingProject){
        project.value = `${editingProject.projectNo} - ${editingProject.name}`
        arbejdsplads.value = `${editingProject.name}`
        kundeNavn.value = editingProject.customerName
        const curentFactory = data.root.factories.factory.find( (item: any) => item.id === editingProject.factoryId)
        factory.value = curentFactory.name
        setEditBrik((prevState: any) => {
            const newState = {...prevState}
            return {
                ...newState,
                customerId: editingProject.customerId,
                customerName: editingProject.customerName,
                projectNo: editingProject.projectNo,
                name: editingProject.name,
            }
        })
    } 
};