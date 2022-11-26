import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { HostStatus } from '../component/HostStatus';
import { Avatar, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import image from '../../public/icons48.png';


function App() {
  const locked = useState(false);

  useEffect(() =>{


    // socket.on('is_captcha', (data) => {
    //   console.log("captcha", data)
    // })
    const port = chrome.runtime.connect({ name: 'popup' });
    port.postMessage({name: "testing data"});

    return () => {
      port.disconnect()
    }

  }, [])
  
  
  return (
    <div className={
      css`
        width: 600px;
        height: 100px;
        padding: 30px 15px 15px 30px;
        `
    }>

    <Grid container spacing={2} alignItems="center">
      
      <Grid item xs={8}>
        <Stack direction='row' spacing={2}>
          <Avatar src={image} />
          <Typography variant='h4'>
            Vee Extension
          </Typography>
        </Stack>
        
      </Grid>

      <Grid item xs={4}>
        <HostStatus />
      </Grid>
    </Grid>

    {/* <Paper elevation={2}
      className={
        css`
          padding: 10px;
          margin-top: 20px;
        `
      }
    >
      <Button variant="contained" color='error' size='small'>resume crawler</Button>
    </Paper> */}
    

    
    
  </div>
  );
}

export default App;
