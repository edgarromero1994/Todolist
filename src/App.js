
import React, { useState } from 'react';
import './App.css';

function App() {

  const [toDo, setToDo] = useState([])

  //temp state
const [newTask, setNewTask] = useState("")
const [updateData, setUpdateData] = useState("")

const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = { id : num, title : newTask, status: false}
      setToDo([...toDo, newEntry])
      setNewTask("");
    }
}

const deleteTask = (id) => {
  let newTask = toDo.filter( task => task.id !== id)
  setToDo(newTask)
}

const markDone = (id) => {
  const newTask = toDo.map( task => {
    if (task.id === id) {
      return({ ...task, status : !task.status })
    }
    return task;
  })
  setToDo(newTask)
}

const cancelUpdate = () => {
  setUpdateData("");
}

const Changetask = (e) => {
  let newEntry = {
    id: updateData.id,
    title: e.target.value,
    status :updateData.status ? true : false
  }
  setUpdateData(newEntry)
}

const updateDateTask = () => {
  let filterRecords = [...toDo].filter( task => task.id !== updateData.id);
  let updatedObject = [...filterRecords, updateData]

  setToDo(updatedObject);
  setUpdateData("");
}
  return (
    <div className="container App">
      <h2>Lista de tareas (react)</h2>

      {updateData && updateData ? (

    <div className='row'>
      <div className='col'>
        <input className='form-control'
        value={updateData && updateData.title}
        onChange={ (e) => Changetask(e)}
        ></input>
        </div>
        <div className='col-auto'>
        <button className='btn-cancelar'
        onClick={cancelUpdate}
        >Cancelar</button>
        <button className='btn-editar'
          onClick={updateDateTask}
          >Guardar</button>

      </div>

        </div>

      ) : (
        <div className='row'>
        <div className='col'>
          <input className='form-control'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} 
          ></input>
        </div>
        <div className='col-auto'>
          <button className='btn-agregar'
          onClick={addTask}
          >Agregar Tarea</button>
        </div>
      </div>

      )}




      {toDo && toDo.length ? "": "No hay tarea" }

      {toDo && toDo

      .sort((a,b) => a.id > b.id ? 1 : -1)
      .map((task, index) => {
        return (
          <React.Fragment key={task.id}>

            <div className='col taskBg'>
              <div className= {task.status ? "done" : ""}>
              <span className='taskNumber'>{index + 1}</span>
              <span className='taskText'>{task.title}</span>
              </div>

              <div className='iconsWrap'>
                <span title='Completado / No Completado'
                onClick={(e) => markDone(task.id)}
                >
                <i class="ri-checkbox-circle-fill"></i>
                </span>
                {task.status ? null : (
                  <span title='Editar' 
                  onClick={ () => setUpdateData({
                    id: task.id,
                    title: task.title,
                    status: task.status ? true : false
                  })}
                  >
                    <i class="ri-pencil-fill"></i>
                   </span>
                )}

                <span title='Eliminar' 
                onClick={() => deleteTask(task.id)}>
                <i class="ri-delete-bin-5-fill"></i>
                </span>
              </div>
            </div>
        
          </React.Fragment>
        )
      })}

    </div>
  );
}

export default App;
