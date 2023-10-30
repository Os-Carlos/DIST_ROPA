import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Typography, Space } from 'antd';
import axios from 'axios';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons'

const Inventario = () => {
    const apiUrl = 'https://dist-ropa-api.onrender.com/inventarios/';
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [createForm] = Form.useForm();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deletingRecord, setDeletingRecord] = useState(null);
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        axios.get(apiUrl)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
        setLoading(false);
    }, []);

    //peticion put
    const handleEdit = (record) => {

        setSelectedRow(record);
        setModalVisible(true);
    };
    const handleSave = (editedData) => {
        axios.put(apiUrl + editedData.id_inventario, editedData)
            .then(() => {
                const updatedData = data.map(item =>
                    item.id_inventario === editedData.id_inventario ? editedData : item
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
            axios.delete(apiUrl + deletingRecord.id_inventario)
                .then(() => {
                    // Actualizar la lista de datos después de eliminar el registro
                    setData(data.filter(item => item.id_inventario !== deletingRecord.id_inventario));
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
        { title: 'Fecha', dataIndex: 'fecha', key: 'fecha', },
        { title: 'Inventario', dataIndex: 'id_producto', key: 'id_producto', },
        { title: 'Sucursal', dataIndex: 'id_sucursal', key: 'id_sucursal', },
        { title: 'Stock', dataIndex: 'stock', key: 'stock', },
        { title: 'Precio Venta', dataIndex: 'precio_venta', key: 'precio_venta', },
        { title: 'Precio Compra', dataIndex: 'precio_compra', key: 'precio_compra', },
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
                <Typography style={{ fontSize: "25px" }}>Inventario</Typography>
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
                rowKey="id_inventario"
                pagination={false}
                loading={loading}
            />

            <Modal
                title="Editar Inventario"
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
                    <Form.Item name='fecha' label="Rut" style={{ marginBottom: 10 }}>
                        <Input value={selectedRow?.fecha} onChange={e => setSelectedRow({ ...selectedRow, fecha: e.target.value })} />
                    </Form.Item >

                    <Space size={'large'}>
                        <Form.Item name="id_producto" label="Proveedor" style={{ marginBottom: 10, width: 300 }}>
                            <Input value={selectedRow?.id_producto} onChange={e => setSelectedRow({ ...selectedRow, id_producto: e.target.value })} />
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
                title="Agregar Inventario"
                open={createModalVisible}
                onOk={handleCreateSubmit}
                onCancel={() => {
                    createForm.resetFields();
                    setCreateModalVisible(false);
                }}
            >
                <Form form={createForm} requiredMark={false} layout='vertical'>
                    <Space size={'large'}>

                        <Form.Item
                            name="id_sucursal"
                            label="Sucursal"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ marginBottom: 10, width: 300 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="fecha"
                            label="Fecha"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input type='date' />
                        </Form.Item>
                    </Space>

                    <Form.Item
                        name="id_producto"
                        label="Producto"
                        rules={[
                            {
                                required: true,

                            },
                        ]}
                        style={{ marginBottom: 10, width: 300 }}
                    >
                        <Input />
                    </Form.Item>

                    <Space size={'small'}>
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

                        <Form.Item
                            name="precio_compra"
                            label="Precio Compra"
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

export default Inventario;
