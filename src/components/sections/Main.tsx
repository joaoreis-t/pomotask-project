import { Pomodoro } from "./Pomodoro";
import { ToDoList } from "./ToDoList";


export const Main = () => {

  return(
    <main className="flex gap-5 px-[122px] justify-center mt-14">
      <Pomodoro/>
      <ToDoList />
    </main>
  );
}