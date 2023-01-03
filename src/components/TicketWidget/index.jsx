import React, { useEffect, useState } from 'react'

import { AiFillBug, AiFillPlusCircle } from 'react-icons/ai'
import { createUseStyles } from 'react-jss'
import propTypes from 'prop-types'

const url = 'http://localhost:3000'

const useStyle = createUseStyles({
  ticketButton: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    color: 'white',
    padding: 0,
    background: 'linear-gradient(126.63deg, #2D348C 11.98%, #2D348C 83.35%)',
    width: '40px',
    height: '40px',
    borderRadius: '0 100px 0 0',
    outline: 'none',
    border: 'none !important',
    transition: '0.2s all ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.4)',
      bottom: 10,
      left: 10
    },
    zIndex: 100

  },
  ticketButtonIcon: {
    fontSize: '26px',
    transform: 'rotate(45deg)',
    position: 'relative',
    top: '5px',
    right: '5px'
  },
  wPopOver: props => ({

    // background: 'black',
    padding: 12,
    position: 'fixed',
    bottom: 10,
    left: 10,
    width: 300,
    height: 700,
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

function FrameContainer (props) {
  const {
    hidePopup = () => {},
    classes = { iframeISY: {}, wPopOver: {} },
    loading,
    setLoading
  } = props

  useEffect(() => {
    function onClickOutside (event) {
      if (!document.getElementById('isy-container').contains(event.target)) {
        hidePopup()
      }
    }
    document.addEventListener('click', onClickOutside, true)
    return () => {
      document.removeEventListener('click', onClickOutside, true)
    }
  }, [hidePopup])

  return (
    <div id='isy-container' className={classes.wPopOver}>
      <iframe className={classes.iframeISY} src={url + '/tickets'} onLoad={() => setLoading(false)} />
      {loading ? (
        <svg xmlns='http://www.w3.org/2000/svg' width='100px' height='100px' viewBox='0 0 100 100' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>
          <path d='M 50,50 L 33,60.5 a 20 20 -210 1 1 34,0 z' fill='lightgray'>
            <animateTransform attributeName='transform' type='rotate' from='0 50 50' to='360 50 50' dur='1.2s' repeatCount='indefinite' />
          </path>
          <circle cx='50' cy='50' r='16' fill='white' />
        </svg>
      ) : null}
      <img src={url + '/img/ISY-Logo_landing_black.png'} style={{ maxHeight: 50, display: 'block', margin: 'auto' }} />
    </div>
  )
}

FrameContainer.propTypes = {
  hidePopup: propTypes.func,
  classes: propTypes.object,
  loading: propTypes.bool,
  setLoading: propTypes.func
}

export default function TicketWidget (props) {
  const [loading, setLoading] = useState(true)
  const [popOverVisible, setPopOverVisible] = useState(0)
  const classes = useStyle({
    animation: (popOverVisible === 2) ? '0.5s ease 0s 1 $slideToBottom' : '0.5s ease 0s 1 $slideFromBottom'
  })

  const hidePopup = () => {
    setPopOverVisible(2)
    setTimeout(() => setPopOverVisible(0), 490)
  }

  const onClickButton = () => {
    switch (popOverVisible) {
      case 0:
        setPopOverVisible(1)
        break
      case 1:
        hidePopup()
        break
    }
  }
  return (
    <>
      <button className={classes.ticketButton} onClick={onClickButton}>
        {(popOverVisible !== 0) ? <AiFillPlusCircle className={classes.ticketButtonIcon} /> : <AiFillBug className={classes.ticketButtonIcon} />}
      </button>
      {(popOverVisible !== 0) ? <FrameContainer hidePopup={hidePopup} classes={classes} loading={loading} setLoading={setLoading} popOverVisible={popOverVisible} setPopOverVisible={setPopOverVisible} /> : null}
    </>
  )
}
