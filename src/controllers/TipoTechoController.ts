import axios from 'axios';
import { TipoTechoInterface  } from '../models/TipoTechoModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/tipotecho/";

export const getAllTipoTecho = async (): Promise<TipoTechoInterface[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export const getTipoTechoById = async (id: string): Promise<TipoTechoInterface> => {
    const response = await axios.get(`${baseUrl}${id}`);
    return response.data;
};