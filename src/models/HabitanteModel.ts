export interface HabitanteInterface {
    id_habitante: number;
    cedula: string;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    fecha_nacimiento: string;
    edad: number;
    sexo: string;
    discapacidad: number;
    pertenece_etnia: number;
    id_nacionalidad: number;
    id_pais_origen: number;
    id_vivienda: number;
    nombre?: string;
}