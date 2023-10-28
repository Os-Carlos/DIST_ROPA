import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
// import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons'
import { PlusOutlined } from '@ant-design/icons'
import Typography from 'antd/es/typography/Typography';

const Facturas = () => {
    const apiUrl = 'http://localhost:4000/facturas/';
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
    //     axios.put(apiUrl + editedData.Facturas, editedData)
    //         .then(() => {
    //             const updatedData = data.map(item =>
    //                 item.Facturas === editedData.Facturas ? editedData : item
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
    //         axios.delete(apiUrl + deletingRecord.Facturas)
    //             .then(() => {
    //                 // Actualizar la lista de datos después de eliminar el registro
    //                 setData(data.filter(item => item.Facturas !== deletingRecord.Facturas));
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
        // { title: 'ID Pedido', dataIndex: 'Facturas', key: 'Facturas', },
        { title: 'Numero Factura', dataIndex: 'numero_factura', key: 'numero_factura', },
        { title: 'ID Cliente', dataIndex: 'id_cliente', key: 'id_cliente', },
        { title: 'ID Empleado', dataIndex: 'id_empleado', key: 'id_empleado', },
        { title: 'Fecha', dataIndex: 'fecha_hora', key: 'fecha_hora', },
        { title: 'Total', dataIndex: 'total', key: 'total', },
        // {
        //     title: 'Acciones',
        //     key: 'acciones',
        //     render: (record) => (
        //         <div>
        //             <EditFilled
        //                 onClick={() => handleEdit(record)}
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
                <Button type="primary" onClick={handleCreate} style={{ paddingTop: 5 }}><PlusOutlined style={{ fontSize: "20px", margin: 0 }} /></Button>
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
                onCancel={() => setModalVisible(false)}
            >
                <Form initialValues={selectedRow}>
                    <Form.Item name="numero_factura" label="Numero Factura">
                        <Input value={selectedRow?.numero_factura} onChange={e => setSelectedRow({ ...selectedRow, numero_factura: e.target.value })} />
                    </Form.Item>
                    <Form.Item name="id_cliente" label="ID Cliente">
                        <Input value={selectedRow?.id_cliente} onChange={e => setSelectedRow({ ...selectedRow, id_cliente: e.target.value })} />
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
                <Form form={createForm} layout='vertical'>
                    <Form.Item
                        name="numero_factura"
                        label="Numero Factura"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa el numero de factura',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="id_cliente"
                        label="ID Cliente"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa el id del cliente',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="id_empleado"
                        label="ID Empleado"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa el id del empleado',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        name="fecha_hora"
                        label="Fecha"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa la fecha',
                            },
                        ]}
                    >
                        <Input type='date' />
                    </Form.Item>
                    <Form.Item
                        name="total"
                        label="Total"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item> */}
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
