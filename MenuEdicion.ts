import Menu from "./Menu";
import GestorTareas from "./GestorTareas";
import Tarea from "./Tarea";
 
interface MenuEdicion extends Menu {
    tarea: Tarea;
    editarTitulo(): void;
    editarDescripcion(): void;
    editarEstado(): void;
    editarDificultad(): void;
    editarVencimiento(): void;
}
 
interface MenuEdicionConstructor {
    new (gestor: GestorTareas, tarea: Tarea): MenuEdicion;
    prototype: MenuEdicion;
}
 
const MenuEdicion = function (this: MenuEdicion, gestor: GestorTareas, tarea: Tarea): void {
    Menu.call(this, gestor);   // 1) el "padre" inicializa lo suyo (this.gestor)
    this.tarea = tarea;        // 2) el hijo agrega lo propio
} as unknown as MenuEdicionConstructor;
 
// 3) Enganchamos la cadena de prototipos: MenuEdicion -> Menu
MenuEdicion.prototype = Object.create(Menu.prototype);
MenuEdicion.prototype.constructor = MenuEdicion;
 
MenuEdicion.prototype.ejecutar = function (this: MenuEdicion): void {
    let opcion: number;
    do {
        console.log("EDITAR TAREA ✏️");
        console.log("   [1] Titulo: " + this.tarea.titulo);
        console.log("   [2] Descripcion: " + this.tarea.descripcion);
        console.log("   [3] Estado: " + this.tarea.estado);
        console.log("   [4] Dificultad: " + this.tarea.dificultad);
        console.log("   [5] Fecha de vencimiento: " + this.tarea.vencimiento);
        console.log("       Fecha de creacion: " + this.tarea.creacion);
        console.log("       Fecha de ultima modificacion: " + this.tarea.ultimaEdicion);
        opcion = this.leerNumero("Ingrese el dato que desea modificar (0 para volver): ");
 
        switch (opcion) {
            case 1:
                this.editarTitulo();
                break;
            case 2:
                this.editarDescripcion();
                break;
            case 3:
                this.editarEstado();
                break;
            case 4:
                this.editarDificultad();
                break;
            case 5:
                this.editarVencimiento();
                break;
            case 0:
                break;
            default:
                console.log("Ingrese una opcion valida ❌");
                break;
        }
    } while (opcion !== 0);
};
 
MenuEdicion.prototype.editarTitulo = function (this: MenuEdicion): void {
    let nuevoTitulo: string;
    do {
        console.log("Titulo actual: " + this.tarea.titulo);
        console.log("Ingrese nuevo titulo (Enter para cancelar): ");
        nuevoTitulo = this.leerTexto(">");
 
        if (nuevoTitulo.length > 100) {
            console.log("El titulo no puede superar los 100 caracteres ❌");
        }
    } while (nuevoTitulo.length > 100);
 
    if (nuevoTitulo !== "") {
        this.tarea.cambiarTitulo(nuevoTitulo);
        console.log("El titulo se modifico satisfactoriamente ✅");
    }
};
 
MenuEdicion.prototype.editarDescripcion = function (this: MenuEdicion): void {
    let nuevaDescripcion: string;
    do {
        console.log("Descripcion actual: " + this.tarea.descripcion);
        console.log("Ingrese nueva descripcion (Enter para dejarla en blanco): ");
        nuevaDescripcion = this.leerTexto(">");
 
        if (nuevaDescripcion.length > 500) {
            console.log("La descripcion no puede superar los 500 caracteres ❌");
        }
    } while (nuevaDescripcion.length > 500);
 
    if (nuevaDescripcion !== "") {
        this.tarea.cambiarDescripcion(nuevaDescripcion);
    } else {
        this.tarea.cambiarDescripcion("---");
    }
    console.log("La descripcion se modifico satisfactoriamente ✅");
};
 
MenuEdicion.prototype.editarEstado = function (this: MenuEdicion): void {
    let opcion: number;
    let esValida: boolean;
    do {
        esValida = true;
        console.log("Estado actual: " + this.tarea.estado);
        console.log("   [1] Pendiente\n   [2] En curso\n   [3] Terminada\n   [4] Cancelada\n   [0] Cancelar");
        opcion = this.leerNumero(">");
 
        switch (opcion) {
            case 1:
                this.tarea.cambiarEstado("Pendiente");
                break;
            case 2:
                this.tarea.cambiarEstado("En curso");
                break;
            case 3:
                this.tarea.cambiarEstado("Terminada");
                break;
            case 4:
                this.tarea.cambiarEstado("Cancelada");
                break;
            case 0:
                break;
            default:
                esValida = false;
                console.log("Ingrese una opcion valida ❌");
        }
    } while (!esValida);
 
    if (opcion !== 0) {
        console.log("El estado se modifico satisfactoriamente ✅");
    }
};
 
MenuEdicion.prototype.editarDificultad = function (this: MenuEdicion): void {
    let opcion: number;
    let esValida: boolean;
    do {
        esValida = true;
        console.log("Dificultad actual: " + this.tarea.dificultad);
        console.log("   [1] Facil\n   [2] Medio\n   [3] Dificil\n   [0] Cancelar");
        opcion = this.leerNumero(">");
 
        switch (opcion) {
            case 1:
                this.tarea.cambiarDificultad("Facil");
                break;
            case 2:
                this.tarea.cambiarDificultad("Medio");
                break;
            case 3:
                this.tarea.cambiarDificultad("Dificil");
                break;
            case 0:
                break;
            default:
                esValida = false;
                console.log("Ingrese una opcion valida ❌");
        }
    } while (!esValida);
 
    if (opcion !== 0) {
        console.log("La dificultad se modifico satisfactoriamente ✅");
    }
};
 
MenuEdicion.prototype.editarVencimiento = function (this: MenuEdicion): void {
    console.log("Fecha de vencimiento actual: " + this.tarea.vencimiento);
    console.log("Ingrese nueva fecha de vencimiento, formato DD/MM/AAAA (Enter para cancelar): ");
    const nuevoVencimiento: string = this.leerTexto(">");
 
    if (nuevoVencimiento !== "") {
        this.tarea.cambiarVencimiento(nuevoVencimiento);
        console.log("La fecha de vencimiento se modifico satisfactoriamente ✅");
    }
};
 
export default MenuEdicion;