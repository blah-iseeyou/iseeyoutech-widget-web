import React, { useContext } from "react";


const ProyectoId = React.createContext(null)
// export const SetProyectoId = React.createContext(() => {})

const Email = React.createContext(null)
// export const SetEmail  = React.createContext(null)

const Nombre = React.createContext(null)


const URL_WS = React.createContext(null)


function getSign() {
    
    const proyecto_id = useContext(ProyectoId)
    const email = useContext(Email)
    const nombre = useContext(Nombre)
    
    return { proyecto_id, email, nombre }
}

export { ProyectoId, Email, Nombre, URL_WS, getSign }

