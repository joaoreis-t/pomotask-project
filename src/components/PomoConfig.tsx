import { useState } from "react";

interface PomoConfigProps {
  onClose: () => void
}

export const PomoConfig = ({ onClose }: PomoConfigProps) => {

  const [saved, setSaved] = useState(false);

  const [timersInMinutes, setTimersInMinutes] = useState({
    pomoTimeInMinutes: 0,
    breakTimeInMinutes: 0
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setTimersInMinutes((prev) => ({...prev, [name]: Number(value)}))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(true);
    localStorage.setItem('timersInMinutes', JSON.stringify(timersInMinutes))

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  return (
    <div className="w-[530px] h-[530px] bg-white dark:bg-[#303137] rounded-2xl">
      <h2 className="text-2xl font-medium text-[#404040] dark:text-[#BDBDBD] mt-6 text-center">Configurações</h2>
      <form onSubmit={handleSubmit} className="mt-9 ml-40">
        <label htmlFor="pomoTimeInMinutes" className="text-[20px] font-medium text-[#404040] dark:text-[#BDBDBD]">Pomodoro (Min)</label>
        <input id="pomoTimeInMinutes" type="number" min={1} max={60} name="pomoTimeInMinutes" value={timersInMinutes.pomoTimeInMinutes} onChange={handleChange} placeholder="1-60min..." className="h-[50px] border-2 rounded-[6px] border-[#ADADAD] block mt-2.5 mb-5 p-2 text-[#ADADAD]" />

        <label htmlFor="breakTimeInMinutes" className="text-[20px] font-medium text-[#404040] dark:text-[#BDBDBD]">Break (Min)</label>
        <input id="breakTimeInMinutes" type="number" min={1} max={60} name="breakTimeInMinutes" value={timersInMinutes.breakTimeInMinutes} onChange={handleChange} placeholder="1-60min..." className="h-[50px] border-2 rounded-[6px] border-[#ADADAD] block mt-2.5 mb-5 p-2 text-[#ADADAD]" />

        <div>
          <button type="submit" className={`w-32 h-10 rounded-[6px] bg-[#F78770] text-white text-[20px] font-medium mr-3.5 hover:cursor-pointer transition-transform duration-150 active:scale-95  ${saved ? 'bg-green-500' : 'bg-[#F78770]'}`} >{!saved ? "Salvar" : "Salvo!"}</button>
          <button type="button" onClick={onClose} className="w-20 h-10 rounded-[6px] border border-[#404040] dark:border-[#BDBDBD] text-[18px] font-medium text-[#404040] dark:text-[#BDBDBD] hover:cursor-pointer transition-transform duration-150 active:scale-95">Fechar</button>
        </div>
      </form>
    </div>
  );
}