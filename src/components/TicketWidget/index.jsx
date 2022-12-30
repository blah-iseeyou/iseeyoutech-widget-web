import React, { useState } from 'react'
import { Popover, Pane, Button, Spinner } from 'evergreen-ui'
import { AiFillBug } from 'react-icons/ai'
import { createUseStyles } from 'react-jss'

import './index.css'

const useStyle = createUseStyles({
  ticketButton: {
    position: 'fixed',
    bottom: 0,
    left: 0,

    padding: 0,
    background: 'linear-gradient(126.63deg, #2D348C 11.98%, #2D348C 83.35%)',
    width: '50px',
    height: '50px',
    borderRadius: '0 100px 0 0',
    border: 'none !important'
  },

  ticketButtonIcon: {
    fontSize: '26px',
    transform: 'rotate(45deg)',
    position: 'relative',
    top: '5px',
    right: '5px'
  }
})

export default function TicketWidget (props) {
  const [loading, setLoading] = useState(true)
  const classes = useStyle()

  const content = ({ close }) => (
    <Pane width={350} height={700} paddingX={12} paddingTop={12} paddingBottom={12} display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
      {loading ? <Spinner marginX='auto' marginY={120} /> : null}
      <iframe style={{ minWidth: 300, height: 650, border: 'none', background: 'unset' }} src='http://localhost:3000/tickets' onLoad={() => setLoading(false)} />
      <img src='http://localhost:3000/logo_isy.png' style={{ display: 'block', margin: 'auto', maxHeight: 40 }} />
    </Pane>
  )
  return (
    <Popover shouldCloseOnExternalClick shouldCloseOnEscapePress content={content}>
      <Button appearance='primary' size='large' className={classes.ticketButton}><AiFillBug className={classes.ticketButtonIcon} /></Button>
    </Popover>
  )
}
