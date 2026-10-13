import Menu from "./Menu";
import GestorTareas from "./GestorTareas";
import MenuVerTareas from "./MenuVerTareas";
import MenuBuscar from "./MenuBuscar";
import MenuAgregar from "./MenuAgregar";
 
interface MenuPrincipal extends Menu {}
 
interface MenuPrincipalConstructor {
    new (gestor: GestorTareas): MenuPrincipal;
    prototype: MenuPrincipal;
}
 
const MenuPrincipal = function (this: MenuPrincipal, gestor: GestorTareas): void {
    Menu.call(this, gestor);
} as unknown as MenuPrincipalConstructor;
 
MenuPrincipal.prototype = Object.create(Menu.prototype);
MenuPrincipal.prototype.constructor = MenuPrincipal;
 
// "Override": reemplaza al ejecutar() de Menu con el de este menú.
MenuPrincipal.prototype.ejecutar = function (this: MenuPrincipal): void {
    let opcion: number;
    do {
        console.log("¡Bienvenido! 😃");
        console.log("¿Que desea hacer?:");
        console.log("  [1] Ver mis tareas 📝👀");
        console.log("  [2] Buscar una tarea 🔍");
        console.log("  [3] Agregar una tarea 📚");
        console.log("  [0] Salir");
        opcion = this.leerNumero(">");
 
        switch (opcion) {
            case 1:
                new MenuVerTareas(this.gestor).ejecutar();
                break;
            case 2:
                new MenuBuscar(this.gestor).ejecutar();
                break;
            case 3:
                new MenuAgregar(this.gestor).ejecutar();
                break;
            case 0:
                console.log("Saliendo...");
                break;
            default:
                console.log("Opcion invalida ❌");
                break;
        }
    } while (opcion !== 0);
};
 
export default MenuPrincipal;