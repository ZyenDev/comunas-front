import axios from 'axios';



export interface ConsejoComunalInterface {
    id_consejo_comunal: number;
    codigo_situr: string;
    rif: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
    nombre: string;
    id_ambito_territorial: number;
    id_comuna: number;
}

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/comunidades/consejoscomunales";


export const createConsejoComunal = async (comuna: ConsejoComunalInterface): Promise<ConsejoComunalInterface> => {
    const response = await axios.post<ConsejoComunalInterface>(baseUrl+'/', comuna);
    return response.data;
};

// Get all Comunas
export const getAllConsejoComunal = async (): Promise<ConsejoComunalInterface[]> => {
    const response = await axios.get<ConsejoComunalInterface[]>(baseUrl);
    return response.data;
};

// Get a Consejo Comunal by ID
export const getConsejoComunalById = async (id: number): Promise<ConsejoComunalInterface> => {
    const response = await axios.get<ConsejoComunalInterface>(`${baseUrl}/${id}/`);
    return response.data;
};

// Update a Comuna by ID
export const updateConsejoComuna = async (id: number, comuna: ConsejoComunalInterface): Promise<ConsejoComunalInterface> => {
    const response = await axios.put<ConsejoComunalInterface>(`${baseUrl}/${id}/`, comuna);
    return response.data;
};

// Delete a Comuna by ID
export const deleteConsejoComunal = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}/`);
};
