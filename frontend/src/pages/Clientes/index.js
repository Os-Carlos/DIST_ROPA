import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Typography } from 'antd';
import axios from 'axios';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons'

const Clientes = () => {
    const apiUrl = 'http://localhost:4000/clientes/';
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
        axios.put(apiUrl + editedData.id_cliente, editedData)
            .then(() => {
                const updatedData = data.map(item =>
                    item.id_cliente === editedData.id_cliente ? editedData : item
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
            axios.delete(apiUrl + deletingRecord.id_cliente)
                .then(() => {
                    // Actualizar la lista de datos después de eliminar el registro
                    setData(data.filter(item => item.id_cliente !== deletingRecord.id_cliente));
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
        // { title: 'ID Cliente', dataIndex: 'id_cliente', key: 'id_cliente', },
        { title: 'RUT', dataIndex: 'rut', key: 'rut', },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', },
        { title: 'Razón Social', dataIndex: 'razon_social', key: 'razon_social', },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (record) => (
                <div>
                    <EditFilled
                        onClick={() => handleEdit(record)}
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
                <Typography style={{ fontSize: "25px" }}>Clientes</Typography>
                <Button type="primary" onClick={handleCreate} style={{ paddingTop: 5 }}><PlusOutlined style={{ fontSize: "20px", margin: 0 }} /></Button>
            </div>
            <Table
                dataSource={data}
                columns={columns}
                rowKey="id_cliente"
                pagination={false}
            />

            <Modal
                title="Editar Cliente"
                open={modalVisible}
                onOk={() => handleSave(selectedRow)}
                onCancel={() => setModalVisible(false)}
            >
                <Form
                    initialValues={selectedRow}
                    layout='vertical'
                >
                    <Form.Item name="rut" label="Rut">
                        <Input value={selectedRow?.rut} onChange={e => setSelectedRow({ ...selectedRow, rut: e.target.value })} />
                    </Form.Item>
                    <Form.Item name="nombre" label="Nombre">
                        <Input value={selectedRow?.nombre} onChange={e => setSelectedRow({ ...selectedRow, nombre: e.target.value })} />
                    </Form.Item>
                    <Form.Item name="razon_social" label="Razón Social">
                        <Input value={selectedRow?.razon_social} onChange={e => setSelectedRow({ ...selectedRow, razon_social: e.target.value })} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Agregar Cliente"
                open={createModalVisible}
                onOk={handleCreateSubmit}
                onCancel={() => {
                    createForm.resetFields();
                    setCreateModalVisible(false);
                }}
            >
                <Form form={createForm} requiredMark={false} layout='vertical'>
                    <Form.Item
                        name="rut"
                        label="RUT"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa el RUT del cliente',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa el nombre del cliente',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="razon_social"
                        label="Razón Social"
                    >
                        <Input />
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

export default Clientes;
