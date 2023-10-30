import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Inicio from '../../pages/Inicio'
import Empleados from '../../pages/Empleados'
import Clientes from '../../pages/Clientes'
import Proveedores from '../../pages/Proveedores'
import Productos from '../../pages/Productos'
import Pedidos from '../../pages/Pedidos'
import Facturas from '../../pages/Facturas'
import Sucursales from '../../pages/Sucursales'
import Compras from '../../pages/Compras'
import Inventario from '../../pages/Inventario'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Inicio />}></Route>
            <Route path='/empleados' element={<Empleados />}></Route>
            <Route path='/clientes' element={<Clientes />}></Route>
            <Route path='/proveedores' element={<Proveedores />}></Route>
            <Route path='/productos' element={<Productos />}></Route>
            <Route path='/pedidos' element={<Pedidos />}></Route>
            <Route path='/facturas' element={<Facturas />}></Route>
            <Route path='/sucursales' element={<Sucursales />}></Route>
            <Route path='/compras' element={<Compras />}></Route>
            <Route path='/inventario' element={<Inventario />}></Route>
        </Routes>
    )
}

