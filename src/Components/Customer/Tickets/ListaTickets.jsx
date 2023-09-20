import React, { useEffect, useState, useContext } from 'react'


import { Alert, Button, Card, Input, Layout, Pagination, Space, Typography, Tooltip } from 'tiny-ui'
import Color from 'color'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineRight, AiOutlineMessage } from 'react-icons/ai'
// import PageHeader from '../../../Widgets/PageHeader.js'

import Socket from '../../../Contexts/Socket'
import { getSign } from '../../../Contexts/Params'

const { Text, Paragraph } = Typography

let estatuses = [
    {
        title: "Cancelada",
        color: "#d80700",
        key: "cancelada",
    },
    {
        title: "Nueva",
        color: "#2c59ff",
        key: "en_espera",
    },
    {
        title: "Desarollo",
        color: "#faad14",
        key: "en_proceso",
    },
    {
        title: "Prueba",
        color: "#7b868e",
        key: "en_confirmacion",
    },
    {
        title: "Pausada",
        color: "#4e2e8f",
        key: "pausadas",
    },
    {
        title: "Completada",
        color: "#52c41a",
        key: "completadas",
    },
]

estatuses = estatuses.map(e => ({ ...e, ligth: Color(e.color).fade(0.8).hexa() }))

function ItemList({ estatus, asunto, setView, mensajes, _id, ...args }) {
    // console.log("ar", args)
    let { color, title, key, ligth } = estatuses[(estatus ?? 1)]
    let [visibleActions, setVisibleActions] = useState()

    return <div style={{ display: "flex", marginTop: 12, flexDirection: "row", border: "1px solid " + ligth, padding: "5px", borderRadius: 6, justifyContent: "space-between", cursor: "pointer" }}
        onMouseEnter={() => setVisibleActions(true)}
        onMouseLeave={() => setVisibleActions(false)}
        onClick={() => setView("chat", _id)}
    >
        <Tooltip title={asunto?.substring(0, 26)}><Text style={{ fontSize: 14, flex: 1 }}>{asunto?.substring(0, 26)}</Text></Tooltip>
        {!visibleActions ?
            <Space >
                {(mensajes > 0) && <Text style={{ backgroundColor: color, color: "white", padding: "2px 5px", borderRadius: 4, fontSize: 12, }}>
                    <AiOutlineMessage style={{ fontSize: 16, position: "relative", top: 3, left: -3 }} />{mensajes}
                </Text>}

                <Text style={{ backgroundColor: color, color: "white", padding: "2px 5px", borderRadius: 4, fontSize: 12, }}>{title}</Text>
            </Space>
            :
            <Space style={{ position: "relative", top: 1 }}>
                {/* <AiOutlineEdit style={{ fontSize: 16, cursor: "pointer" }} /> */}
                <AiOutlineDelete style={{ fontSize: 16, cursor: "pointer" }} />
            </Space>
        }
    </div>
}

export default function ({ pagination, setPagination, setView }) {
    let params = getSign()
    const socket = useContext(Socket)
    
    useEffect(() => {
        getTickets()
        socket.on("/cliente/tickets", (e) => {
            console.log("x", e)
            setPagination(e)
        })
        socket.on("/cliente/tickets/list/update", () => getTickets())
        return () => {
            socket.removeEventListener("/cliente/tickets")
            socket.removeEventListener("/cliente/tickets/list/update")
        }
    }, [])

    const getTickets = (
        {
            page = pagination.page,
            limit = pagination.limit,
        } = pagination
    ) => {
        socket.emit("/cliente/tickets", {
            page,
            limit,
            ...params
        })
    }

    return <div style={{ minWidth: 300, minHeight: 580, position: "relative", display: "flex", flexDirection: 'column', padding: "6px 7px" }}>
        <Layout style={{ flex: 1, display: "flex", flexDirection: 'column' }}>
            {/* <PageHeader title="Lista de Tickets" /> */}
            <div style={{ flex: 1, }} >
                <Input placeholder='Buscar...' style={{ margin: "1.5em 0 1.2em 0" }} />
                {pagination.data.map(e => <ItemList {...e} setView={setView} />)}
            </div>
            <Pagination
                total={pagination.total}
                pagesize={pagination.limit} size="sm" style={{ margin: "15px 0 15px 0" }} />
        </Layout>
        <Button btnType="danger" style={{ width: "100%" }} onClick={() => setView('form')}>Nueva Incidencia</Button>
    </div>

}

