import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Card, Space } from 'tiny-ui'
import img from './assets/isy.png'


import { createUseStyles } from 'react-jss'

import { AiOutlineLeft, AiOutlineReload } from 'react-icons/ai'

import ListaTickets from './Components/Customer/Tickets/ListaTickets.js'
import TicketForm from './Components/Customer/Tickets/TicketForm.js'
import TicketChat from './Components/Customer/Tickets/TicketChat.js'

const useStyle = createUseStyles({
    ISYcard: {
        position: "absolute",
        bottom: -95,
        left: '50%',
        padding: 6,
        background: 'white',
        borderRadius: 100,
        transform: 'translateX(-50%)',
        boxShadow: '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 6px 15px 4px rgb(0 0 0 / 5%)',

    },
    ISYlayout: {
        position: "relative",
    },
    ISYtitle: {
        position: "absolute",
        top: -60,
        width: "calc(100% - 14px)",
        left: '50%',
        padding: "12px 15px",
        background: 'white',
        borderRadius: 6,
        transform: 'translateX(-50%)',
        boxShadow: '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 6px 15px 4px rgb(0 0 0 / 5%)',
    }
})

export default function (params) {

    const classes = useStyle({})



    let [view, setView] = useState('list')
    let [_id, setId] = useState('current')

    let [pagination, setPagination] = useState({
        data: [],

        page: 1,
        limit: 20,

        total: 0,
        pages: 0
    })

    let views = {
        list: {
            title: 'Lista de Tickets',
            content: <ListaTickets
                pagination={pagination}
                setPagination={setPagination}
                setView={(view,_id) => {
                    setView(view)
                    setId(_id)
                }}
            />
        },
        chat: {
            title: 'Contacto con Soporte',
            content: <TicketChat
                ticket_id={_id}
                setView={setView}
            />,
            preffix: <Space style={{ position: "relative", marginRight: 6, marginTop: 2 }}>
                <AiOutlineLeft onClick={() => setView("list")} />
            </Space>,
            suffix: <Space style={{ position: "relative", marginRight: 6, marginTop: 2 }}>
                <AiOutlineReload onClick={() => window.location.reload()} />
            </Space>
        },
        form: {
            title: 'Nueva Incidencia',
            content: <TicketForm
                setView={setView}
            />,
            preffix: <Space style={{ position: "relative", marginRight: 6, marginTop: 2 }}>
                <AiOutlineLeft onClick={() => setView("list")} />
            </Space>,
            suffix: <Space style={{ position: "relative", marginRight: 6, marginTop: 2 }}>
                <AiOutlineReload onClick={() => window.location.reload()} />
            </Space>
        }
    }

    return <div className={classes.ISYlayout}>
        <Card
            className={classes.ISYcard}
        >
            <a href='http://iseeyoutech.com' target="_blank"><img src={img} style={{ height: 60 }} /></a>
        </Card>
        {views[view].content}
        <Card
            className={classes.ISYtitle}
        >
            <div style={{ width: "100%", display: "flex", }}>
                <div style={{ flex: 1, display: "flex", }}>
                    {views[view].preffix}
                    <strong>{views[view].title}</strong>
                </div>
                {views[view].suffix}
            </div>
        </Card>
    </div>

}

