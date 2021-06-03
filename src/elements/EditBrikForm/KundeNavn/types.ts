export type CustomersType = {
  root: {
    customers: {
      customer: Array<Customer>
    }
  }
}

export type Customer = {
  id: string,
  name: string
}