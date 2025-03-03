import axios from 'axios';
import { ConsejoComunalInterface } from '../models/ConsejoComunalModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/comunidades/consejoscomunales";

export const createConsejoComunal = async (comuna: ConsejoComunalInterface): Promise<ConsejoComunalInterface> => {
    const response = await axios.post<ConsejoComunalInterface>(baseUrl+'/', comuna);
    return response.data;
};

export const getAllConsejoComunal = async (): Promise<ConsejoComunalInterface[]> => {
    const response = await axios.get<ConsejoComunalInterface[]>(baseUrl);
    return response.data;
};

export const getConsejoComunalById = async (id: number): Promise<ConsejoComunalInterface> => {
    const response = await axios.get<ConsejoComunalInterface>(`${baseUrl}/${id}/`);
    return response.data;
};

export const updateConsejoComuna = async (id: number, comuna: ConsejoComunalInterface): Promise<ConsejoComunalInterface> => {
    const response = await axios.put<ConsejoComunalInterface>(`${baseUrl}/${id}/`, comuna);
    return response.data;
};

export const deleteConsejoComunal = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}/`);
};
