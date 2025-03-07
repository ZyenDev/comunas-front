import axios from 'axios';
import { AmbitoTerritorialInterface } from '../models/AmbitoTerritorialModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/ubicaciones/ambitoterritorial";

export const getAllAmbitos = async (token: string): Promise<AmbitoTerritorialInterface[]> => {
    const response = await axios.get<AmbitoTerritorialInterface[]>(baseUrl, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};

export const getAmbito = async (id: number, token: string): Promise<AmbitoTerritorialInterface> => {
    const response = await axios.get<AmbitoTerritorialInterface>(`${baseUrl}/${id}/`, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};

export const createAmbito = async (ambito: AmbitoTerritorialInterface, token: string): Promise<AmbitoTerritorialInterface> => {
    const response = await axios.post<AmbitoTerritorialInterface>(baseUrl + "/", ambito, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};

export const updateAmbito = async (id: number, ambito: AmbitoTerritorialInterface, token: string): Promise<AmbitoTerritorialInterface> => {
    ambito.latitud = parseFloat(ambito.latitud.toFixed(9));
    ambito.longitud = parseFloat(ambito.longitud.toFixed(9));
    const response = await axios.put<AmbitoTerritorialInterface>(`${baseUrl}/${id}/`, ambito, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
    return response.data;
};