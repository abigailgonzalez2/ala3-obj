import Menu from "./Menu";
import GestorTareas, { Criterio } from "./GestorTareas";
import Tarea from "./Tarea";
import MenuDetalle from "./MenuDetalle";
 
interface MenuListado extends Menu {
    lista: Tarea[];
    elegirOrden(): Criterio;
}
 
interface MenuListadoConstructor {
    new (gestor: GestorTareas, lista: Tarea[]): MenuListado;
    prototype: MenuListado;
}
 
const MenuListado = function (this: MenuListado, gestor: GestorTareas, lista: Tarea[]): void {
    Menu.call(this, gestor);
    this.lista = lista;
} as unknown as MenuListadoConstructor;
 
MenuListado.prototype = Object.create(Menu.prototype);
MenuListado.prototype.constructor = MenuListado;
 
MenuListado.prototype.ejecutar = function (this: MenuListado): void {
    if (this.lista.length === 0) {
        console.log("No hay tareas para mostrar ❓");
        return;
    }
 
    const criterio: Criterio = this.elegirOrden();
    const ordenada: Tarea[] = this.gestor.ordenar(this.lista, criterio);
 
    let indiceTarea: number;
    do {
        for (let i = 0; i < ordenada.length; i++) {
            console.log("   [" + (i + 1) + "] " + ordenada[i].titulo);
        }
 
        console.log("\nIngrese el numero de una tarea para ver sus detalles (0 para volver)");
        indiceTarea = this.leerNumero(">");
 
        if (indiceTarea === 0) {
            return;
        } else if (ordenada[indiceTarea - 1] === undefined) {
            console.log("Ingrese una opcion valida ❌");
        } else {
            new MenuDetalle(this.gestor, ordenada[indiceTarea - 1]).ejecutar();
        }
    } while (ordenada[indiceTarea - 1] === undefined);
};
 
MenuListado.prototype.elegirOrden = function (this: MenuListado): Criterio {
    let criterio: Criterio = "ninguno";
    let esValida: boolean;
    do {
        esValida = true;
        console.log("¿En que orden desea ver las tareas?");
        console.log("   [1] Alfabetico (titulo)");
        console.log("   [2] Fecha de vencimiento");
        console.log("   [3] Fecha de creacion");
        console.log("   [0] Sin ordenar");
        const opcion: number = this.leerNumero(">");
 
        switch (opcion) {
            case 1:
                criterio = "titulo";
                break;
            case 2:
                criterio = "vencimiento";
                break;
            case 3:
                criterio = "creacion";
                break;
            case 0:
                criterio = "ninguno";
                break;
            default:
                esValida = false;
                console.log("Ingrese una opcion valida ❌");
        }
    } while (!esValida);
 
    return criterio;
};
 
export default MenuListado;