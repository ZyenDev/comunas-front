import axios from 'axios';
import { TipoParedInteface  } from '../models/TipoParedModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/tipopared/";
export const getAllTipoPared = async (token: string): Promise<TipoParedInteface[]> => {
    const response = await axios.get<TipoParedInteface[]>(baseUrl, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getTipoParedById = async (id: string, token: string): Promise<TipoParedInteface> => {
    const response = await axios.get<TipoParedInteface>(`${baseUrl}${id}`, { headers: { Authorization: `token ${token}` } });
    return response.data;
};