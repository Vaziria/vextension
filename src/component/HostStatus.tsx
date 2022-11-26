import { Chip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { webSocketEndpoint } from "../config";
import { socket } from "../utils/socket";
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';



export function HostStatus() {
  const [ connected, setConnected ] = useState(false)

  const disconnect = useCallback(() => {
    setConnected(false)
  }, [])

  const connect = useCallback(() => {
    setConnected(true)
  }, [])

  useEffect(() => {
    socket.on('connect', connect)
    socket.on('disconnect', disconnect)

    return () => {
      socket.off('connect', connect)
      socket.off('disconnect', disconnect)
    }
  }, [])

  if(connected){
    return <Chip
      icon={<DoneIcon />}
      label={webSocketEndpoint} color='success' variant="outlined"/>
  } else {
    return <Chip
      icon={<ErrorIcon />}
      label={webSocketEndpoint} color='error' variant="outlined"/>
  }

}