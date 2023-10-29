import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Typography, Space } from 'antd';
import axios from 'axios';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons'

const Sucursales = () => {
    const apiUrl = 'https://dist-ropa-api.onrender.com/sucursales/';
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
        axios.put(apiUrl + editedData.id_sucursal, editedData)
            .then(() => {
                const updatedData = data.map(item =>
                    item.id_sucursal === editedData.id_sucursal ? editedData : item
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
            axios.delete(apiUrl + deletingRecord.id_sucursal)
                .then(() => {
                    // Actualizar la lista de datos después de eliminar el registro
                    setData(data.filter(item => item.id_sucursal !== deletingRecord.id_sucursal));
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
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', },
        { title: 'Horario', dataIndex: 'horario', key: 'horario', },
        { title: 'Teléfono', dataIndex: 'telefono', key: 'telefono', },
        { title: 'Dirección', dataIndex: 'direccion', key: 'direccion', },
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
                <Typography style={{ fontSize: "25px" }}>Sucursales</Typography>
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
                rowKey="id_sucursal"
                pagination={false}
            />

            <Modal
                title="Editar Sucursal"
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
                    <Form.Item name="nombre" label="Nombre" style={{ marginBottom: 10 }}>
                        <Input value={selectedRow?.nombre} onChange={e => setSelectedRow({ ...selectedRow, nombre: e.target.value })} />
                    </Form.Item>

                    <Space size={'large'}>
                        <Form.Item name="horario" label="Horario" style={{ marginBottom: 10, width: 224 }}>
                            <Input value={selectedRow?.horario} onChange={e => setSelectedRow({ ...selectedRow, horario: e.target.value })} />
                        </Form.Item>
                        <Form.Item name="telefono" label="Teléfono" style={{ marginBottom: 10, width: 224 }}>
                            <Input value={selectedRow?.telefono} onChange={e => setSelectedRow({ ...selectedRow, telefono: e.target.value })} />
                        </Form.Item>
                    </Space>

                    <Form.Item name="direccion" label="Dirección" style={{ marginBottom: 10 }}>
                        <Input value={selectedRow?.direccion} onChange={e => setSelectedRow({ ...selectedRow, direccion: e.target.value })} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Agregar Sucursal"
                open={createModalVisible}
                onOk={handleCreateSubmit}
                onCancel={() => {
                    createForm.resetFields();
                    setCreateModalVisible(false);
                }}
            >
                <Form form={createForm} requiredMark={false} layout='vertical'>
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa el nombre del sucursal',
                            },
                        ]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input />
                    </Form.Item>

                    <Space size={'large'}>
                        <Form.Item
                            name="horario"
                            label="Horario"
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
                            name="telefono"
                            label="Teléfono"
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

                    <Form.Item
                        label="Dirección"
                        name="direccion"
                        style={{ marginBottom: 10 }}
                    >
                        <Input placeholder='Direccion Exacta' />
                    </Form.Item>

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

export default Sucursales;
