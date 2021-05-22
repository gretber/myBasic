export const getFabrikVare = async (factoryId: any, fabrikVare: any, factoryItemName: any ) => {
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
  fabrikVare.items = vare.root.items.item.map((item: any) => item.name)
  fabrikVare.value = factoryItemName
};