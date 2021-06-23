// Core
import { useEffect, useState } from 'react';

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FormHelperText } from "@material-ui/core";

// Hooks
import { useSelector } from '../../../hooks/useSelector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Autocomplete: {
      margin: theme.spacing(1),
      width: "96%",
    },
  })
);

export const Region = ({setRegionId, projectNo, regionId, validation, setValidation}: any) => {
  // Styles
  const classes = useStyles();

  const [ region, setRegion ] = useState<any>('null')

  // Get data
  const regions = useSelector( state => {
     if("root" in state.data){
      return state.data.root.districs.district
    }
  })

  // // Get region name
  // const regionName = useSelector( state => {
  //    if("root" in state.data && regionId){
  //     const region = state.data.root.districs.district.filter( item => item.id === regionId)
  //     return region[0]
  //   }
  // })

  useEffect(()=>{
    const region = regions?regions.find( (item: any) => item.id === regionId ):null
    setRegion(region)
  },[regionId])

  // Handler
  const handlerOnChange = (event: any, value: any, reason: any) => {
    if(value && ('id' in value)){
      setRegionId(value.id)
      setRegion(value)
      setValidation((prevState: any)=>{
        const newState = {...prevState, region: false}
        return newState
      })
    }

    if(reason==="clear"){
      setRegion({id: '', name: ''})
      setRegionId('null')
    }
  }

  return (
    <div>
      <Autocomplete
        disabled={projectNo!=='null'}
        className={classes.Autocomplete}
        id="region"
        value={region?region:null}
        onChange={handlerOnChange}
        options={regions?regions:[]}
        getOptionLabel={(option: any) =>  option.name }
        renderInput={(params) => (
          <TextField {...params} label={"Region*"} variant="outlined" />
        )}
      />
      { validation.region == "null" &&
        <FormHelperText style={{margin: "-8px 0 0 16px"}} error={true}>
          Region er påkrævet
        </FormHelperText>
      }
    </div>
  );
};
