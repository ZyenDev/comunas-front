import axios from 'axios';


export interface AmbitoTerritorial {
    id_ambito_territorial: number
    longitud: number
    latitud: number
}

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/ubicaciones/ambitoterritorial/"; // Replace with your actual API URL



export const getAllAmbitos = async (): Promise<AmbitoTerritorial[]> => {
    try {
        const response = await axios.get<AmbitoTerritorial[]>(baseUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};


export const getAmbito = async (id: number): Promise<AmbitoTerritorial> => {
    try {
        const response = await axios.get<AmbitoTerritorial>(`${baseUrl}${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
    }
}