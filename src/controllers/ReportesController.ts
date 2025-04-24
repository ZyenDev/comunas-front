import axios from 'axios';
import { ReportesModelo } from '../models/ReportesModelo';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/reportes";



export const getReporteGen = async (token: string): Promise<ReportesModelo> => {
    const response = await axios.get<ReportesModelo>(apiUrl+"api/dashboard", { headers: { Authorization: `token ${token}` } });
    return response.data;
};