import { useTheme } from "../../context/ThemeContext"
import configWM from '../../assets/configuracoes-wM.png'
import configDM from '../../assets/configuracoes-dM.png'
import { PomoConfig } from "../PomoConfig";
import { useEffect, useState, useRef } from "react";
import { formatTime } from "../../utils/FormatTime";

export const Pomodoro = () => {

  const {isLight} = useTheme();

  const [showConfig, setShowConfig] = useState(false);

  const savedTimers = localStorage.getItem("timersInMinutes");
  const timersFromStorage = savedTimers ? JSON.parse(savedTimers) : { pomoTimeInMinutes: 25, breakTimeInMinutes: 5 };
  const [timers, setTimers] = useState(timersFromStorage);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timers.pomoTimeInMinutes * 60); 

  const intervalRef = useRef<number | null>(null)
  const isInBreakRef = useRef(false);
  
  const handleStartPause = () => {
    if(isRunning){
      clearInterval(intervalRef.current || undefined);
      intervalRef.current = null;
      setIsRunning(false);
    } else{
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          return prev - 1;
        })
      }, 1000)
    }
  }

  useEffect(() => {    
    if(timeLeft === 0){
      if(isInBreakRef.current){
        setTimeLeft(timers.pomoTimeInMinutes * 60);
      } else{
         setTimeLeft(timers.breakTimeInMinutes * 60);
      }
      isInBreakRef.current = !isInBreakRef.current;
      setIsRunning(false);
      clearInterval(intervalRef.current || undefined);
      intervalRef.current = null;
    }
  }, [timeLeft]);

  const handleReset = () => {
    clearInterval(intervalRef.current || undefined);
    intervalRef.current = null;
    isInBreakRef.current = false;
    setIsRunning(false);
    setTimeLeft(timers.pomoTimeInMinutes * 60);
  };

  useEffect(() => {
      const savedTimers = localStorage.getItem("timersInMinutes");
      const timersFromStorage = savedTimers ? JSON.parse(savedTimers) : { pomoTimeInMinutes: 25, breakTimeInMinutes: 5 };
      setTimers(timersFromStorage);
      setTimeLeft(timersFromStorage.pomoTimeInMinutes * 60);
  }, [showConfig])

  return (
    <section className="relative w-[588px] h-[588px] rounded-2xl shadow-md grid grid-cols-1 justify-items-center bg-white dark:bg-[#212227]" >
        <h2 className="mt-6 text-2xl font-medium text-[#404040] dark:text-[#BDBDBD]">Pomodoro</h2>
        <div className="w-80 h-80 bg-[#F78770] rounded-full flex items-center justify-center">
          <p className="text-[65px] font-medium text-white">{formatTime(timeLeft)}</p>
        </div>
        <div className="flex gap-2.5">
          <button className="w-[90px] h-10 rounded-[6px] bg-[#F78770] text-white text-[20px] font-semibold hover:cursor-pointer transition-transform duration-150 active:scale-95" onClick={handleStartPause}>{isRunning ? "Pause" : "Start"}</button>
          <button className="w-20 h-10 rounded-[6px] border border-[#404040] dark:border-[#BDBDBD] text-[#404040] dark:text-[#BDBDBD] font-medium hover:cursor-pointer transition-transform duration-150 active:scale-95" onClick={handleReset}>Reset</button>
          <button onClick={() => setShowConfig(true)} className="w-10 h-10 rounded-[6px] border border-[#404040] dark:border-[#BDBDBD] p-1 hover:cursor-pointer transition-transform duration-150 active:scale-95">
            {isLight ? <img src={configWM}/> : <img src={configDM}/>}
          </button>
        </div>

        {showConfig && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-black/25 rounded-2xl">
            <PomoConfig onClose={() => setShowConfig(false)} />
          </div>
        )}
      </section>
  );
}