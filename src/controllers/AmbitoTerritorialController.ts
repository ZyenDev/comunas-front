import axios from 'axios';
import { AmbitoTerritorialInterface } from '../models/AmbitoTerritorialModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/ubicaciones/ambitoterritorial/"; // Replace with your actual API URL



export const getAllAmbitos = async (): Promise<AmbitoTerritorialInterface[]> => {
    try {
        const response = await axios.get<AmbitoTerritorialInterface[]>(baseUrl);
        return response.data;
    } catch (error) {
        console.error('Error al buscar Usuario:', error);
        throw new Error('Fallo al buscar Usuario');
    }
};


export const getAmbito = async (id: number): Promise<AmbitoTerritorialInterface> => {
    try {
        const response = await axios.get<AmbitoTerritorialInterface>(`${baseUrl}${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error al buscar Usuario:', error);
        throw new Error('Fallo al buscar Usuario');
    }
}