import React, { useState, useEffect } from 'react';
import { Select, Form } from 'antd';
import { getDepartamentos, getMunicipios } from '../../api/index'


const Compras = () => {
    const [createForm] = Form.useForm();
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);

    useEffect(() => {
        // Llama a las funciones para obtener datos de departamentos y municipios
        getDepartamentos()
            .then(deptos => setDepartamentos(deptos))
            .catch(error => console.error('Error al obtener departamentos:', error));


    }, []);

    return (
        <Form>
            <Form.Item
                name="id_departamento"
                label="Departamento"
                rules={[
                    {
                        required: true,
                        message: 'Por favor seleccione un departamento',
                    },
                ]}
            >
                <Select style={{ width: 200 }}
                    onChange={(value) => {
                        getMunicipios(value)
                            .then(municipiosData => setMunicipios(municipiosData))
                            .catch(error => console.error('Error al obtener municipios:', error));
                    }}>
                    {departamentos.map(depto => (
                        <Select.Option key={depto.id_departamento} value={depto.descripcion}>
                            {depto.descripcion}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="id_municipio"
                label="Municipio"
                rules={[
                    {
                        required: true,
                        message: 'Por favor seleccione un municipio',
                    },
                ]}
            >
                <Select>
                    {municipios
                        // .filter(municipio => (municipio.id_departamento === createForm.getFieldValue('id_departamento')))
                        .map(municipio => (
                            <Select.Option key={municipio.id_municipio} value={municipio.id_municipio}>
                                {municipio.descripcion}
                            </Select.Option>
                        ))}
                </Select>
            </Form.Item>

        </Form>
    );
};
export default Compras;
