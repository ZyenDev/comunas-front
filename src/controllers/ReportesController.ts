import axios from 'axios';
import { ReportesModelo } from '../models/ReportesModelo';

const apiUrl = import.meta.env.VITE_API_URL;
// const baseUrl = apiUrl + "api/reportes";



export const getReporteGen = async (token: string): Promise<ReportesModelo> => {
    const response = await axios.get<ReportesModelo>(apiUrl+"api/dashboard", { headers: { Authorization: `token ${token}` } });
    return response.data;
};
//api/reportes/parlamentario
export const  getReporteParlamentario = async (token: string, idComuna: number, tipo_reporte: string, edad_min:number, edad_max:number): Promise<any> =>{
    const response = await axios.post(apiUrl+"api/reportes/parlamentario/", {"idcomuna":idComuna, "tipo_reporte": tipo_reporte, "edad_min": edad_min, "edad_max":edad_max},{ headers: { Authorization: `token ${token}` } });
    return response.data;
}