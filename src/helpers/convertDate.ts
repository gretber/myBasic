// Convert date to dd/mm/yyyy

export const convertDate = (inputFormat: any) => {
  const pad = (s: any) => { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}