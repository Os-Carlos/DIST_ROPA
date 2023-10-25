import React from 'react'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
    const navigate = useNavigate();

    const menuItems = [
        { label: "Inicio", key: "/" },
        { label: "Empleados", key: "/empleados" },
        { label: "Clientes", key: "/clientes" },
        { label: "Proveedores", key: "/proveedores" },
        { label: "Productos", key: "/productos" }
    ]

    return (
        <div className='SideBar'>
            <Menu
                onClick={(item) => {
                    navigate(item.key);
                }}
                items={menuItems}></Menu>
        </div>
    )
}
