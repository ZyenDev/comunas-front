import axios from 'axios';
import { ViviendaInterface } from '../models/ViviendaModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/vivienda";

export const createVivienda = async (comuna: ViviendaInterface, token: string): Promise<ViviendaInterface> => {
    const response = await axios.post<ViviendaInterface>(baseUrl+'/', comuna, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getAllVivienda = async (token: string): Promise<ViviendaInterface[]> => {
    const response = await axios.get<ViviendaInterface[]>(baseUrl, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getViviendaById = async (id: number, token: string): Promise<ViviendaInterface> => {
    const response = await axios.get<ViviendaInterface>(`${baseUrl}/${id}/`, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const updateVivienda = async (id: number, comuna: ViviendaInterface, token: string): Promise<ViviendaInterface> => {
    const response = await axios.put<ViviendaInterface>(`${baseUrl}/${id}/`, comuna, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const deleteVivienda = async (id: number, token: string): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}/`, { headers: { Authorization: `token ${token}` } });
};