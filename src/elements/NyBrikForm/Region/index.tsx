// Core
import { useState } from 'react';

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

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

export const Region = ({setRegionId, projectNo, regionId}: any) => {
  // Styles
  const classes = useStyles();
  // Get data
  const regions = useSelector( state => {
     if("root" in state.data){
      return state.data.root.districs.district
    }
  })

  // Get region name
  const regionName = useSelector( state => {
     if("root" in state.data && regionId){
      const region = state.data.root.districs.district.filter( item => item.id === regionId)
      return region[0]
    }
  })

  const [value, setValue] = useState(regionName)

  // Handler
  const handlerOnChange = (event: any, value: any, reason: any) => {
    if(value && ('id' in value)){
      setRegionId(value.id)
      setValue(value)
    }

    if(reason==="clear"){
      setValue({id: '', name: ''})
      setRegionId('null')
    }
  }
  console.log({projectNo})
  return (
    <div>
      <Autocomplete
        disabled={projectNo!=='null'}
        className={classes.Autocomplete}
        id="region"
        value={value}
        onChange={handlerOnChange}
        options={regions?regions:[]}
        getOptionLabel={(option: any) =>  option.name }
        renderInput={(params) => (
          <TextField {...params} label={"Region"} variant="outlined" />
        )}
      />
    </div>
  );
};
