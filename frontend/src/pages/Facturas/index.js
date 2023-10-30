import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Typography, Space } from 'antd';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons'

const Facturas = () => {
    const apiUrl = 'https://dist-ropa-api.onrender.com/facturas/';
    const [data, setData] = useState([]);
    // const [selectedRow, setSelectedRow] = useState(null);    
    const [createForm] = Form.useForm();
    const [createModalVisible, setCreateModalVisible] = useState(false);

    //peticion post
    const handleCreate = () => {
        setCreateModalVisible(true);
    };
    const handleCreateSubmit = () => {
        createForm.validateFields()
            .then((values) => {
                axios.post(apiUrl, values)
                    .then(response => {
                        setData([...data, response.data]);
                        createForm.resetFields();
                        setCreateModalVisible(false);
                    })
                    .catch(error => {
                        console.error('Error al agregar el registro:', error);
                    });
            })
            .catch(errorInfo => {
                console.log('Falló la validación:', errorInfo);
            });
    };

    //peticion get
    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    //columnas de la tabla
    const columns = [
        { title: 'Numero Factura', dataIndex: 'numero_factura', key: 'numero_factura', },
        { title: 'Cliente', dataIndex: 'id_cliente', key: 'id_cliente', },
        { title: 'Empleado', dataIndex: 'id_empleado', key: 'id_empleado', },
        { title: 'Fecha', dataIndex: 'fecha', key: 'fecha', },
        { title: 'Total', dataIndex: 'total', key: 'total', },
    ];

    //componente principal
    return (
        <div className='div-table'>
            <div className='table-elemnts'>
                <Typography style={{ fontSize: "25px" }}>Facturas</Typography>
                <Button
                    type="primary"
                    onClick={handleCreate}
                    style={{ paddingTop: 5 }}
                >
                    <PlusOutlined style={{ fontSize: "20px", margin: 0 }} />
                </Button>
            </div>
            <Table
                dataSource={data}
                columns={columns}
                rowKey="id_factura"
                pagination={false}
            />

            <Modal
                title="Agregar Factura"
                open={createModalVisible}
                onOk={handleCreateSubmit}
                onCancel={() => {
                    createForm.resetFields();
                    setCreateModalVisible(false);
                }}
            >
                <Form form={createForm} requiredMark={false} layout='vertical'>
                    <Form.Item
                        name="numero_factura"
                        label="Numero Factura"
                        rules={[
                            {
                                required: true,

                            },
                        ]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input />
                    </Form.Item>
                    <Space size={'large'}>
                        <Form.Item
                            name="id_cliente"
                            label="Cliente"
                            rules={[
                                {
                                    required: true,

                                },
                            ]}
                            style={{ marginBottom: 10, width: 224 }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="id_empleado"
                            label="Empleado"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ marginBottom: 10, width: 224 }}
                        >
                            <Input />
                        </Form.Item>
                    </Space>
                </Form>
            </Modal>
        </div>
    );
};

export default Facturas;
