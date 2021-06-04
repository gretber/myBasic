export const jobTypeToId = (jobTypeName: "Fræs"|"Striber"|"Opretning" ) => {
  let jType = ''
    switch(jobTypeName){
        case "Fræs":
            jType = "1"
            break
        case "Striber":
            jType = "2"
            break
        case "Opretning":
            jType = "3"
            break
        default: jType = ''
    }
    return jType
}