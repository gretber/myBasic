export const addDays = (startDate: Date , numberOfDays: number ) => {
  const endDate = new Date(startDate)
  new Date(endDate.setDate(startDate.getDate() + numberOfDays));
  return endDate
}