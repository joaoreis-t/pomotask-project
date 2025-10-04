import { useEffect } from 'react'
import sun from '../assets/sun.png'
import moon from '../assets/moon.png'
import { useTheme } from '../context/ThemeContext';

interface SwitchButtonProps {
  className?: string
}

export const SwitchButton = ({className}: SwitchButtonProps) =>{

  const { isLight, setIsLight } = useTheme();

  useEffect(() => {
    if(isLight){
      document.documentElement.classList.remove("dark");
    } else{
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem('theme', JSON.stringify(isLight));
  }, [isLight])

  return (
    <span className={` ${className ?? ""}`}>
      <button onClick={()=> setIsLight(!isLight)} className={`w-[70px] h-[35px] rounded-full p-1.5 flex justify-between transition-colors duration-300 hover:cursor-pointer ${ isLight ? "bg-[#F78770]" : "bg-[#40424B]" }`}>
      {
        isLight ? (
          <>
            <img src={sun} />
            <div className='bg-white w-6 h-6 rounded-full'></div>
          </>
        ) : (
          <>
            <div className='bg-white w-6 h-6 rounded-full'></div>
            <img src={moon} />
          </>
        )

      }
    </button>
    </span>
  )
}