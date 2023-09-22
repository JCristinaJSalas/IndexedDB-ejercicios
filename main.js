const indexeDB = window.indexedDB;
let db

const conexion = indexeDB.open("listaTareas", 1)


// se ejecuta cuando no haya inconvenientes 
conexion.onsuccess = () => {
    //guarda el resultao en db
    db = conexion.result
    console.log("Base de datos abierta", db)

}

//cuando se crea o necesita una version mas avanzada ..actualizacion
conexion.onupgradeneeded = (e) => {
    //porque aqui se crea se obtuene la BD desde el target
    db = e.target.result
    console.log("Base de datos creada", db)
    //almacenar los objectos json en la BD llamada tareas
    const coleccionObjetos = db.createObjectStore("tareas", { keyPath: "clave" })
}
//mostrar los errores
conexion.onerror = (e) => {
    console.log("ERROR", e)
}
const agregar = (info) => {
    const trasaccion = db.transaction(["tareas"], "readwrite")
    //guarda lo de tareas en variable
    const coleccionObjetos = trasaccion.objectStore("tareas")
    const conexion = coleccionObjetos.add(info)
    consultar()
}

// devulve un registro
const obtener = (clave) => {
    const trasaccion = db.transaction(["tareas"], "readonly")
    const coleccionObjetos = trasaccion.objectStore("tareas")
    const conexion = coleccionObjetos.get(clave)

    conexion.onsuccess = (e) => {
        console.log(conexion.result)}
}

const actualizar = (data) => {
    const trasaccion = db.trasaccion(["tareas"], "readwrite")
    const coleccionObjetos = trasaccion.objectStore("tareas")
    const conexion = coleccionObjetos.put(data)
    conexion.onsuccess = (e) => {
        console.log(conexion.result)}
    consultar()

}
const eliminar = () => {

}

// devuelve muchos registros
const consultar = () => {
    const trasaccion = db.transaction(["tareas"], "readonly")
    const coleccionObjetos = trasaccion.objectStore("tareas")
    // los cursor permite recorrer el (coleccio) arreglo de objetos
    const conexion = coleccionObjetos.openCursor()


    conexion.onsuccess = (e) => {
      const cursor = e.target.result
      if(cursor){
        console.log("Lista de Tareas")
        console.log(cursor.value)
      }
      else{
        console.log("No hay tareas en la lista")
      }
    }

}