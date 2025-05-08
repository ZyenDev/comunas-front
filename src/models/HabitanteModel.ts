export interface HabitanteInterface {
    id_habitante?: number
    cedula: string;
    discapacidad: boolean;
    discapacidad_valor: number;
    edad: number;
    email: string;
    estado_civil: number;
    etnia: string;
    fecha_nacimiento: string;
    grado_intrusion: number;
    id_nacionalidad: number;
    id_vivienda: number;
    password: string;
    pertenece_etnia: boolean;
    primer_apellido: string;
    primer_nombre: string;
    segundo_apellido: string;
    segundo_nombre: string;
    sexo: string;
    telefono: string;
    tipo_sangre: number;
    username: string;
    vivenda: string;
}