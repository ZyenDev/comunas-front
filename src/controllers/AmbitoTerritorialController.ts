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
};

export const createAmbito = async (ambito: AmbitoTerritorialInterface): Promise<AmbitoTerritorialInterface> => {
   
    const response = await axios.post<AmbitoTerritorialInterface>(baseUrl+"/", ambito);
    return response.data;
};

export const updateAmbito = async (id: number, ambito: AmbitoTerritorialInterface): Promise<AmbitoTerritorialInterface> => {
    ambito.latitud = parseFloat(ambito.latitud.toFixed(9));
    ambito.longitud = parseFloat(ambito.longitud.toFixed(9));
    const response = await axios.put<AmbitoTerritorialInterface>(`${baseUrl}/${id}/`, ambito);
    return response.data;
};