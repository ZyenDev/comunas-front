import axios from 'axios';
import { TipoTechoInterface  } from '../models/TipoTechoModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/tipotecho/";

export const getAllTipoTecho = async (token: string): Promise<TipoTechoInterface[]> => {
    const response = await axios.get<TipoTechoInterface[]>(baseUrl, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getTipoTechoById = async (id: string, token: string): Promise<TipoTechoInterface> => {
    const response = await axios.get<TipoTechoInterface>(`${baseUrl}${id}`, { headers: { Authorization: `token ${token}` } });
    return response.data;
};