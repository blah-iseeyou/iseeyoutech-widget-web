import React, { useState } from 'react'
import { Popover, Pane, Button, Spinner } from 'evergreen-ui'
import { AiFillBug } from 'react-icons/ai'

import './index.css'

export default function TicketWidget (props) {
  const [loading, setLoading] = useState(true)

  const content = ({ close }) => (
    <Pane width={350} height={700} paddingX={12} paddingTop={12} paddingBottom={12} display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
      {loading ? <Spinner marginX='auto' marginY={120} /> : null}
      <iframe style={{ minWidth: 300, height: 650, border: 'none', background: 'unset' }} src='http://localhost:3000/tickets' onLoad={() => setLoading(false)} />
      <img src='http://localhost:3000/logo_isy.png' style={{ display: 'block', margin: 'auto', maxHeight: 40 }} />
    </Pane>
  )
  return (
    <Popover shouldCloseOnExternalClick shouldCloseOnEscapePress content={content}>
      <Button appearance='primary' size='large' className='ticket-button'><AiFillBug className='ticket-button-icon' /></Button>
    </Popover>
  )
}
