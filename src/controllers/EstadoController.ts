import axios from 'axios';
import { EstadosInterface } from '../models/EstadosModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/ubicaciones/estado";

export const getAllEstados = async (token: string): Promise<EstadosInterface[]> => {
    const response = await axios.get<EstadosInterface[]>(baseUrl + "/", { headers: { Authorization: `token ${token}` } });
    return response.data;
};