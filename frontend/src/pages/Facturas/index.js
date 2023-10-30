import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Typography, Space } from 'antd';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons'

const Facturas = () => {
    const apiUrl = 'https://dist-ropa-api.onrender.com/facturas/';
    const [data, setData] = useState([]);
    // const [selectedRow, setSelectedRow] = useState(null);
    // const [modalVisible, setModalVisible] = useState(false);
    const [createForm] = Form.useForm();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    // const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    // const [deletingRecord, setDeletingRecord] = useState(null);

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

    // //peticion put
    // const handleEdit = (record) => {

    //     setSelectedRow(record);
    //     setModalVisible(true);
    // };
    // const handleSave = (editedData) => {
    //     axios.put(apiUrl + editedData.id_factura, editedData)
    //         .then(() => {
    //             const updatedData = data.map(item =>
    //                 item.id_factura === editedData.id_factura ? editedData : item
    //             );
    //             setData(updatedData);
    //             setModalVisible(false);
    //             setSelectedRow(null);

    //         })
    //         .catch(error => {
    //             console.error('Error al guardar los cambios:', error);
    //         });
    // };

    // //peticion delete
    // const showDeleteConfirm = (record) => {
    //     setDeleteConfirmVisible(true);
    //     setDeletingRecord(record);
    // };
    // const handleDelete = () => {
    //     // Cerrar la alerta de confirmación
    //     setDeleteConfirmVisible(false);

    //     // Eliminar el registro
    //     if (deletingRecord) {
    //         axios.delete(apiUrl + deletingRecord.id_factura)
    //             .then(() => {
    //                 // Actualizar la lista de datos después de eliminar el registro
    //                 setData(data.filter(item => item.id_factura !== deletingRecord.id_factura));
    //             })
    //             .catch(error => {
    //                 console.error('Error al eliminar el registro:', error);
    //             });
    //     }
    // };
    // const handleCancelDelete = () => {
    //     // Cancelar la eliminación y cerrar la alerta de confirmación
    //     setDeleteConfirmVisible(false);
    //     setDeletingRecord(null);
    // }

    //columnas de la tabla
    const columns = [
        { title: 'Numero Factura', dataIndex: 'numero_factura', key: 'numero_factura', },
        { title: 'Factura', dataIndex: 'id_factura', key: 'id_factura', },
        { title: 'Empleado', dataIndex: 'id_empleado', key: 'id_empleado', },
        { title: 'Fecha', dataIndex: 'fecha', key: 'fecha', },
        { title: 'Total', dataIndex: 'total', key: 'total', },
        // {
        //     title: 'Acciones',
        //     key: 'acciones',
        //     render: (record) => (
        //         <div>
        //             <EditFilled
        //                 onClick={() => { handleEdit(record) }}
        //                 style={{ fontSize: "20px", color: "#e67700" }}
        //             />
        //             <DeleteFilled
        //                 onClick={() => showDeleteConfirm(record)}
        //                 style={{ fontSize: "20px", color: "#dc3545", marginLeft: "20px" }}
        //             />
        //         </div>
        //     ),
        // },
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

            {/* <Modal
                title="Editar Factura"
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
                    <Space size={'large'}>
                        <Form.Item name="id_factura" label="Factura" style={{ marginBottom: 10, width: 300 }}>
                            <Input value={selectedRow?.id_factura} onChange={e => setSelectedRow({ ...selectedRow, id_factura: e.target.value })} />
                        </Form.Item>
                        <Form.Item name='numero_factura' label="Rut" style={{ marginBottom: 10 }}>
                            <Input value={selectedRow?.numero_factura} onChange={e => setSelectedRow({ ...selectedRow, numero_factura: e.target.value })} />
                        </Form.Item >
                    </Space>

                    <Space size={'large'}>
                        <Form.Item name="id_empleado" label="Empleado" style={{ marginBottom: 10, width: 300 }}>
                            <Input value={selectedRow?.id_empleado} onChange={e => setSelectedRow({ ...selectedRow, id_empleado: e.target.value })} />
                        </Form.Item>
                        <Form.Item name="fecha" label="Fecha" style={{ marginBottom: 10 }}>
                            <Input value={selectedRow?.fecha} onChange={e => setSelectedRow({ ...selectedRow, fecha: e.target.value })} />
                        </Form.Item>
                    </Space>

                    <Form.Item name="total" label="Total" style={{ marginBottom: 10 }}>
                        <Input value={selectedRow?.total} onChange={e => setSelectedRow({ ...selectedRow, total: e.target.value })} />
                    </Form.Item>
                </Form>
            </Modal> */}

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
                            label="Factura"
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

            {/* <Modal
                title="Esta seguro de querer eliminar este registro?"
                open={deleteConfirmVisible}
                onOk={handleDelete}
                okText="Si"
                okType='danger'
                onCancel={handleCancelDelete}
            /> */}
        </div>
    );
};

export default Facturas;
