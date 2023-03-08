import { useState, useContext } from 'react'
import reactLogo from './assets/react.svg'

import { AiFillBug, AiFillPlusCircle } from 'react-icons/ai'
import { createUseStyles } from 'react-jss'

import Socket, { SetSocketContext } from './Contexts/Socket'
import io from "socket.io-client";

import { Popover } from 'tiny-ui'
import Routes from './Routes'

import { Email, Nombre, ProyectoId, getSign } from './Contexts/Params'

import './Styles/App.scss'

const useStyle = createUseStyles({
  ticketButton: {
    position: "relative",
    left: -10,
    color: 'white',
    padding: 0,
    background: '#2D348C',
    width: '40px',
    height: '40px',
    borderRadius: '0 100px 0 0',
    outline: 'none',
    border: 'none !important',
    transition: '0.2s all ease-in-out',
    cursor: 'pointer',
    '&:hover ': {
      transform: 'scale(1.2)',
      bottom: -1
    },
    zIndex: 10001

  },
  ticketButtonIcon: {
    fontSize: '26px',
    transform: 'rotate(45deg)',
    position: 'relative',
    top: '5px',
    right: '5px'
  },
  wPopOver: props => ({
    zIndex: 1000,
    background: 'white',
    padding: 12,
    position: 'fixed',
    bottom: 10,
    left: 0,
    width: 324,
    height: '725px',
    borderRadius: 6,
    boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.20)',
    animation: props.animation
  }),
  iframeISY: { minWidth: 300, height: 650, border: 'none', background: 'unset' },
  '@keyframes slideFromBottom ': {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' }
  },
  '@keyframes slideToBottom ': {
    from: { transform: 'translateY(0)' },
    to: { transform: 'translateY(100%)' }
  }
})


function App(props) {

  const classes = useStyle({})

  const [socket, setSocket] = useState(io(import.meta.env.VITE_APP_WEB_SERVICE, { withCredentials: true, }))
  const [visible, setVisible] = useState(false)

  const [email, setEmail] = useState(props?.email)
  const [nombre, setNombre] = useState(props.nombre)
  const [proyectoId, setProyectoId] = useState(props?.proyectoId)

  return (
    <Email.Provider value={email}>
      <Nombre.Provider value={nombre}>
        <ProyectoId.Provider value={proyectoId}>
          <Socket.Provider value={socket}>
            <Popover
              onVisibleChange={setVisible}
              content={<Routes />}
              placement="top-start">
              <div style={{ position: 'fixed', bottom: 0, left: 10, }}>
                <button className={classes.ticketButton} >
                  {(visible) ? <AiFillPlusCircle className={classes.ticketButtonIcon} /> : <AiFillBug className={classes.ticketButtonIcon} />}
                </button>
              </div>
            </Popover>
          </Socket.Provider>
        </ProyectoId.Provider>
      </Nombre.Provider>
    </Email.Provider>
  )
}


export default App