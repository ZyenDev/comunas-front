import axios from 'axios';
import { SituacionViviendaInterface } from '../models/SituacionVivienda';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/viviendas/situacionvivienda/";

export const getAllSituacionVivienda = async (): Promise<SituacionViviendaInterface[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export const getSituacionViviendaById = async (id: string): Promise<SituacionViviendaInterface> => {
    const response = await axios.get(`${baseUrl}${id}`);
    return response.data;
};