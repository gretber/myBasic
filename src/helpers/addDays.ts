export const addDays = (startDate: any , numberOfDays: any ) => {
  const endDate = new Date(startDate)
  new Date(endDate.setDate(startDate.getDate() + numberOfDays));
  return endDate
}