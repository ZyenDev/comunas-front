import axios from 'axios';
import { TipoViviendaInterface } from '../models/TipoViviendaModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/tipovivienda/";

export const getAllTipoVivienda = async (token: string): Promise<TipoViviendaInterface[]> => {
    const response = await axios.get<TipoViviendaInterface[]>(baseUrl, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getViviendaById = async (id: string, token: string): Promise<TipoViviendaInterface> => {
    const response = await axios.get<TipoViviendaInterface>(`${baseUrl}${id}`, { headers: { Authorization: `token ${token}` } });
    return response.data;
};