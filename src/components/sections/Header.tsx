import logo from '../../assets/icon-logo.png'
import { SwitchButton } from '../SwitchButton'

export const Header = () => {
  return (
    <header className='pt-7 grid grid-cols-3 items-center pr-[122px]'>
      <span></span>
      <div className='flex gap-3.5 items-center justify-center'>
        <img src={logo} alt="Logo do Pomotask" />
        <h1 className='text-3xl font-medium text-[#404040] dark:text-[#BDBDBD]'>Pomotask</h1>
      </div>
      <SwitchButton className="flex justify-end" />
    </header>
  )
}