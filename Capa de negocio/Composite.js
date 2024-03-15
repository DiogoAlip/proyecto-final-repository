// Componente base del patrón Composite
class ComponenteArchivo {
    constructor(nombre) {
        this.nombre = nombre;
    }

    mostrar() {
        throw new Error("El método 'mostrar' debe ser implementado");
    }
}

// Hoja del patrón Composite
class Archivo extends ComponenteArchivo {
    mostrar() {
        console.log(`Archivo: ${this.nombre}`);
    }
}

// Composite del patrón Composite
class Directorio extends ComponenteArchivo {
    constructor(nombre) {
        super(nombre);
        this.hijos = [];
    }

    agregar(componente) {
        this.hijos.push(componente);
    }

    remover(componente) {
        const index = this.hijos.indexOf(componente);
        if (index !== -1) {
            this.hijos.splice(index, 1);
        }
    }

    mostrar() {
        console.log(`Directorio: ${this.nombre}`);
        this.hijos.forEach(hijo => hijo.mostrar());
    }
}

// Facade para ocultar la complejidad
class AdministradorArchivos {
    constructor() {
        this.raiz = new Directorio("Raíz");
    }

    crearArchivo(nombre) {
        const archivo = new Archivo(nombre);
        this.raiz.agregar(archivo);
        return archivo;
    }

    crearDirectorio(nombre) {
        const directorio = new Directorio(nombre);
        this.raiz.agregar(directorio);
        return directorio;
    }

    mostrarEstructura() {
        this.raiz.mostrar();
    }
}

// Uso de la fachada para manejar archivos y directorios
const administradorArchivos = new AdministradorArchivos();
const documentos = administradorArchivos.crearDirectorio("Documentos");
const imagenes = administradorArchivos.crearDirectorio("Imágenes");
administradorArchivos.crearArchivo("documento1.txt");
administradorArchivos.crearArchivo("documento2.txt");
administradorArchivos.crearArchivo("imagen1.jpg");

administradorArchivos.mostrarEstructura();
