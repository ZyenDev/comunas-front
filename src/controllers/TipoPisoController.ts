import axios from 'axios';
import { TipoPisoInterface } from '../models/TipoPisoModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/tipopiso/";

export const getAllTipoPiso = async (): Promise<TipoPisoInterface[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export const getTipoPisoById = async (id: string): Promise<TipoPisoInterface> => {
    const response = await axios.get(`${baseUrl}${id}`);
    return response.data;
};