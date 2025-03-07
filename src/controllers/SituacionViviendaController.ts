import axios from 'axios';
import { SituacionViviendaInterface } from '../models/SituacionVivienda';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/situacionvivienda/";

export const getAllSituacionVivienda = async (token: string): Promise<SituacionViviendaInterface[]> => {
    const response = await axios.get<SituacionViviendaInterface[]>(baseUrl, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getSituacionViviendaById = async (id: string, token: string): Promise<SituacionViviendaInterface> => {
    const response = await axios.get<SituacionViviendaInterface>(`${baseUrl}${id}`, { headers: { Authorization: `token ${token}` } });
    return response.data;
};