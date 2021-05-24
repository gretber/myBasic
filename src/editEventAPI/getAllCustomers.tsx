export const getAllCustomers = async (kundeNavn: any, customer: any, setEditBrik: any) => {
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

  if(customer){
      const currentCustomer = customers.root.customers.customer.find( (item: any) => item.name == customer )
      setEditBrik((prevState: any) => {
          const newState = { ...prevState }
          return {
            ...newState,
            customerName: currentCustomer?.name,
            customerId: currentCustomer?.id,
          }
      })
  }

  kundeNavn.items = customers.root.customers.customer.map( (item: any) => item.name )
  kundeNavn.disabled = true
}

