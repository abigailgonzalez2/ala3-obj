type Estado = "Pendiente" | "En curso" | "Terminada" | "Cancelada";
type Dificultad = "Facil" | "Medio" | "Dificil";
 
// 1. Forma de una tarea (solo existe para TypeScript, desaparece al compilar).
interface Tarea {
    titulo: string;
    descripcion: string;
    estado: Estado;
    dificultad: Dificultad;
    vencimiento: string;
    creacion: string;
    ultimaEdicion: string;
    cambiarTitulo(nuevoTitulo: string): void;
    cambiarDescripcion(nuevaDescripcion: string): void;
    cambiarEstado(nuevoEstado: Estado): void;
    cambiarDificultad(nuevaDificultad: Dificultad): void;
    cambiarVencimiento(nuevoVencimiento: string): void;
    actualizarEdicion(): void;
    mostrarTarea(): void;
}
 
// Le explicamos a TypeScript qué devuelve "new Tarea(...)" y que
// Tarea.prototype tiene la forma de una tarea. Sin esto, TypeScript
// no sabe tipar "new" sobre una función común.
interface TareaConstructor {
    new (titulo: string): Tarea;
    prototype: Tarea;
}
 
// 2. Función constructora. "this: Tarea" indica qué forma tiene "this" adentro.
//    El "as unknown as TareaConstructor" del final es el "cartel" que le
//    pone TypeScript a esta función para poder usarla con "new".
const Tarea = function (this: Tarea, titulo: string): void {
    this.titulo = titulo;
    this.descripcion = "---";
    this.estado = "Pendiente";
    this.dificultad = "Facil";
    this.vencimiento = "Sin vencimiento";
    this.creacion = new Date(Date.now()).toLocaleString().split(",")[0];
    this.ultimaEdicion = this.creacion;
} as unknown as TareaConstructor;
 
// 3. Métodos en el prototipo (una sola copia, compartida por todas las tareas).
Tarea.prototype.cambiarTitulo = function (this: Tarea, nuevoTitulo: string): void {
    this.titulo = nuevoTitulo;
    this.actualizarEdicion();
};
 
Tarea.prototype.cambiarDescripcion = function (this: Tarea, nuevaDescripcion: string): void {
    this.descripcion = nuevaDescripcion;
    this.actualizarEdicion();
};
 
Tarea.prototype.cambiarEstado = function (this: Tarea, nuevoEstado: Estado): void {
    this.estado = nuevoEstado;
    this.actualizarEdicion();
};
 
Tarea.prototype.cambiarDificultad = function (this: Tarea, nuevaDificultad: Dificultad): void {
    this.dificultad = nuevaDificultad;
    this.actualizarEdicion();
};
 
Tarea.prototype.cambiarVencimiento = function (this: Tarea, nuevoVencimiento: string): void {
    this.vencimiento = nuevoVencimiento;
    this.actualizarEdicion();
};
 
Tarea.prototype.actualizarEdicion = function (this: Tarea): void {
    this.ultimaEdicion = new Date(Date.now()).toLocaleString().split(",")[0];
};
 
Tarea.prototype.mostrarTarea = function (this: Tarea): void {
    console.log("📒 " + this.titulo);
    console.log("   Descripcion: " + this.descripcion);
    console.log("   Estado: " + this.estado);
 
    process.stdout.write("   Dificultad: ");
    switch (this.dificultad) {
        case "Facil":
            console.log("🟩⬜⬜");
            break;
        case "Medio":
            console.log("🟨🟨⬜");
            break;
        case "Dificil":
            console.log("🟥🟥🟥");
            break;
    }
    console.log("   Fecha de vencimiento: " + this.vencimiento);
    console.log("   Fecha de creacion: " + this.creacion);
    console.log("   Fecha de ultima modificacion: " + this.ultimaEdicion);
};
 
export default Tarea;
export { Estado, Dificultad };