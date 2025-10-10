import { useEffect, useState } from "react";
import Check from '../../assets/check-w.png'
import DeleteTask from '../../assets/lixeira-w.png'

type Task = {
  id: number,
  text: string,
  isCheck?: boolean
};

export const ToDoList = () => {
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });
  const [newTask, setNewTask] = useState("");

  function handleCheck(taskId: Number){
    let task = tasks.find(task => task.id === taskId);
    if(task){
      task.isCheck = !task.isCheck;
      setTasks(prev => {
        const newTasks = prev.map(olderTask => {
          if(olderTask.id === task.id){
            return task;
          }
          return olderTask;
        })
        return newTasks;
      })
    }
  }

  function handleDelete(taskId: Number){
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    
    if (!newTask.trim()) return; 

    if (tasks.length >= 10) {
      alert("Você atingiu o limite de 10 tarefas!");
      return;
    }

    const newTaskObj = {
      id: Date.now(), 
      text: newTask,
      isCheck: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <section className="w-[588px] h-[588px] bg-white dark:bg-[#212227] rounded-2xl shadow-md flex flex-col" >
      <h2 className="mt-6 mb-5 text-2xl font-medium text-[#404040] dark:text-[#BDBDBD] text-center">To-Do List</h2>
      <form onSubmit={handleSubmit} className="mx-10 flex mb-12">
        <input type="text" name="task" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Adicionar nova tarefa..." maxLength={36} className="w-4/5 h-12 pl-4 py-2.5 border-2 border-[#ADADAD] rounded-[6px] text-[20px] text-[#ADADAD] mr-4" />
        <button type="submit" className="flex-grow bg-[#F78770] rounded-[6px] text-white font-medium text-[20px]">Add</button>
      </form>
      <div className="mx-10 mb-25 flex-grow overflow-y-auto">
         {tasks.map((task) => (
          <div key={task.id} className="w-full box-border h-15 bg-[#F78770] rounded-[6px] shadow-[1px_2px_6px_rgba(0,0,0,0.25)] mb-[14px] px-4 flex items-center justify-between text-white text-[20px]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 border-2 border-white rounded-full group flex justify-center items-center hover:cursor-pointer">
                <img src={Check} alt="marcar tarefa" onClick={()=>{handleCheck(task.id)}} className={`${task.isCheck ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-200 w-[80%] h=[80%]`}/>
              </div>
              <span className={`${task.isCheck ? "line-through" : ""}`}>{task.text}</span>
            </div>
            <button className="group hover:cursor-pointer" onClick={() => {handleDelete(task.id)}}>
              <img src={DeleteTask} alt="deletar tarefa" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </div>
         ))}
      </div>
    </section>
  );
}