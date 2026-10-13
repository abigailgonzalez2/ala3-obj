import promptSync from "prompt-sync";
import GestorTareas from "./GestorTareas";
 
const prompt = promptSync();
 
interface Menu {
    gestor: GestorTareas;
    ejecutar(): void;
    leerNumero(mensaje: string): number;
    leerTexto(mensaje: string): string;
}
 
interface MenuConstructor {
    new (gestor: GestorTareas): Menu;
    // Firma de "llamada": nos permite usar Menu.call(this, ...) desde los hijos.
    (this: Menu, gestor: GestorTareas): void;
    prototype: Menu;
}
 
const Menu = function (this: Menu, gestor: GestorTareas): void {
    this.gestor = gestor;
} as unknown as MenuConstructor;
 
// Método "abstracto": cada menú concreto lo reemplaza (override) con el suyo.
Menu.prototype.ejecutar = function (this: Menu): void {
    throw new Error("Cada menu debe definir su propio metodo ejecutar()");
};
 
// Lee un número. Si la persona toca Enter sin escribir nada o escribe
// letras, devuelve NaN (y los menús lo informan como opción inválida).
Menu.prototype.leerNumero = function (this: Menu, mensaje: string): number {
    const texto: string = prompt(mensaje).trim();
    console.clear();
    if (texto === "") {
        return NaN;
    }
    return Number(texto);
};
 
// Lee un texto sin espacios al principio ni al final.
Menu.prototype.leerTexto = function (this: Menu, mensaje: string): string {
    const texto: string = prompt(mensaje).trim();
    console.clear();
    return texto;
};
 
export default Menu;