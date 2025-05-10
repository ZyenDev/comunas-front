import axios from 'axios';
import { HabitanteInterface } from '../models/HabitanteModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/habitantes/habitante";

export const createHabitante = async (habitante: HabitanteInterface, token: string): Promise<HabitanteInterface> => {
    console.log(habitante)
    const response = await axios.post<HabitanteInterface>(baseUrl + "/", habitante, { headers: { Authorization: `token ${token}` } });
    try {
        await axios.post(`${apiUrl}api/habitantes/celular/`, {id_habitate: response.data.id_habitante, })//TODO: hacer que cree un tlf 

        if (habitante.pertenece_etnia) {
            await axios.post(`${apiUrl}api/habitantes/habitanteetnia/`, { id_habitante: response.data.id_habitante, id_etnia: habitante.etnia }, { headers: { Authorization: `token ${token}` } });
        }

        if (habitante.discapacidad) {
           await axios.post(`${apiUrl}api/habitantes/habitantediscapacidad/`, { id_habitante: response.data.id_habitante, id_tipo_discapacidad: habitante.discapacidad_valor }, { headers: { Authorization: `token ${token}` } });
        }
        if (habitante.tipo_sangre) {
            await axios.post(`${apiUrl}api/habitantes/habitantetiposangre/`, { id_habitante: response.data.id_habitante, id_tipo_sangre: habitante.tipo_sangre }, { headers: { Authorization: `token ${token}` } });
        }
        if (habitante.estado_civil) {
            await axios.post(`${apiUrl}api/habitantes/habitanteestadocivil/`, { id_habitante: response.data.id_habitante, id_estado_civil: habitante.estado_civil }, { headers: { Authorization: `token ${token}` } });
        }
        if (habitante.grado_intrusion) {
            await axios.post(`${apiUrl}api/habitantes/habitantenivelestudio/`, { id_habitante: response.data.id_habitante, id_nivel_estudio: habitante.grado_intrusion }, { headers: { Authorization: `token ${token}` } });
        }
    } catch (error) {
        console.error("Error occurred while processing additional data:", error);
        throw new Error("Failed to process additional data for habitante.");
    }

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