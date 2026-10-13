Menu.call(this, gestor);                          // el padre inicializa lo suyo
MenuX.prototype = Object.create(Menu.prototype);  // engancha la cadena de prototipos
MenuX.prototype.constructor = MenuX;

import Tarea, { Estado } from "./Tarea";
 
type Criterio = "titulo" | "vencimiento" | "creacion" | "ninguno";
 
// Fecha "enorme" que usamos para mandar al final a las tareas sin fecha.
const SIN_FECHA: number = 8640000000000000;
 
interface GestorTareas {
    tareas: Tarea[];
    agregar(tarea: Tarea): void;
    filtrarPorEstado(estado: Estado | "Todas"): Tarea[];
    buscarPorTitulo(clave: string): Tarea[];
    ordenar(lista: Tarea[], criterio: Criterio): Tarea[];
    textoAFecha(texto: string): number;
}
 
interface GestorTareasConstructor {
    new (): GestorTareas;
    prototype: GestorTareas;
}
 
const GestorTareas = function (this: GestorTareas): void {
    this.tareas = [];
} as unknown as GestorTareasConstructor;
 
GestorTareas.prototype.agregar = function (this: GestorTareas, tarea: Tarea): void {
    this.tareas.push(tarea);
};
 
GestorTareas.prototype.filtrarPorEstado = function (this: GestorTareas, estado: Estado | "Todas"): Tarea[] {
    const resultado: Tarea[] = [];
    for (let i = 0; i < this.tareas.length; i++) {
        if (estado === "Todas" || this.tareas[i].estado === estado) {
            resultado.push(this.tareas[i]);
        }
    }
    return resultado;
};
 
GestorTareas.prototype.buscarPorTitulo = function (this: GestorTareas, clave: string): Tarea[] {
    const resultado: Tarea[] = [];
    for (let i = 0; i < this.tareas.length; i++) {
        if (this.tareas[i].titulo.toLowerCase().includes(clave.toLowerCase())) {
            resultado.push(this.tareas[i]);
        }
    }
    return resultado;
};
 
// Convierte "DD/MM/AAAA" a milisegundos para poder comparar fechas.
// Si el texto no es una fecha (ej: "Sin vencimiento") devuelve SIN_FECHA.
GestorTareas.prototype.textoAFecha = function (this: GestorTareas, texto: string): number {
    const partes: string[] = texto.split("/");
    if (partes.length !== 3) {
        return SIN_FECHA;
    }
 
    const dia: number = Number(partes[0]);
    const mes: number = Number(partes[1]);
    const anio: number = Number(partes[2]);
    if (isNaN(dia) || isNaN(mes) || isNaN(anio)) {
        return SIN_FECHA;
    }
 
    return new Date(anio, mes - 1, dia).getTime();
};
 
// Devuelve una COPIA ordenada (no toca el orden real de this.tareas).
GestorTareas.prototype.ordenar = function (this: GestorTareas, lista: Tarea[], criterio: Criterio): Tarea[] {
    const copia: Tarea[] = lista.slice();
 
    switch (criterio) {
        case "titulo":
            copia.sort((a: Tarea, b: Tarea): number => a.titulo.localeCompare(b.titulo));
            break;
        case "vencimiento":
            copia.sort((a: Tarea, b: Tarea): number => this.textoAFecha(a.vencimiento) - this.textoAFecha(b.vencimiento));
            break;
        case "creacion":
            copia.sort((a: Tarea, b: Tarea): number => this.textoAFecha(a.creacion) - this.textoAFecha(b.creacion));
            break;
        case "ninguno":
            break;
    }
 
    return copia;
};
 
export default GestorTareas;
export { Criterio };