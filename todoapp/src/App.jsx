import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);



  useEffect(() => {
    let todoStringg = localStorage.getItem("todos")
    if(todoStringg){
     let todos = JSON.parse( localStorage.getItem("todos") );
     setTodos(todos)

    }
    
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  }

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}]);
    setTodo("");
    
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

 
  const handleEdit = (e, id) => {
   let t = todos.filter(i=>i.id === id);
   setTodo(t[0].todo);
    let newTodos = todos.filter(item=> {
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLS()
  }

  const handleDelete = (e,id) => {
    confirm("Are you sure you want to delete this todo?");

    let newTodos = todos.filter(item=> {
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLS()

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    
    let index = todos.findIndex(item =>{
      return item.id === id
    })
    
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }
  

  return (
    <>
    <Navbar />

      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-xl text-center'>MyTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className='text-lg font-bold' >Add a Todo</h2>

<div className="flex">
<input onChange={handleChange} value={todo} type="text" className='w-full bg-white rounded-lg px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-slate-700 hover:bg-violet-950 p-2 py-1 text-sm font-bold rounded-md text-white disabled:bg-slate-700 mx-2'>Save</button>
</div>
          
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished Todos
        <div className="h-[1px] bg-black opacity-15 w-3/4 mx-auto my-2"></div>
          <h2 className=' text-lg font-bold'>Your Todos</h2>

          <div className="todos">
            {todos.length===0 && <div className='my-5'>No todos added yet</div>}

            {todos.map(item=>{

            return (showFinished || !item.isCompleted)&& <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5 '>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}> {item.todo} </div>
              </div>

            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit (e, item.id)} } className='bg-slate-600 hover:bg-violet-950 p-3 py-1 text-sm font-bold rounded-md text-white mx-1'>Edit</button>
              <button onClick={(e)=>{handleDelete (e, item.id)}} className='bg-slate-600 hover:bg-violet-950 p-3 py-1 text-sm font-bold rounded-md text-white mx-1'>Delete</button>
            </div>
          </div>
           })}
        </div>
      </div>
    </>
  )
}

export default App
