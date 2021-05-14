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

export const Region = ({setRegionId, projectName, regionId}: any) => {
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
      return region[0].name
    }
  })

  // Handler
  const handlerOnChange = (event: any, value: any) => {
    if(value && ('id' in value)){
      setRegionId(value.id)
    } else {
      setRegionId('')
    }
  }

  return (
    <div>
      <Autocomplete
        disabled={!!projectName}
        className={classes.Autocomplete}
        id="region"
        onChange={handlerOnChange}
        options={regions?regions:[]}
        getOptionLabel={(option: any) => option.name}
        renderInput={(params) => (
          <TextField {...params} label={regionName?regionName:"Region"} variant="outlined" />
        )}
      />
    </div>
  );
};
