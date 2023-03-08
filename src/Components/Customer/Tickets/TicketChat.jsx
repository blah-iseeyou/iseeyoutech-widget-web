import React, { useState, useEffect, useContext } from 'react'
import { Button, Layout, NativeSelect, Typography, Textarea, Avatar } from 'tiny-ui'
import Color from 'color'
import { AiOutlineFile, AiOutlineSend } from 'react-icons/ai'
// import PageHeader from '../../../Widgets/PageHeader.js'
import { useDropzone } from 'react-dropzone';
import moment from 'moment'

import '../../../Styles/Modules/TicketChat.scss'
import SocketContext from '../../../Contexts/Socket'
import { getSign } from '../../../Contexts/Params'
import SocketIOFileClient from 'socket.io-file-client'

const { Text, Title, Paragraph } = Typography
const { Option } = NativeSelect


export default function ({ ticket_id }) {

  const params = getSign()
  const socket = useContext(SocketContext)

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

    socket.on("chat/messages", getChat)
    socket.on("cliente/chat/message", addMessage)

    socket.emit("cliente/chat", { ticket_id, ...params })

    let uploader = new SocketIOFileClient(socket);

    uploader.on('stream', (file) => {
      // let { filesUploaded } = this.state
      // filesUploaded[file.uploadId].progress = (file.size / file.sent) * 100
      // this.setState({ filesUploaded })
    })
    uploader.on('complete', (file) => {
      // let { filesUploaded } = this.state
      // filesUploaded[file.uploadId].progress = 100
      // filesUploaded[file.uploadId].filename = file.name
      // this.setState({ filesUploaded })
    })
    uploader.on('error', function (err) {
      // console.log('Error!', err);
      // message.error("No fue posible subir el archivo")
    })
    uploader.on('abort', function (fileInfo) {
      // console.log('Aborted: ', fileInfo);
      // message.error("El proceso fue abortado")
    })
    cUploader = uploader


    return () => {
      document.removeEventListener('keyup', keyUp);
      document.removeEventListener('keydown', keyDown);

      socket.removeListener('cliente/chat')
      socket.removeListener('cliente/chat/messages')
      socket.removeListener('cliente/chat/message')
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
          {Boolean(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/.test(e.file)) ? <Image style={{ maxWidth: 200 }}
            // src={axios.defaults.baseURL + "/upload/customer-chat/" + e.file}
            className="mb-1" /> : <Button size="small" target="_blank" download href={axios.defaults.baseURL + "/upload/customer-chat/" + e.file} block >{e.name}</Button>}
        </div>
      })}
    </div>
  }

  return <div style={{ width: 300, minHeight: 580, position: "relative", flexDirection: 'column', padding: "6px 7px" }} {...getRootProps()}>
    <Layout className='chat-layout'>
      {messages.data.map(e => renderMessage(e))}
    </Layout>
    <div className='form-chat' >
      <input {...getInputProps()} />
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
          !inputRef?.current?.click()
      }} />
      <AiOutlineSend className="send-message" />
      {<div className='drop-area' style={{ display: isDragAccept ? "flex" : "none" }}>
        <AiOutlineFile style={{ fontSize: 36, display: "block", margin: "0 auto" }} />
        <Text className='title'>Arrastre los archivos a esta área</Text>
      </div>}
    </div>
  </div>

}