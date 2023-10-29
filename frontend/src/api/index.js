// api.js
import axios from 'axios';

const baseURL = 'http://localhost:4000'; // Reemplaza con la URL de tu API

export async function getDepartamentos() {
    try {
        const response = await axios.get(`${baseURL}/departamentos`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getMunicipios(depto) {
    try {
        const response = await axios.get(`${baseURL}/departamentos/${depto}/municipios`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
