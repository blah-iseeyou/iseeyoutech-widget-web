import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Button, Input, Layout, NativeSelect, Typography, Form, Textarea, Tag, Notification, Loader } from 'tiny-ui'
import { useDropzone } from 'react-dropzone'
import { AiOutlineClose, AiOutlineFile } from 'react-icons/ai'


import Socket from '../../../Contexts/Socket'
import { getSign } from '../../../Contexts/Params'

const { Text, Paragraph } = Typography

const { Option } = NativeSelect

function Upload({ children, getInputProps, acceptedFiles, inputRef, removeFile }) {
    
    return <>

        <Button type='button' size='sm' btnType='primary' onClick={() => !inputRef?.current?.click()}>Subir Evidencias</Button>
        <div style={{
            flexWrap: 'wrap',
            display: 'flex',
            gap: '0px'
        }}>
            {acceptedFiles?.map((file, index) => {

                let fileSplit = file.name.split(".")

                let shortname = fileSplit[0]?.substring(0, 15)
                let extension

                if (fileSplit.length > 0)
                    extension = fileSplit[fileSplit.length - 1]
                else
                    extension = ""
                return <Tag key={index} style={{ marginTop: 4 }}>{shortname}{(file.name.length > 15) ? "... " : ""}.{extension} <AiOutlineClose onClick={removeFile(file)} /></Tag>
            })}
        </div>

    </>
}

export default function ({ setView }) {

    const [evidencias, setEvidencias] = useState([])
    const params = getSign()

    const onDrop = useCallback(acceptedFiles => setEvidencias([...evidencias, ...acceptedFiles]), [evidencias])

    const socket = useContext(Socket)

    const { getRootProps, getInputProps, isDragAccept, inputRef, acceptedFiles, } = useDropzone({
        noClick: true,
        multiple: true,
        onDrop,
        
    })
    const [loading, setLoading] = useState(false)

    const removeFile = file => () => {
        const newFiles = [...evidencias]
        newFiles.splice(newFiles.indexOf(file), 1)
        setEvidencias(newFiles)
    }


    const onFinish = (values) => {
        console.log("values", values)
        setLoading(true)
        socket.emit("cliente/tickets/add", {
            ...values,
            evidencias: evidencias?.map(e => ({ name: e.name, buffer: e })),
            ...params,
        })
    }

    useEffect(() => {
        socket.on("cliente/tickets/add-success", () => {
            Notification.success({
                title: 'Ticket Creado',
                placement: "bottomRight",
            })
            setView("list")
        })
        socket.on("cliente/tickets/add-error", () => {
            Notification.error({
                title: 'Ticket Creado',
                placement: "bottomRight",
            })
        })
        return () => {
            socket.removeEventListener("cliente/tickets/add-success")
            socket.removeEventListener("cliente/tickets/add-error")
        }
    }, [])

    return <Form
        onFinish={onFinish}
        layout='vertical'
        style={{ width: 300, minHeight: 580, position: "relative", display: "flex", flexDirection: 'column', padding: "6px 7px" }} {...getRootProps()}>
        <input {...getInputProps()} />
        <Layout style={{ flex: 1, display: "flex", flexDirection: 'column' }}>

            <Form.Item
                name="asunto"
                label="Ingrese el problema o inconveniente"
                rules={[{
                    required: true,
                    message: "Debe indicar el asunto"
                }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="descripcion"
                label="Describa detalladamente el problema"
                rules={[
                    {
                        required: true,
                        message: "Indique la descripción del problema"
                    }
                ]}
            >
                <Textarea placeholder='No puedo indicar el monto de la transacción, marca error.' style={{ resize: 'none' }} />
            </Form.Item>
            <Form.Item
                name="evidencias"
                label="Agregue evidencia del problema">
                <Upload acceptedFiles={evidencias} inputRef={!inputRef} removeFile={removeFile} />
            </Form.Item>
            <Form.Item
                label={<>Indique los pasos que hay que seguir para <br /> reproducir el problema </>}
                name="pasos_reproduccion"
            >
                <Textarea placeholder='Voy a transacciones, indico el monto al agregar y falla.' style={{ resize: 'none' }} />
            </Form.Item>
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username' }]}>
                <NativeSelect className='native-select' size='small' placement='topRight' >
                    <Option value={1} >Aplicación Web</Option>
                    <Option value={2}>Apple (iOS)</Option>
                    <Option value={3}>Google (Android App)</Option>
                    <Option value={4}>Aplicación de Escritorio (Mac / Windows)</Option>
                </NativeSelect>
            </Form.Item>

        </Layout>
        <Button type='submit' btnType="danger" style={{ width: "100%" }}>Guardar Ticket</Button>
        {<div className='drop-area' style={{ display: isDragAccept ? "flex" : "none" }}>
            <AiOutlineFile style={{ fontSize: 36, display: "block", margin: "0 auto" }} />
            <Text className='title'>Arrastre los archivos a esta área</Text>
        </div>}

        {loading && <div className='drop-area' style={{ display: "flex" }}>
            <Loader />
            <Text className='title'>Guardando</Text>
        </div>}
    </Form>

}

