export const stateIdToName = (stateId: "1"|"2"|"3"|"4") => {
  let type =''

  switch (stateId) {
      case "1":
          type = 'Budgetteret'
          break
      case "2":
          type = 'Planlagt'
          break
      case "3":
          type = 'Udført Sag'
          break
      case "4":
          type = 'Slettet'
          break
      default: type = ''
  }
  return type
}