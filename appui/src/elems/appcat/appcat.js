import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import reducer redux
import { useSelector, useDispatch } from 'react-redux';
import { updateAppcat } from '../mainlayout/appcatState';
import { Icon, Tooltip, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import CircularProgress from '@mui/material/CircularProgress';


export default function Appcat(props) {
  const dispatch = useDispatch();
  //const appcat = useSelector((state) => state.appcats.current);
  const [appcat, setAppcat] = React.useState(null);
  const [errorFetch, setErrorFetch] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);


  // fetch data from backend immediately using UseEffect
  // that one ensure immediate fetch of initial data

  React.useEffect(() => {
    fetch('http://localhost:8080/' + props.appcat)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        setErrorFetch(false);
        return response.json();
      })
      .then(data => {
        setAppcat(data);
      }).catch(err => {
        console.error(err);
        setErrorFetch(true);
      }).finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }

  if (errorFetch) {
    return (
      <>
        <Typography variant="body1">No {props.appcat}, create one!</Typography>
        <Button variant="contained" color="primary">Create {props.appcat}</Button>
      </>
    )
  }

  return (
    appcat && appcat.items && appcat.items.length > 0 &&
    <Stack spacing={2} direction="column">
      {
        appcat.items.map((item, index) => (

          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography>{item.metadata.labels['crossplane.io/claim-name']}</Typography>
              <Tooltip title={item.spec.parameters.instances < 3 ? "HA Disabled" : "HA Enabled"} placement="right">
                <SecurityIcon color={item.spec.parameters.instances ? 'disabled' : 'action'} />
              </Tooltip>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Name: {item.metadata.labels['crossplane.io/claim-name']}
              </Typography>
              <Typography>
                Namespace: {item.metadata.labels['crossplane.io/claim-namespace']}
              </Typography>
              <Typography>
                Maintenance: {item.spec.parameters.maintenance.dayOfWeek} {item.spec.parameters.maintenance.timeOfDay}
              </Typography>
              <Typography>
                Version: {item.spec.parameters.service.majorVersion}
              </Typography>
              <Typography color={item.spec.parameters.service.serviceLevel == "besteffort" ? 'crimson' : "green"}>
                Service Level: {item.spec.parameters.service.serviceLevel}
              </Typography>
              <Typography>
                Size: {item.spec.parameters.size.plan}
              </Typography>
            </AccordionDetails>
            <AccordionActions>
              <Button color={'error'}>Remove</Button>
              <Button>Login Credentials</Button>
            </AccordionActions>
          </Accordion>
        ))
      }
    </Stack>
  );
}
