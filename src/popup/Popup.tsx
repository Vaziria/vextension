import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { socket } from '../utils/socket';
import { Typography } from '@mui/material';

function App() {
  const locked = useState(false);

  useEffect(() =>{

    socket.on('is_captcha', (data) => {
      console.log("captcha", data)
    })

  }, [])
  
  
  return (
    <div className="App">
      { !locked &&
        <Typography>Crawler Running</Typography>
      }


      { locked &&
        <Button variant="outlined" size='small' color='error'>release</Button>
      } 
    </div>
  );
}

export default App;
