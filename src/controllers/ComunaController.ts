import axios from 'axios';
import { ComunaInterface } from '../models/ComunaModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/comunidades/comunas";

export const createComuna = async (comuna: ComunaInterface): Promise<ComunaInterface> => {
    const response = await axios.post<ComunaInterface>(baseUrl, comuna);
    return response.data;
};

export const getComunaByID = async (id: number): Promise<ComunaInterface> => {
    const response = await axios.get<ComunaInterface>(`${baseUrl}/${id}/`);
    return response.data;
};

export const getAllComunas = async (): Promise<ComunaInterface[]> => {
    const response = await axios.get<ComunaInterface[]>(baseUrl);
    return response.data;
};

export const updateComuna = async (id: number, comuna: ComunaInterface): Promise<ComunaInterface> => {
    const response = await axios.put<ComunaInterface>(`${baseUrl}/${id}/`, comuna);
    return response.data;
};

export const deleteComuna = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}/`);
};
