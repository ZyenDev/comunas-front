import axios from 'axios';
import { ParroquiaInterface } from '../models/ParroquiaModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/ubicaciones/parroquia";

export const getParroquiaByMunicipio = async (id_municipio:number,token: string): Promise<ParroquiaInterface[]> => {
    const response = await axios.get<ParroquiaInterface[]>(baseUrl + "/", { headers: { Authorization: `token ${token}` } });

    //  para para estados :/
    const filteredMunicipios = response.data.filter(
        (municipio) => municipio.id_municipio === id_municipio
    );
  
      // Return the filtered array
      return filteredMunicipios;
};