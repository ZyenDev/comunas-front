import axios from 'axios';
import { TipoOcupacionViviendaInterface } from '../models/TipoOcupacionViviendaModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/tipoocupacionvivienda/";

export const createTipoOcupacionVivienda = async (tipoOcupacionVivienda: TipoOcupacionViviendaInterface): Promise<TipoOcupacionViviendaInterface> => {
    const response = await axios.post(baseUrl, tipoOcupacionVivienda);
    return response.data;
};

export const updateTipoOcupacionVivienda = async (id: number , tipoOcupacionVivienda: TipoOcupacionViviendaInterface): Promise<TipoOcupacionViviendaInterface> => {
    const response = await axios.put(`${baseUrl}${id}`, tipoOcupacionVivienda);
    return response.data;
};

export const getAllTipoOcupacionViviendas = async (): Promise<TipoOcupacionViviendaInterface[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export const getTipoOcupacionViviendaById = async (id: string): Promise<TipoOcupacionViviendaInterface> => {
    const response = await axios.get(`${baseUrl}${id}`);
    return response.data;
};
