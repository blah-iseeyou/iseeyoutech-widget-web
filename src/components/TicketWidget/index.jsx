import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { BugOutlined } from '@ant-design/icons'
import { Popover, Button, Tooltip, Layout, Spin } from 'antd'

import ISYLogo from '../../assets/isy.png'

const { Content } = Layout


const useStyles = createUseStyles({
  ticketButton: {
    background: 'linear-gradient(126.63deg, #2D348C 11.98%, #2D348C 83.35%)',
    position: 'fixed',
    bottom: 0,
    left: 0,
    borderRadius: '0 150px 0 0 !important',
    boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.32)'
  },
  ticketButtonIcon: {
    position: 'relative',
    top: 5,
    right: 5,
    fontSize: 20
  },
  ticketContent: {
    '& .ant-popover-inner': {
      padding: '12px !important'
    }
  },
  content: {
    position: 'relative',
    top: 5,
    right: 5,
    fontSize: 20
  }
})

export default function (params) {
  const [visiblePopover, setVisiblePopover] = useState(false)
  const [visibleTooltip, setVisibleTooltip] = useState(false)
  const [loading, setLoading] = useState(true)
  const classes = useStyles()

  return (
    <Tooltip title='Asistencia o Ayuda' placement='topLeft' open={!visiblePopover && visibleTooltip} onMouseEnter={() => setVisibleTooltip(true)} onMouseLeave={() => setVisibleTooltip(false)}>
      <Popover destroyTooltipOnHide overlayClassName={classes.ticketContent} placement='topLeft' content={(
        <Content>
          <Spin spinning={loading}>
            <iframe style={{ minWidth: 300, height: 650, border: 'none', background: 'unset' }} src='http://localhost:3000/tickets' onLoad={() => setLoading(false)} />
            <img src={ISYLogo}  style={{ display: 'block', margin: 'auto', maxHeight: 50 }} />
          </Spin>
        </Content>
      )} trigger='click' onOpenChange={setVisiblePopover}>
        <Button type='primary' size='large' className={classes.ticketButton} icon={<BugOutlined className={classes.ticketButtonIcon} style={{ color: 'currentColor' }} />} />
      </Popover>
    </Tooltip>
  )
}
