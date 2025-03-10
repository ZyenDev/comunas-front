import axios from 'axios';
import { UbicacionInterface } from '../models/UbicacionModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/ubicaciones/ubicacion";

export const getAllUbicaciones = async (token: string): Promise<UbicacionInterface[]> => {
    const response = await axios.get<UbicacionInterface[]>(baseUrl, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getUbicacionById = async (id: string, token: string): Promise<UbicacionInterface> => {
    const response = await axios.get<UbicacionInterface>(`${baseUrl}${id}`, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const createUbicacion = async (ubicacion: UbicacionInterface, token: string): Promise<UbicacionInterface> => {
    const response = await axios.post<UbicacionInterface>(baseUrl+'/', ubicacion, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};