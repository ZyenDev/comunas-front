
export interface ViviendaInterface {
    id_vivienda: number;
    numero_vivienda: string;
    cantidad_habitantes: number;
    cantidad_familias: number;
    cantidad_banos: number;
    cantidad_cuartos: number;
    id_ubicacion: number;
    id_consejo_comunal: number;
    id_tipo_vivienda: number;
    id_tipo_techo: number;
    id_tipo_pared: number;
    id_tipo_piso: number;
    id_situacion_vivienda: number;
    id_tipo_ocupacion_vivienda: number;
    // solo usado para parse no llega al servidor
    id_tipo_ocupacion?: number;
    vivienda_ocupada: boolean;
    subtipo_ocupacion: string;
    tiene_documentacion: boolean;
    respuesta_otro?: string;
    //solo para parse
    id_estado: number;
    direccion: string;
}