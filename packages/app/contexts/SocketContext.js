import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'

import { useSelector } from 'react-redux'

const SocketContext = createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const { isAuthenticated, currentUser } = useSelector(state => state.auth)

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const socketIo = io(process.env.NEXT_PUBLIC_SERVER_URL, {
        transports: ['websocket'],
        upgrade: false,
        query: { userId: currentUser._id, username: currentUser.username }
      })

      socketIo.on('connect', function () {
        setSocket(socketIo)
        console.log(`${socketIo.id} connected!`) // eslint-disable-line
        socketIo.emit('connected', currentUser._id) //userName is unique
      })

      socketIo.on('disconnect', function () {
        setSocket(socketIo)
        console.log(`${socketIo.id} disconnected!`) // eslint-disable-line
      })

      socketIo.on('reconnect', function () {
        setSocket(socketIo)
        console.log(`${socketIo.id} reconnected!`) // eslint-disable-line
      })
    }
  }, [isAuthenticated, currentUser])

  const defaultContext = { socket }
  return <SocketContext.Provider value={defaultContext}>{children}</SocketContext.Provider>
}

SocketContextProvider.propTypes = {
  children: PropTypes.node
}
