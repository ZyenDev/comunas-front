import axios from 'axios';
import { UbicacionInterface } from '../models/UbicacionModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/ubicaciones/ubicacion/";


export const getAllUbicaciones = async (): Promise<UbicacionInterface[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export const getUbicacionById = async (id: string): Promise<UbicacionInterface> => {
    const response = await axios.get(`${baseUrl}${id}`);
    return response.data;
};