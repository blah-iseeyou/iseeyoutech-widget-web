import React from 'react'
// import ReactDOM from 'react-dom/client'

import ReactDOM from 'react-dom';
import App from './App'


// /consol
// console.log("e", import.meta.env)


if (import.meta.env.DEV)
    ReactDOM.render(
        <React.StrictMode>
            <App
                isReady={true}
                email="av@iseeyoutech.com"
                nombre="Juan Alberto Virrey"
                proyectoId="632e04bfb3928934bc432c87"
            />
        </React.StrictMode>,
        document.getElementById('root')
    )
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//       <App
//         email="av@iseeyoutech.com"
//         nombre="Juan Alberto Virrey"
//         proyectoId="632b31b87957e70d98f85999"
//       />
//     </React.StrictMode>
//   )


export default App


