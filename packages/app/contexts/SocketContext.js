import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'

const SocketContext = createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io(process.env.NEXT_PUBLIC_NOIZE_APP_SERVER_URL))
  }, [])

  const defaultContext = { socket }
  return <SocketContext.Provider value={defaultContext}>{children}</SocketContext.Provider>
}

SocketContextProvider.propTypes = {
  children: PropTypes.node
}
