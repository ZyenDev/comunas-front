import axios from 'axios';

export interface ComunaInterface {
    id_comuna: number;
    codigo_situr: string;
    rif: string;
    nombre: string;
    cantidad_consejo_comunal: number;
    fecha_creacion: string;
    fecha_actualizacion: string;
    id_ambito_territorial: number;
}


//temporal dick head
const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/comunidades/comunas"; // Replace with your actual API URL

// Create a new Comuna
export const createComuna = async (comuna: ComunaInterface): Promise<ComunaInterface> => {
    const response = await axios.post<ComunaInterface>(baseUrl, comuna);
    return response.data;
};

// Get a Comuna by ID
export const getComunaByID = async (id: number): Promise<ComunaInterface> => {
    const response = await axios.get<ComunaInterface>(`${baseUrl}/${id}/`);
    return response.data;
};

// Get all Comunas
export const getAllComunas = async (): Promise<ComunaInterface[]> => {
    const response = await axios.get<ComunaInterface[]>(baseUrl);
    return response.data;
};

// Update a Comuna by ID
export const updateComuna = async (id: number, comuna: ComunaInterface): Promise<ComunaInterface> => {
    const response = await axios.put<ComunaInterface>(`${baseUrl}/${id}/`, comuna);
    return response.data;
};

// Delete a Comuna by ID
export const deleteComuna = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}/`);
};
