import React, { useState } from 'react'
import { Card, Space } from 'tiny-ui'
import img from './assets/isy.png'


import { createUseStyles } from 'react-jss'

import { AiOutlineLeft, AiOutlineReload } from 'react-icons/ai'

import ListaTickets from './Components/Customer/Tickets/ListaTickets'
import TicketForm from './Components/Customer/Tickets/TicketForm'
import TicketChat from './Components/Customer/Tickets/TicketChat'

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
        zIndex: 100
    },
    ISYlayout: {
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        zIndex: 100
    },
    ISYtitle: {
        // position: "absolute",
        // top: -60,
        // width: "calc(100% + 14px)",
        // left: '50%',
        // padding: "12px 15px",
        // background: 'white',
        // borderRadius: 6,
        // transform: 'translateX(-50%)',
        // boxShadow: '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 6px 15px 4px rgb(0 0 0 / 5%)',
        padding: "6px 7px"
    }
})


class Router extends React.Component{

    state = {
        // view: 'list',
        // _id: 'current',
        pagination: {
            data: [],

            page: 1,
            limit: 20,

            total: 0,
            pages: 0
        }
    }

    // setView = (view) => this.setState({ view })
    // setId = (_id) => this.setState({ _id })
    setPagination = (pagination) => this.setState({ pagination })

    getViews = () => {

        const { setPagination } = this
        const { view, setView, _id, setId } = this.props
        const { pagination  } = this.state

        return {
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


    }

    render (){

        const { classes, view, setView, setId, _id } = this.props
        const { getViews,  setPagination } = this
        // const {   } = this.state
        const views = getViews()

        return <div className={classes.ISYlayout}>
            <Card className={classes.ISYcard}>
                <a href='http://iseeyoutech.com' target="_blank"><img src={img} style={{ height: 60 }} /></a>
            </Card>
            <Card className={classes.ISYtitle}>
                <div style={{ width: "100%", display: "flex", }}>
                    <div style={{ flex: 1, display: "flex", }}>
                        {views[view].preffix}
                        <strong>{views[view].title}</strong>
                    </div>
                    {views[view].suffix}
                </div>
            </Card>
            {views[view].content}
        </div>
    }
}

export default React.forwardRef(function MyInput(props, ref) {
    const classes = useStyle({})
    return <Router classes={classes} {...props} ref={ref} />

})

// export default function (params) {

//     
    
    // let [view, setView] = useState('list')
    // let [_id, setId] = useState('current')

    // let [pagination, setPagination] = useState({
    //     data: [],

    //     page: 1,
    //     limit: 20,

    //     total: 0,
    //     pages: 0
    // })

    // let views = {
    //     list: {
    //         title: 'Lista de Tickets',
    //         content: <ListaTickets
    //             pagination={pagination}
    //             setPagination={setPagination}
    //             setView={(view,_id) => {
    //                 setView(view)
    //                 setId(_id)
    //             }}
    //         />
    //     },
    //     chat: {
    //         title: 'Contacto con Soporte',
    //         content: <TicketChat
    //             ticket_id={_id}
    //             setView={setView}
    //         />,
    //         preffix: <Space style={{ position: "relative", marginRight: 6, marginTop: 2 }}>
    //             <AiOutlineLeft onClick={() => setView("list")} />
    //         </Space>,
    //         suffix: <Space style={{ position: "relative", marginRight: 6, marginTop: 2 }}>
    //             <AiOutlineReload onClick={() => window.location.reload()} />
    //         </Space>
    //     },
    //     form: {
    //         title: 'Nueva Incidencia',
    //         content: <TicketForm
    //             setView={setView}
    //         />,
    //         preffix: <Space style={{ position: "relative", marginRight: 6, marginTop: 2 }}>
    //             <AiOutlineLeft onClick={() => setView("list")} />
    //         </Space>,
    //         suffix: <Space style={{ position: "relative", marginRight: 6, marginTop: 2 }}>
    //             <AiOutlineReload onClick={() => window.location.reload()} />
    //         </Space>
    //     }
    // }

    // return <div className={classes.ISYlayout}>
    //     <Card className={classes.ISYcard}>
    //         <a href='http://iseeyoutech.com' target="_blank"><img src={img} style={{ height: 60 }} /></a>
    //     </Card>
    //     <Card className={classes.ISYtitle}>
    //         <div style={{ width: "100%", display: "flex", }}>
    //             <div style={{ flex: 1, display: "flex", }}>
    //                 {views[view].preffix}
    //                 <strong>{views[view].title}</strong>
    //             </div>
    //             {views[view].suffix}
    //         </div>
    //     </Card>
    //     {views[view].content}

    // </div>

// }

