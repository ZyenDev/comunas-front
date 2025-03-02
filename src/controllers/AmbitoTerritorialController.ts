import axios from 'axios';
import { AmbitoTerritorialInterface } from '../models/AmbitoTerritorialModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/ubicaciones/ambitoterritorial";

export const getAllAmbitos = async (): Promise<AmbitoTerritorialInterface[]> => {
    const response = await axios.get<AmbitoTerritorialInterface[]>(baseUrl);
    return response.data;
};

export const getAmbito = async (id: number): Promise<AmbitoTerritorialInterface> => {
    const response = await axios.get<AmbitoTerritorialInterface>(`${baseUrl}/${id}/`);
    return response.data;
}