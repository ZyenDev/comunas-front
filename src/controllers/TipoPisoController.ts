import axios from 'axios';
import { TipoPisoInterface } from '../models/TipoPisoModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/tipopiso/";

export const getAllTipoPiso = async (token: string): Promise<TipoPisoInterface[]> => {
    const response = await axios.get<TipoPisoInterface[]>(baseUrl, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getTipoPisoById = async (id: string, token: string): Promise<TipoPisoInterface> => {
    const response = await axios.get<TipoPisoInterface>(`${baseUrl}${id}`, { headers: { Authorization: `token ${token}` } });
    return response.data;
};