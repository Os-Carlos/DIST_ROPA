import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
import { DeleteFilled, EditFilled } from '@ant-design/icons'

const Clientes = () => {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [createForm] = Form.useForm();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deletingRecord, setDeletingRecord] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/clientes')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const columns = [
        { title: 'ID Cliente', dataIndex: 'id_cliente', key: 'id_cliente', },
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
                        style={{ fontSize: "20px", color: "orange" }}
                    />
                    <DeleteFilled
                        onClick={() => showDeleteConfirm(record)}
                        style={{ fontSize: "20px", color: "red", marginLeft: "20px" }}
                    />
                </div>
            ),
        },
    ];

    const handleEdit = (record) => {
        setSelectedRow(record);
        setModalVisible(true);
    };

    const showDeleteConfirm = (record) => {
        setDeleteConfirmVisible(true);
        setDeletingRecord(record);
    };

    const handleDelete = () => {
        // Cerrar la alerta de confirmación
        setDeleteConfirmVisible(false);

        // Eliminar el registro
        if (deletingRecord) {
            axios.delete(`http://localhost:4000/clientes/${deletingRecord.id_cliente}`)
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

    const handleSave = (editedData) => {
        axios.put(`http://localhost:4000/clientes/${editedData.id_cliente}`, editedData)
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

    const handleCreate = () => {
        setCreateModalVisible(true);
    };

    const handleCreateSubmit = () => {
        createForm.validateFields()
            .then((values) => {
                axios.post('http://localhost:4000/clientes', values)
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

    return (
        <div className='div-table'>
            <Button type="primary" onClick={handleCreate}>Agregar Cliente</Button>
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
                <Form initialValues={selectedRow}>
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
                <Form form={createForm}>
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
            ></Modal>
        </div>
    );
};

export default Clientes;
