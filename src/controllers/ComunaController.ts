import axios from 'axios';
import { ComunaInterface } from '../models/ComunaModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/comunidades/comunas";

export const createComuna = async (comuna: ComunaInterface, token: string): Promise<ComunaInterface> => {
    const response = await axios.post<ComunaInterface>(baseUrl + "/", comuna, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};

export const getComunaByID = async (id: number, token: string): Promise<ComunaInterface> => {
    const response = await axios.get<ComunaInterface>(`${baseUrl}/${id}/`, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};

export const getAllComunas = async (token: string): Promise<ComunaInterface[]> => {
    const response = await axios.get<ComunaInterface[]>(baseUrl, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};

export const updateComuna = async (id: number, comuna: ComunaInterface, token: string): Promise<ComunaInterface> => {
    const response = await axios.put<ComunaInterface>(`${baseUrl}/${id}/`, comuna, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};

export const deleteComuna = async (id: number, token: string): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}/`, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
};

