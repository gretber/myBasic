export const getAllCustomers = async (kundeNavn: any) => {
  const getCustomers = process.env.REACT_APP_GET_CUSTOMERS;

  const encoded = window.btoa('lei-lmk:AAABBB')
  const response = await fetch(`${getCustomers}`, {
    method:  'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${encoded}`,
    },
  });

  const customers = await response.json();
  kundeNavn.disabled = false
  kundeNavn.items = customers.root.customers.customer.map( (item: any) => item.name )
}

