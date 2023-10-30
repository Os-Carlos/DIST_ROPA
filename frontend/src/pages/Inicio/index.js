import React from 'react'
import { Image } from 'antd'

export default function Inicio() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 1140 }}>
            <h2> No está al 100</h2>

            <Image
                width={400}
                src='https://zgcgkizkfhatmwkijhpw.supabase.co/storage/v1/object/public/docs_empresa/kafnlkfls.jpg'></Image>
        </div>
    )
}
