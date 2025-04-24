import axios from 'axios';
import { HabitanteInterface } from '../models/HabitanteModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/habitantes/habitante";

export const createHabitante = async (habitante: HabitanteInterface, token: string): Promise<HabitanteInterface> => {
    const response = await axios.post<HabitanteInterface>(baseUrl + "/", habitante, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getHabitanteByID = async (id: number, token: string): Promise<HabitanteInterface> => {
    const response = await axios.get<HabitanteInterface>(`${baseUrl}/${id}/`, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getAllHabitantes = async (token: string): Promise<HabitanteInterface[]> => {
    const response = await axios.get<HabitanteInterface[]>(apiUrl+"api/habitantes/habitante/", { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const getHabitanteByViviendaID = async (id: number, token: string): Promise<HabitanteInterface[]> => {
    const response = await axios.get<HabitanteInterface[]>(`${apiUrl}api/habitantes/habitantes/vivienda/${id}/`, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const updateHabitante = async (id: number, habitante: HabitanteInterface, token: string): Promise<HabitanteInterface> => {
    const response = await axios.put<HabitanteInterface>(`${baseUrl}/${id}/`, habitante, { headers: { Authorization: `token ${token}` } });
    return response.data;
};

export const deleteHabitante = async (id: number, token: string): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}/`, { headers: { Authorization: `token ${token}` } });
};