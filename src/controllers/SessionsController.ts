import axios from 'axios';
import { LoginInterface, RegisterLoginInterface } from '../models/SessionsModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api";


export const Login = async (data: LoginInterface) => {
        const response = await axios.post(`${baseUrl}/login`, data);
        return response.data;
};

export const Register = async (data: RegisterLoginInterface, role:string, token: string) => {
        //const response = await axios.post(`${baseUrl}/register`, data);
        const response = await axios.post(`${baseUrl}/register/${role.toLowerCase()}`, data,  { headers: { Authorization: `token ${token}` } });
        return response.data;
};

export const Logout = async () => {
        const response = await axios.post(`${baseUrl}/logout/`);
        return response.data;
};