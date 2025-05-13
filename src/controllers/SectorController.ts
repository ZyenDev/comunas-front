import axios from 'axios';
import { SectorInterface } from '../models/SectorModel';

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = apiUrl + "api/ubicaciones/sector";

export const getSectorByParroquia = async (id_parroquia:number,token: string): Promise<SectorInterface[]> => {
    const response = await axios.get<SectorInterface[]>(baseUrl + "/", { headers: { Authorization: `token ${token}` } });

    //  para para estados :/
    const filteredParroquias = response.data.filter(
        (parroquia) => parroquia.id_parroquia === id_parroquia
    );
  
      // Return the filtered array
      return filteredParroquias;
};