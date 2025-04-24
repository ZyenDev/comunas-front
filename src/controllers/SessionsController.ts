import axios from 'axios';
import { LoginInterface, RegisterLoginInterface } from '../models/SessionsModel';
import { error } from 'console';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api";


export const Login = async (data: LoginInterface) => {
        const response = await axios.post(`${baseUrl}/login`, data);

        return response.data;
};

export const Register = async (data: RegisterLoginInterface, role:string, token: string) => {
        var group
        if(role==""){
                return console.error("No se ha definido el rol del usuario")    
        }

        switch (role) {
                case "Administrador":
                  group="Parlamentario"
                  break;
                case "Parlamentario":
                  group="Vocero"
                  break;
                case "Vocero":
                  group="Habitante"
                  break;
                default:
                  group="N/A"
                  return
                  break;
        }


        const response = await axios.post(`${baseUrl}/register/${group.toLowerCase()}`, data,  { headers: { Authorization: `token ${token}` } });
        return response.data;
};

export const Logout = async () => {
        const response = await axios.post(`${baseUrl}/logout/`);
        return response.data;
};

export const getUserByRole = async (role:string|null, token: string) => {
        var group
        if(role==""){
                return console.error("No se ha definido el rol del usuario")    
        }

        switch (role) {
                case "Administrador":
                  group="Parlamentario"
                  break;
                case "Parlamentario":
                  group="Vocero"
                  break;
                case "Vocero":
                  group="Habitante"
                  break;
                default:
                  group="N/A"
                  return
                  break;
        }

        const response = await axios.get(`${baseUrl}/groups/${group.toLowerCase()}/users/`,{ headers: { Authorization: `token ${token}` } });
        return response.data;
};


export const toggleUser = async (user_id:string,is_active:boolean, token: string) => {
        const response = await axios.post(`${apiUrl}api/toggle_user`, { user_id, is_active }, { headers: { Authorization: `token ${token}` } });
        return response.data;
}
