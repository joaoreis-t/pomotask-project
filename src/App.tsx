import { Header } from "./components/sections/Header"
import { Main } from "./components/sections/Main"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
  

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#1B1B1B]">
      <ThemeProvider>
        <Header/>
        <Main/>
      </ThemeProvider>
    </div>
  )
}

export default App
