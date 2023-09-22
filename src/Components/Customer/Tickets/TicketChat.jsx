import React, { useState, useEffect, useContext } from 'react'
import { Button, Layout, NativeSelect, Typography, Textarea, Avatar } from 'tiny-ui'
import Color from 'color'
import { AiOutlineFile, AiOutlineSend } from 'react-icons/ai'
// import PageHeader from '../../../Widgets/PageHeader.js'
import { useDropzone } from 'react-dropzone';
import moment from 'moment'

import '../../../Styles/Modules/TicketChat.scss'
import SocketContext from '../../../Contexts/Socket'
import { getSign, URL_WS } from '../../../Contexts/Params'
import SocketIOFileClient from 'socket.io-file-client'

const { Text, Title, Paragraph } = Typography
const { Option } = NativeSelect


class TicketChat extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      messages: {
        data: [],
        page: 1,
        limit: 30,
  
        pages: 0,
        total: 0
      },
      shiftkey: false,
      files: [],
      message: "",
      ticket: null
    }
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }
  
  componentDidMount(){
    const { socket, params, ticket_id } = this.props
    const { messages } = this.state

    document.addEventListener('keyup', this.keyUp)
    document.addEventListener('keydown', this.keyDown)

    socket.on("/cliente/tickets/chat", this.getChat)
    socket.on("/tickets/chat/add", this.addMessage)

    socket.emit("/cliente/tickets/chat", {
      ticket_id,
      page: messages.page,
      limit: messages.limit,
      ...params
    })
  }

  componentWillUnmount(){
    const { socket, ticket_id } = this.props

    socket.emit("/admin/tickets/chat/off", ticket_id)

    socket.removeListener('/cliente/tickets/chat')
    socket.removeListener('/tickets/chat/add')

    document.removeEventListener('keyup', this.keyUp);
    document.removeEventListener('keydown', this.keyDown);

  }
  
  keyUp(e) {
    // console.log(":E", e)
    if (e.shiftKey == false && this.state.shiftkey == true)
      this.setState({ shiftkey: false })
  }

  keyDown(e) {
    // console.log(":E", e)
    if (e.shiftKey == true && this.state.shiftkey == false)
      this.setState({ shiftkey: true })
  }

  getChat = (response) => {
    if (response.page > 1)
      response.data = [...messagesPagination.data, ...response.data]


    this.setState({
      ticket: response.ticket,
      messages: {
        ...this.state.messages,
        ...response
      }
    })

    // setTicket(response.ticket)
    // // // let e
    // setMessagesPagination(response)
  }

  addMessage = message => {
    // console.log("@messagesPagination", message);
    
    let { messages } = this.state

    messages.data = [
      message,
      ...messages.data,
    ]

    this.setState({ messages })

    // console.log("@messagesPagination", messagesPagination);
    // setMessagesPagination({
    //   ...messagesPagination,
      // data: 
    // })
  }

  setMessage = message => this.setState({message})
  
  handleSubmit = () => {

    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
      inputRef,
      params,
      socket,
      ticket_id,
      URL
    } = this.props

    // console.log("PAGO");
    const {
      messages,
      shiftkey,
      files,
      message,
      ticket
    } = this.state

    if ((message && message.length > 0)
      // || filesUploaded.length > 0
    ) {
      this.setState({ 
        message: "",
        files: []
      })
      socket.emit('/cliente/tickets/chat/add', {
        ...params,
        ticket_id,
        texto: message
      })
    }
  }

  renderMessage = ({ texto, _id, autor, fecha, archivos }) => {

    const { params, URL } = this.props

    console.log("autor", !!autor);
    let me = (params.email && !autor)

    return <div className={"isy-chat-message " + (me ? "me" : "")} key={_id} style={me ? { justifyContent: "flex-end" } : {}}>
      {(!me ? <Avatar size={30}  >{autor?.nombre}</Avatar> : null)}
      <div className="isy-chat-message-body">
        {!me && <Text className='isy-chat-time'>{autor?.nombre} {autor?.apellidos} dice:</Text>}
        <Text className='isy-text'>{texto}</Text>
        <Text className='isy-chat-time'>{moment(fecha).format("LLL")}</Text>
      </div>
      {archivos?.map(e => {
        return <div className="isy-chat-message-body">
          {Boolean(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/.test(e.file)) ? <image

            style={{ maxWidth: 200 }}
            src={URL + "/upload/customer-chat/" + e.file}
            className="mb-1" /> : <Button size="small" target="_blank" download href={URL + "/upload/customer-chat/" + e.file} block >{e.name}</Button>}
        </div>
      })}
    </div>
  }


  render() {


    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
      inputRef
    } = this.props

    const {
      messages,
      shiftkey,
      files,
      message,
      ticket
    } = this.state


    return <div style={{ width: 300, minHeight: 580, position: "relative", flexDirection: 'column', padding: "6px 7px" }} {...getRootProps()} >
      <Layout className='chat-layout'>
        {messages.data.map(e => this.renderMessage(e))}
      </Layout>
      <div className='form-chat' >
        {/* <input {...getInputProps()} /> */}
        <Textarea
          value={message}
          onChange={this.setMessage}
          placeholder={"Envia un mensaje o arrastre un archivo al área..."}
          className="textarea-message"
          onKeyPress={e => {
            if (e.charCode == 13 && shiftkey == false) {
              e.preventDefault()
              this.handleSubmit()
            }
          }}
        />
        <AiOutlineFile className="file-message" onClick={() => {
          if (inputRef && inputRef.current)
            inputRef?.current?.click()
        }} />
        <AiOutlineSend className="send-message" onClick={this.handleSubmit} />
        {<div className='drop-area' style={{ display: isDragAccept ? "flex" : "none" }}>
          <AiOutlineFile style={{ fontSize: 36, display: "block", margin: "0 auto" }} />
          <Text className='title'>Arrastre los archivos a esta área</Text>
        </div>}
      </div>
    </div>

  }

}

