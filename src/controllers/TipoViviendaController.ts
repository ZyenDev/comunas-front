import axios from 'axios';
import { TipoViviendaInterface } from '../models/TipoViviendaModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/tipovivienda/";

export const getAllTipoVivienda = async (): Promise<TipoViviendaInterface[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export const getViviendaById = async (id: string): Promise<TipoViviendaInterface> => {
    const response = await axios.get(`${baseUrl}${id}`);
    return response.data;
};

