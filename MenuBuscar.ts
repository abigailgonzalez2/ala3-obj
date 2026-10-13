import Menu from "./Menu";
import GestorTareas from "./GestorTareas";
import Tarea from "./Tarea";
import MenuListado from "./MenuListado";
 
interface MenuBuscar extends Menu {}
 
interface MenuBuscarConstructor {
    new (gestor: GestorTareas): MenuBuscar;
    prototype: MenuBuscar;
}
 
const MenuBuscar = function (this: MenuBuscar, gestor: GestorTareas): void {
    Menu.call(this, gestor);
} as unknown as MenuBuscarConstructor;
 
MenuBuscar.prototype = Object.create(Menu.prototype);
MenuBuscar.prototype.constructor = MenuBuscar;
 
MenuBuscar.prototype.ejecutar = function (this: MenuBuscar): void {
    console.log("BUSCAR UNA TAREA 🔍");
    console.log("Ingrese una palabra clave para buscar en el titulo:");
    const clave: string = this.leerTexto(">");
 
    const resultados: Tarea[] = this.gestor.buscarPorTitulo(clave);
 
    if (resultados.length === 0) {
        console.log("No se encontraron tareas con esa palabra clave ❓");
        return;
    }
 
    console.log("RESULTADOS DE LA BUSQUEDA:");
    new MenuListado(this.gestor, resultados).ejecutar();
};
 
export default MenuBuscar;