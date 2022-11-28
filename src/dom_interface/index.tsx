import { Box } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ExtensionIdStatus } from '../component/ExtensionIdStatus';
import { HostStatus } from '../component/HostStatus';


function App(){

  return <Box
    padding={2}
  >
    <HostStatus />
    <ExtensionIdStatus />
  </Box>
}


export function createDomInterface() {
  const idElem = 'kampretcode' 

  const body = document.createElement('div')
  body.id = idElem
  document.body.prepend(body)



  const root = ReactDOM.createRoot(
    document.getElementById(idElem) as HTMLElement
  )

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

  
  return root

}





