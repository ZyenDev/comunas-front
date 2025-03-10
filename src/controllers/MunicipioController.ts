import axios from 'axios';
import { MunicipioInterface } from '../models/MunicipioModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/ubicaciones/municipio";

export const getMunicipioByEstadosID = async (token: string): Promise<MunicipioInterface[]> => {
    const response = await axios.get<MunicipioInterface[]>(baseUrl + "/", { headers: { Authorization: `token ${token}` } });

    //  para para estados :/
    // const filteredMunicipios = response.data.filter(
    //     (municipio) => municipio.id_estado === id_municipio
    //   );
  
      // Return the filtered array
      return response.data;
};