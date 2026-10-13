import Menu from "./Menu";
import GestorTareas from "./GestorTareas";
import { Estado } from "./Tarea";
import MenuListado from "./MenuListado";
 
interface MenuVerTareas extends Menu {
    mostrarTipo(titulo: string, estado: Estado | "Todas"): void;
}
 
interface MenuVerTareasConstructor {
    new (gestor: GestorTareas): MenuVerTareas;
    prototype: MenuVerTareas;
}
 
const MenuVerTareas = function (this: MenuVerTareas, gestor: GestorTareas): void {
    Menu.call(this, gestor);
} as unknown as MenuVerTareasConstructor;
 
MenuVerTareas.prototype = Object.create(Menu.prototype);
MenuVerTareas.prototype.constructor = MenuVerTareas;
 
MenuVerTareas.prototype.ejecutar = function (this: MenuVerTareas): void {
    let opcion: number;
    do {
        console.log("VER MIS TAREAS 📝👀");
        console.log("¿Que tareas desea ver?:");
        console.log("  [1] Todas");
        console.log("  [2] Pendientes");
        console.log("  [3] En curso");
        console.log("  [4] Terminadas");
        console.log("  [0] Volver");
        opcion = this.leerNumero(">");
 
        switch (opcion) {
            case 1:
                this.mostrarTipo("TODAS LAS TAREAS:", "Todas");
                break;
            case 2:
                this.mostrarTipo("TAREAS PENDIENTES:", "Pendiente");
                break;
            case 3:
                this.mostrarTipo("TAREAS EN CURSO:", "En curso");
                break;
            case 4:
                this.mostrarTipo("TAREAS TERMINADAS:", "Terminada");
                break;
            case 0:
                break;
            default:
                console.log("Opcion invalida ❌");
                break;
        }
    } while (opcion !== 0);
};
 
MenuVerTareas.prototype.mostrarTipo = function (this: MenuVerTareas, titulo: string, estado: Estado | "Todas"): void {
    console.log(titulo);
    new MenuListado(this.gestor, this.gestor.filtrarPorEstado(estado)).ejecutar();
};
 
export default MenuVerTareas;