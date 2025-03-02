import axios from 'axios';
import { TipoParedInteface  } from '../models/TipoParedModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/tipopared/";

export const getAllTipoPared = async (): Promise<TipoParedInteface[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export const getTipoParedById = async (id: string): Promise<TipoParedInteface> => {
    const response = await axios.get(`${baseUrl}${id}`);
    return response.data;
};