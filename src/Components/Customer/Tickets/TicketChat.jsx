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


export default function ({ ticket_id }) {

  const params = getSign()
  const socket = useContext(SocketContext)

  const URL = useContext(URL_WS)

  const [messages, setMessages] = useState({
    data: [],
    page: 1,
    limit: 30,

    pages: 0,
    total: 0
  })
  const [shiftkey, setShiftKey] = useState(false)
  const [files, setFiles] = useState({})
  const [message, setMessage] = useState()
  const [ticket, setTicket] = useState()




  function keyUp(e) {
    if (e.shiftKey == false && shiftkey == true)
      setShiftKey(false)
  }

  function keyDown(e) {
    if (e.shiftKey == true && shiftkey == false)
      setShiftKey(true)
  }

  let cUploader

  useEffect(() => {
    
    document.addEventListener('keyup', keyUp);
    document.addEventListener('keydown', keyDown);

    
    socket.on("/cliente/tickets/chat", getChat)
    socket.on("/cliente/tickets/chat/add", addMessage)
    
    socket.emit("/cliente/tickets/chat", {
        ticket_id,
        page: messages.page,
        limit: messages.limit,
        ...params
    })            

    // socket.emit("cliente/chat", { ticket_id, ...params })
    

    return () => {
      socket.emit("/admin/tickets/chat/off", ticket_id)

      socket.removeListener('/cliente/tickets/chat')
      socket.removeListener('/cliente/tickets/chat/add')
      
      document.removeEventListener('keyup', keyUp);
      document.removeEventListener('keydown', keyDown);



    }
  }, [])


  const getChat = (response) => {

    console.log("response.messages", response)
    if (response.page > 1)
      response.data = [...messages.data, ...response.data]

    setTicket(response.ticket)
    setMessages(response)
  }

  const formatMessage = ({ texto, _id }) => ({ text: texto, id: _id, me: true })

  const addMessage = mes => setMessage(message.concat(formatMessage(mes)))


  const handleSubmit = () => {

    if ((message && message.length > 0)
      // || filesUploaded.length > 0
    ) {

      setMessage("")
      setFiles({})
      socket.emit("cliente/chat/message", {
        ...params,
        ticket_id,
        texto: message
      })
    }
  }



  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    inputRef
  } = useDropzone({ noClick: true })


  const renderMessage = ({ texto, _id, autor, fecha, archivos }) => {

    let me = (params.email && !autor)

    return <div className={"isy-chat-message " + (me ? "me" : "")} key={_id} style={me ? { justifyContent: "flex-end" } : {}}>
      {(!me ? <Avatar size={30}  >{autor?.nombre}</Avatar> : null)}
      <div class="isy-chat-message-body">
        {!me && <Text className='isy-chat-time'>{autor?.nombre} {autor?.apellidos} dice:</Text>}
        <Text className='isy-text'>{texto}</Text>
        <Text className='isy-chat-time'>{moment(fecha).format("LLL")}</Text>
      </div>
      {archivos?.map(e => {
        return <div class="isy-chat-message-body">
          {Boolean(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/.test(e.file)) ? <image
            
            style={{ maxWidth: 200 }}
            src={URL + "/upload/customer-chat/" + e.file}
            className="mb-1" /> : <Button size="small" target="_blank" download href={URL + "/upload/customer-chat/" + e.file} block >{e.name}</Button>}
        </div>
      })}
    </div>
  }

  return <div style={{ width: 300, minHeight: 580, position: "relative", flexDirection: 'column', padding: "6px 7px" }} {...getRootProps()}>
    <Layout className='chat-layout'>
      {messages.data.map(e => renderMessage(e))}
    </Layout>
    <div className='form-chat' >
      {/* <input {...getInputProps()} /> */}
      <Textarea
        value={message}
        onChange={setMessage}
        placeholder={"Envia un mensaje o arrastre un archivo al área..."}
        className="textarea-message"
        onKeyPress={e => {
          if (e.charCode == 13 && shiftkey == false) {
            e.preventDefault()
            handleSubmit()
          }
        }}
      />
      <AiOutlineFile className="file-message" onClick={() => {
        if (inputRef && inputRef.current)
          inputRef?.current?.click()
      }} />
      <AiOutlineSend className="send-message" />
      {<div className='drop-area' style={{ display: isDragAccept ? "flex" : "none" }}>
        <AiOutlineFile style={{ fontSize: 36, display: "block", margin: "0 auto" }} />
        <Text className='title'>Arrastre los archivos a esta área</Text>
      </div>}
    </div>
  </div>

}