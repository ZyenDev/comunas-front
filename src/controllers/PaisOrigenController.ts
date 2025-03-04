import axios from 'axios';
import { PaisOrigenInterface } from '../models/PaisOrigenModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/habitantes/paisorigen";

export const getAllPaisOrigen = async (): Promise<PaisOrigenInterface[]> => {
    const response = await axios.get<PaisOrigenInterface[]>(baseUrl + "/");
    return response.data;
};