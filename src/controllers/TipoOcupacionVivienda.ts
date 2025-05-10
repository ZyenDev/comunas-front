import axios from 'axios';
import { TipoOcupacionViviendaInterface } from '../models/TipoOcupacionViviendaModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/tipoocupacionvivienda/";


export const createTipoOcupacionVivienda = async (tipoOcupacionVivienda: TipoOcupacionViviendaInterface, token: string): Promise<TipoOcupacionViviendaInterface> => {
    console.log(tipoOcupacionVivienda)
    const response = await axios.post<TipoOcupacionViviendaInterface>(baseUrl, tipoOcupacionVivienda, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const updateTipoOcupacionVivienda = async (id: number, tipoOcupacionVivienda: TipoOcupacionViviendaInterface, token: string): Promise<TipoOcupacionViviendaInterface> => {
    const response = await axios.put<TipoOcupacionViviendaInterface>(`${baseUrl}${id}`, tipoOcupacionVivienda, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getAllTipoOcupacionViviendas = async (token: string): Promise<TipoOcupacionViviendaInterface[]> => {
    const response = await axios.get<TipoOcupacionViviendaInterface[]>(baseUrl, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getTipoOcupacionViviendaById = async (id: string, token: string): Promise<TipoOcupacionViviendaInterface> => {
    const response = await axios.get<TipoOcupacionViviendaInterface>(`${baseUrl}${id}`, { headers: { Authorization: `token ${token}` } });
    return response.data;
};