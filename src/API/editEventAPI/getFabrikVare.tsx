export const getFabrikVare = async (factoryId: any, fabrikVare: any, factoryItemName: any, setEditBrik: any ) => {
  const selectionItemsDetailURL = process.env.REACT_APP_SELECTION_ITEM_DETAILS;

  const encoded = window.btoa('lei-lmk:AAABBB')
  const response = await fetch(`${selectionItemsDetailURL}${factoryId}`, {
        method:  'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encoded}`,
        },
    });

  const vare: any = await response.json();
  const carrentVare = vare.root.items.item.find((item: any) => item.name == factoryItemName)
  fabrikVare.items = vare.root.items.item.map((item: any) => item.name)
  fabrikVare.value = factoryItemName

  setEditBrik((prevState: any)=> {
    const newState = {...prevState}
    if(carrentVare){
      return {...newState, factoryItemName: carrentVare.name, factoryItemId: carrentVare.id}
    } else {
      return {...newState}
    }
    
  })
};