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
    const socketIo = io(process.env.NEXT_PUBLIC_SERVER_URL)
    setSocket(socketIo)

    setTimeout(() => {
      console.log(`Client: ${socketIo.id} -> connected`) // eslint-disable-line no-console
    }, 5000)
  }, [])

  const defaultContext = { socket }
  return <SocketContext.Provider value={defaultContext}>{children}</SocketContext.Provider>
}

SocketContextProvider.propTypes = {
  children: PropTypes.node
}
