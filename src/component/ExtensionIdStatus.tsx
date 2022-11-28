import { Chip } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { socket } from "../utils/socket"
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import { ExtensionInfoEvent } from "../event";
import { keyExtensionName } from "../config";



export function ExtensionIdStatus() {
  
  const [ extId, setExtension ] = useState<string>(localStorage.getItem(keyExtensionName) || '')

  
  const connect = useCallback((data: ExtensionInfoEvent) => {
    setExtension(data.data.extensionId)
    localStorage.setItem(keyExtensionName, data.data.extensionId)
    socket.emit('ack_extension_info', {})
  }, [])

  useEffect(() => {
    socket.on('extension_info', connect)

    return () => {
      socket.off('extension_info', connect)
  
    }
  }, [])

  if(extId){
    return <Chip
      icon={<DoneIcon />}
      label={extId} color='success' variant="outlined"/>
  } else {
    return <Chip
      icon={<ErrorIcon />}
      label={'Extension Not Connect'} color='error' variant="outlined"/>
  }

}