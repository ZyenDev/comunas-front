import axios from 'axios';
import { HabitanteInterface } from '../models/HabitanteModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/habitantes/habitante";

export const createHabitante = async (habitante: HabitanteInterface): Promise<HabitanteInterface> => {
    const response = await axios.post<HabitanteInterface>(baseUrl+"/", habitante);
    return response.data;
};

export const getHabitanteByID = async (id: number): Promise<HabitanteInterface> => {
    const response = await axios.get<HabitanteInterface>(`${baseUrl}/${id}/`);
    return response.data;
};

export const getAllHabitantes = async (): Promise<HabitanteInterface[]> => {
    const response = await axios.get<HabitanteInterface[]>(baseUrl);
    return response.data;
};

export const getHabitanteByViviendaID = async (id: number): Promise<HabitanteInterface[]> => {
    const response = await axios.get<HabitanteInterface>(`${baseUrl}/${id}/`);
    return response.data;
};


export const updateHabitante = async (id: number, habitante: HabitanteInterface): Promise<HabitanteInterface> => {
    const response = await axios.put<HabitanteInterface>(`${baseUrl}/${id}/`, habitante);
    return response.data;
};

export const deleteHabitante = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}/`);
};