import axios from 'axios';
import { ViviendaInterface } from '../models/ViviendaModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/vivienda";

export const createVivienda = async (comuna: ViviendaInterface): Promise<ViviendaInterface> => {
    const response = await axios.post<ViviendaInterface>(baseUrl+'/', comuna);
    return response.data;
};

export const getAllVivienda = async (): Promise<ViviendaInterface[]> => {
    const response = await axios.get<ViviendaInterface[]>(baseUrl);
    return response.data;
};

export const getViviendaById = async (id: number): Promise<ViviendaInterface> => {
    const response = await axios.get<ViviendaInterface>(`${baseUrl}/${id}/`);
    return response.data;
};

export const updateVivienda = async (id: number, comuna: ViviendaInterface): Promise<ViviendaInterface> => {
    const response = await axios.put<ViviendaInterface>(`${baseUrl}/${id}/`, comuna);
    return response.data;
};

export const deleteVivienda = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}/`);
};
