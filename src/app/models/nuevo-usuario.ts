export class NuevoUsuario {
    nombre: string;
    apellido: string;
    codigo: string;
    email: string;
    telefono: string;
    password: string;
    roles: string[];

    constructor(nombre: string, apellido: string, codigo: string, email: string, telefono: string, password: string, roles: string[]) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.codigo = codigo;
        this.email = email;
        this.telefono = telefono;
        this.password = password;
        this.roles = roles;
    }
}
