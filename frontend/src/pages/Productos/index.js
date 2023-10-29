import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Typography, Space } from 'antd';
import axios from 'axios';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons'

const Productos = () => {
    const apiUrl = 'https://dist-ropa-api.onrender.com/productos/';
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [createForm] = Form.useForm();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deletingRecord, setDeletingRecord] = useState(null);

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

    //peticion put
    const handleEdit = (record) => {

        setSelectedRow(record);
        setModalVisible(true);
    };
    const handleSave = (editedData) => {
        axios.put(apiUrl + editedData.id_producto, editedData)
            .then(() => {
                const updatedData = data.map(item =>
                    item.id_producto === editedData.id_producto ? editedData : item
                );
                setData(updatedData);
                setModalVisible(false);
                setSelectedRow(null);

            })
            .catch(error => {
                console.error('Error al guardar los cambios:', error);
            });
    };

    //peticion delete
    const showDeleteConfirm = (record) => {
        setDeleteConfirmVisible(true);
        setDeletingRecord(record);
    };
    const handleDelete = () => {
        // Cerrar la alerta de confirmación
        setDeleteConfirmVisible(false);

        // Eliminar el registro
        if (deletingRecord) {
            axios.delete(apiUrl + deletingRecord.id_producto)
                .then(() => {
                    // Actualizar la lista de datos después de eliminar el registro
                    setData(data.filter(item => item.id_producto !== deletingRecord.id_producto));
                })
                .catch(error => {
                    console.error('Error al eliminar el registro:', error);
                });
        }
    };
    const handleCancelDelete = () => {
        // Cancelar la eliminación y cerrar la alerta de confirmación
        setDeleteConfirmVisible(false);
        setDeletingRecord(null);
    }

    //columnas de la tabla
    const columns = [
        { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion', },
        { title: 'Proveedor', dataIndex: 'id_proveedor', key: 'id_proveedor', },
        { title: 'Precio Venta', dataIndex: 'precio_venta', key: 'precio_venta', },
        { title: 'Stock', dataIndex: 'stock', key: 'stock', },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (record) => (
                <div>
                    <EditFilled
                        onClick={() => { handleEdit(record) }}
                        style={{ fontSize: "20px", color: "#e67700" }}
                    />
                    <DeleteFilled
                        onClick={() => showDeleteConfirm(record)}
                        style={{ fontSize: "20px", color: "#dc3545", marginLeft: "20px" }}
                    />
                </div>
            ),
        },
    ];

    //componente principal
    return (
        <div className='div-table'>
            <div className='table-elemnts'>
                <Typography style={{ fontSize: "25px" }}>Productos</Typography>
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
                rowKey="id_producto"
                pagination={false}
            />

            <Modal
                title="Editar Producto"
                open={modalVisible}
                onOk={() => handleSave(selectedRow)}
                onCancel={() => { setModalVisible(false); }}
                destroyOnClose
            >
                <Form
                    initialValues={selectedRow}
                    layout='vertical'
                    preserve={false}
                >
                    <Form.Item name='descripcion' label="Rut" style={{ marginBottom: 10 }}>
                        <Input value={selectedRow?.descripcion} onChange={e => setSelectedRow({ ...selectedRow, descripcion: e.target.value })} />
                    </Form.Item >

                    <Space size={'large'}>
                        <Form.Item name="id_proveedor" label="Proveedor" style={{ marginBottom: 10, width: 300 }}>
                            <Input value={selectedRow?.id_proveedor} onChange={e => setSelectedRow({ ...selectedRow, id_proveedor: e.target.value })} />
                        </Form.Item>
                        <Form.Item name="precio_venta" label="Precio Venta" style={{ marginBottom: 10 }}>
                            <Input value={selectedRow?.precio_venta} onChange={e => setSelectedRow({ ...selectedRow, precio_venta: e.target.value })} />
                        </Form.Item>
                    </Space>

                    <Space size={'large'}>

                        <Form.Item name="stock" label="Stock" style={{ marginBottom: 10 }}>
                            <Input value={selectedRow?.stock} onChange={e => setSelectedRow({ ...selectedRow, stock: e.target.value })} />
                        </Form.Item>
                    </Space>
                </Form>
            </Modal>

            <Modal
                title="Agregar Producto"
                open={createModalVisible}
                onOk={handleCreateSubmit}
                onCancel={() => {
                    createForm.resetFields();
                    setCreateModalVisible(false);
                }}
            >
                <Form form={createForm} requiredMark={false} layout='vertical'>
                    <Form.Item
                        name="descripcion"
                        label="Descripción"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa el Descripción del producto',
                            },
                        ]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input />
                    </Form.Item>

                    <Space size={'large'}>
                        <Form.Item
                            name="id_proveedor"
                            label="Proveedor"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingresa el id_proveedor del producto',
                                },
                            ]}
                            style={{ marginBottom: 10, width: 300 }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="precio_venta"
                            label="Precio Venta"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>

                    </Space>

                    <Space size={'large'}>

                        <Form.Item
                            name="stock"
                            label="Stock"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                    </Space>

                </Form>
            </Modal>

            <Modal
                title="Esta seguro de querer eliminar este registro?"
                open={deleteConfirmVisible}
                onOk={handleDelete}
                okText="Si"
                okType='danger'
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default Productos;
