import { useTheme } from "../../context/ThemeContext";
import configWM from '../../assets/configuracoes-wM.png'
import configDM from '../../assets/configuracoes-dM.png'

export const Main = () => {

  const {isLight} = useTheme();

  return(
    <main className="flex gap-5 px-[122px] justify-center mt-14">
      <section className="w-[588px] h-[588px] rounded-2xl shadow-md grid grid-cols-1 justify-items-center bg-white dark:bg-[#212227]" >
        <h2 className="mt-6 text-2xl font-medium text-[#404040] dark:text-[#BDBDBD]">Pomodoro</h2>
        <div className="w-80 h-80 bg-[#F78770] rounded-full flex items-center justify-center">
          <p className="text-[65px] font-medium text-white">25:00</p>
        </div>
        <div className="flex gap-2.5">
          <button className="w-[90px] h-10 rounded-[6px] bg-[#F78770] text-white text-[20px] font-semibold hover:cursor-pointer transition-transform duration-150 active:scale-95">Start</button>
          <button className="w-20 h-10 rounded-[6px] border border-[#404040] dark:border-[#BDBDBD] text-[#404040] dark:text-[#BDBDBD] font-medium hover:cursor-pointer transition-transform duration-150 active:scale-95">Reset</button>
          <button className="w-10 h-10 rounded-[6px] border border-[#404040] dark:border-[#BDBDBD] p-1 hover:cursor-pointer transition-transform duration-150 active:scale-95">
            {isLight ? <img src={configWM}/> : <img src={configDM}/>}
          </button>
        </div>
      </section>

      <section className="w-[588px] h-[588px] bg-white rounded-2xl shadow-md" >
        
      </section>
    </main>
  );
}