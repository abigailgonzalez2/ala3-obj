import Menu from "./Menu";
import GestorTareas from "./GestorTareas";
import Tarea, { Estado, Dificultad } from "./Tarea";
 
interface MenuAgregar extends Menu {
    pedirTitulo(): string;
    pedirDescripcion(): string;
    pedirEstado(): Estado;
    pedirDificultad(): Dificultad;
    pedirVencimiento(): string;
}
 
interface MenuAgregarConstructor {
    new (gestor: GestorTareas): MenuAgregar;
    prototype: MenuAgregar;
}
 
const MenuAgregar = function (this: MenuAgregar, gestor: GestorTareas): void {
    Menu.call(this, gestor);
} as unknown as MenuAgregarConstructor;
 
MenuAgregar.prototype = Object.create(Menu.prototype);
MenuAgregar.prototype.constructor = MenuAgregar;
 
MenuAgregar.prototype.ejecutar = function (this: MenuAgregar): void {
    // Se crea la tarea con el título y después se completa el resto.
    // Asignamos los datos directo (sin cambiarX) para que "ultima edicion"
    // siga igual a "creacion" hasta que la persona edite de verdad.
    const nueva: Tarea = new Tarea(this.pedirTitulo());
 
    const descripcion: string = this.pedirDescripcion();
    if (descripcion !== "") {
        nueva.descripcion = descripcion;
    }
 
    nueva.estado = this.pedirEstado();
    nueva.dificultad = this.pedirDificultad();
 
    const vencimiento: string = this.pedirVencimiento();
    if (vencimiento !== "") {
        nueva.vencimiento = vencimiento;
    }
 
    this.gestor.agregar(nueva);
    console.log("¡Tarea guardada satisfactoriamente! ✅");
};
 
MenuAgregar.prototype.pedirTitulo = function (this: MenuAgregar): string {
    let titulo: string;
    do {
        console.log("AGREGAR UNA TAREA 📚");
        console.log("Ingrese el titulo de la tarea (obligatorio, maximo 100 caracteres):");
        titulo = this.leerTexto(">");
 
        if (titulo === "") {
            console.log("El titulo es obligatorio ❌");
        } else if (titulo.length > 100) {
            console.log("El titulo no puede superar los 100 caracteres ❌");
        }
    } while (titulo === "" || titulo.length > 100);
 
    return titulo;
};
 
MenuAgregar.prototype.pedirDescripcion = function (this: MenuAgregar): string {
    let descripcion: string;
    do {
        console.log("Ingrese una descripcion (opcional, maximo 500 caracteres, Enter para dejar en blanco):");
        descripcion = this.leerTexto(">");
 
        if (descripcion.length > 500) {
            console.log("La descripcion no puede superar los 500 caracteres ❌");
        }
    } while (descripcion.length > 500);
 
    return descripcion;
};
 
MenuAgregar.prototype.pedirEstado = function (this: MenuAgregar): Estado {
    let estado: Estado = "Pendiente";
    let esValida: boolean;
    do {
        esValida = true;
        console.log("Elija el estado inicial (Enter para dejar 'Pendiente'):");
        console.log("   [1] Pendiente\n   [2] En curso\n   [3] Terminada\n   [4] Cancelada");
        const opcion: string = this.leerTexto(">");
 
        switch (opcion) {
            case "":
                break;
            case "1":
                estado = "Pendiente";
                break;
            case "2":
                estado = "En curso";
                break;
            case "3":
                estado = "Terminada";
                break;
            case "4":
                estado = "Cancelada";
                break;
            default:
                esValida = false;
                console.log("Ingrese una opcion valida ❌");
        }
    } while (!esValida);
 
    return estado;
};
 
MenuAgregar.prototype.pedirDificultad = function (this: MenuAgregar): Dificultad {
    let dificultad: Dificultad = "Facil";
    let esValida: boolean;
    do {
        esValida = true;
        console.log("Elija la dificultad (Enter para dejar 'Facil'):");
        console.log("   [1] Facil\n   [2] Medio\n   [3] Dificil");
        const opcion: string = this.leerTexto(">");
 
        switch (opcion) {
            case "":
                break;
            case "1":
                dificultad = "Facil";
                break;
            case "2":
                dificultad = "Medio";
                break;
            case "3":
                dificultad = "Dificil";
                break;
            default:
                esValida = false;
                console.log("Ingrese una opcion valida ❌");
        }
    } while (!esValida);
 
    return dificultad;
};
 
MenuAgregar.prototype.pedirVencimiento = function (this: MenuAgregar): string {
    console.log("Ingrese fecha de vencimiento, formato DD/MM/AAAA (opcional, Enter para dejar sin vencimiento):");
    return this.leerTexto(">");
};
 
export default MenuAgregar;