export default props => <TicketChat
  {...props}
  params={getSign()}
  URL={useContext(URL_WS)}
  socket={useContext(SocketContext)}
  {...useDropzone({ noClick: true })}
  
  />


// export default function TicketChat({ ticket_id }) {

//   const params = getSign()
//   const socket = useContext(SocketContext)

//   const URL = useContext(URL_WS)

//   const [messagesPagination, setMessagesPagination] = useState({
//     data: [],
//     page: 1,
//     limit: 30,

//     pages: 0,
//     total: 0
//   })
//   const [shiftkey, setShiftKey] = useState(false)
//   const [files, setFiles] = useState({})
//   const [message, setMessage] = useState()
//   const [ticket, setTicket] = useState()


//   useEffect(() => {
   

//     return () => {
//       socket.emit("/admin/tickets/chat/off", ticket_id)

//       socket.removeListener('/cliente/tickets/chat')
//       socket.removeListener('/tickets/chat/add')

//       document.removeEventListener('keyup', keyUp);
//       document.removeEventListener('keydown', keyDown);
//     }
//   }, [])


//   let getChat = (response) => {
//     if (response.page > 1)
//       response.data = [...messagesPagination.data, ...response.data]

//     setTicket(response.ticket)

//     // // let e
//     setMessagesPagination(response)
//   }

//   let addMessage = message => {

//     console.log("@messagesPagination", messagesPagination);
//     setMessagesPagination({
//       ...messagesPagination,
//       data: [
//         message,
//         ...messagesPagination.data,
//       ]
//     })
//   }


//   let handleSubmit = () => {

//     if ((message && message.length > 0)
//       // || filesUploaded.length > 0
//     ) {

//       setMessage("")
//       setFiles({})
//       socket.emit('/cliente/tickets/chat/add', {
//         ...params,
//         ticket_id,
//         texto: message
//       })
//     }
//   }



//   const {
//     getRootProps,
//     getInputProps,
//     isFocused,
//     isDragAccept,
//     isDragReject,
//     inputRef
//   } = useDropzone({ noClick: true })




//   console.log("messagesPagination", messagesPagination);



// }