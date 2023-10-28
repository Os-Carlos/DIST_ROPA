import React from 'react'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HomeFilled } from '@ant-design/icons';

export default function SideBar() {
    const navigate = useNavigate();

    const menuItems = [
        { label: "Inicio", key: "/", icon: <HomeFilled style={{ fontSize: "18px" }} /> },
        {
            label: "Ventas", children: [
                { label: "Clientes", key: "/clientes" },
                { label: "Pedidos", key: "/pedidos" },
                { label: "Facturas", key: "/facturas" }
            ]
        },
        {
            label: "Productos", children: [
                { label: "Productos", key: "/productos" },
                { label: "Proveedores", key: "/proveedores" },
                { label: "Inventario", key: "/inventario" },
                { label: "Compras", key: "/compras" }
            ]
        },
        {
            label: "Negocio", children: [
                { label: "Empleados", key: "/empleados" },
                { label: "Sucursales", key: "/sucursales" },
            ]
        }
    ]

    return (
        <div className='SideBar'>
            <Menu
                mode='inline'
                onClick={(item) => { navigate(item.key); }}
                items={menuItems}
                style={{ backgroundColor: "transparent", color: "#fff" }}

            />
        </div>
    )
}
