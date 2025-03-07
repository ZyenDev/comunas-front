import axios from 'axios';
import { ConsejoComunalInterface } from '../models/ConsejoComunalModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/comunidades/consejoscomunales";

export const createConsejoComunal = async (comuna: ConsejoComunalInterface, token: string): Promise<ConsejoComunalInterface> => {
    const response = await axios.post<ConsejoComunalInterface>(baseUrl+'/', comuna, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};

export const getAllConsejoComunal = async (token: string): Promise<ConsejoComunalInterface[]> => {
    const response = await axios.get<ConsejoComunalInterface[]>(baseUrl, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};

export const getConsejoComunalById = async (id: number, token: string): Promise<ConsejoComunalInterface> => {
    const response = await axios.get<ConsejoComunalInterface>(`${baseUrl}/${id}/`, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};

export const updateConsejoComuna = async (id: number, comuna: ConsejoComunalInterface, token: string): Promise<ConsejoComunalInterface> => {
    const response = await axios.put<ConsejoComunalInterface>(`${baseUrl}/${id}/`, comuna, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};

export const deleteConsejoComunal = async (id: number, token: string): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}/`, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
};
