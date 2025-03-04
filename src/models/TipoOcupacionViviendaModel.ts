export interface TipoOcupacionViviendaInterface {
    id_tipo_ocupacion?: number;
    vivienda_ocupada: boolean;
    subtipo_ocupacion: string;
    tiene_documentacion: boolean;
    respuesta_otro?: string;
}