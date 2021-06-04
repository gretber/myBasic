export const  idToJobType = (jobTypeId: "1"|"2"|"3") => {
  let jType = ''
  switch(jobTypeId){
      case "1":
          jType = "Fræs"
          break
      case "2":
          jType = "Striber"
          break
      case "3":
          jType = "Opretning"
          break
      default: jType = ''
  }
  return jType
} 