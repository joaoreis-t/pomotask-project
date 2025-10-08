import { Pomodoro } from "./Pomodoro";


export const Main = () => {

  return(
    <main className="flex gap-5 px-[122px] justify-center mt-14">
      <Pomodoro/>
      <section className="w-[588px] h-[588px] bg-white rounded-2xl shadow-md" >
      </section>
    </main>
  );
}