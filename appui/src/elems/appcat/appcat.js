import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import reducer redux
import { useSelector, useDispatch } from 'react-redux';
import { updateAppcat } from '../mainlayout/appcatState';
import { Typography } from '@mui/material';

export default function Appcat(props) {
  const dispatch = useDispatch();
  const appcat = useSelector((state) => state.appcats.current);
  const [errorFetch, setErrorFetch] = React.useState(false);


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
        setErrorFetch(false);
        dispatch(updateAppcat(data));
      }).catch(error => {
        setErrorFetch(true);
      });
  }, [dispatch, props.appcat]);


  // that one ensure fetch of data every 2 seconds so it's "auto refresh" primitive feature
  React.useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8080/' + props.appcat)
        .then(response =>
          {
            if (!response.ok) {
              return Promise.reject(response);
            }
            setErrorFetch(false);
            return response.json();
          }
        )
        .then(data => {
          setErrorFetch(false);
          dispatch(updateAppcat(data));
        }).catch(error => {
          setErrorFetch(true);
        });
    }, 2000);
    return () => clearInterval(interval);
  }
  , [dispatch, props.appcat]);

  return (
    errorFetch ? <Typography variant="body1">Error fetching data</Typography> :

    appcat && appcat.items && appcat.items.length > 0 ?
    <Stack spacing={2} direction="row">
      {
       appcat.items.map((item, index) => (
          <Typography key={index} variant="body1">
            {item.metadata.name ? item.metadata.name : "nie działa"}
          </Typography>
        ))
      }
    </Stack> :
    <>
    <Typography variant="body1">No {props.appcat}, create one!</Typography>
    <Button variant="contained" color="primary">Create {props.appcat}</Button>
    </>
  );
}
