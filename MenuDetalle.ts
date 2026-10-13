import Menu from "./Menu";
import GestorTareas from "./GestorTareas";
import Tarea from "./Tarea";
import MenuEdicion from "./MenuEdicion";
 
interface MenuDetalle extends Menu {
    tarea: Tarea;
}
 
interface MenuDetalleConstructor {
    new (gestor: GestorTareas, tarea: Tarea): MenuDetalle;
    prototype: MenuDetalle;
}
 
const MenuDetalle = function (this: MenuDetalle, gestor: GestorTareas, tarea: Tarea): void {
    Menu.call(this, gestor);
    this.tarea = tarea;
} as unknown as MenuDetalleConstructor;
 
MenuDetalle.prototype = Object.create(Menu.prototype);
MenuDetalle.prototype.constructor = MenuDetalle;
 
MenuDetalle.prototype.ejecutar = function (this: MenuDetalle): void {
    let opcion: string;
    do {
        this.tarea.mostrarTarea();
        console.log("[E] Editar [0] Volver");
        opcion = this.leerTexto(">").toUpperCase();
 
        if (opcion !== "E" && opcion !== "0") {
            console.log("Ingrese una opcion valida ❌");
        }
    } while (opcion !== "E" && opcion !== "0");
 
    if (opcion === "E") {
        new MenuEdicion(this.gestor, this.tarea).ejecutar();
    }
};
 
export default MenuDetalle;