import React from 'react'
import { Image } from 'antd'

export default function Inicio() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 1140 }}>

            <Image
                width={850}
                preview={false}
                style={{ marginTop: 20 }}
                src='https://zgcgkizkfhatmwkijhpw.supabase.co/storage/v1/object/public/docs_empresa/sales-performance-dashboard.png'></Image>
        </div>
    )
}
