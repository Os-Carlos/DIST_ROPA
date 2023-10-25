import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Inicio from '../../pages/Inicio'
import Empleados from '../../pages/Empleados'
import Clientes from '../../pages/Clientes'
import Proveedores from '../../pages/Proveedores'
import Productos from '../../pages/Inicio'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Inicio />}></Route>
            <Route path='/empleados' element={<Empleados />}></Route>
            <Route path='/clientes' element={<Clientes />}></Route>
            <Route path='/proveedores' element={<Proveedores />}></Route>
            <Route path='/productos' element={<Productos />}></Route>
        </Routes>
    )
}
