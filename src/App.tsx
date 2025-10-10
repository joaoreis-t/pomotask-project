import { Footer } from "./components/sections/Footer"
import { Header } from "./components/sections/Header"
import { Main } from "./components/sections/Main"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
  

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#1B1B1B] flex flex-col min-h-screen">
      <ThemeProvider>
        <Header/>
        <Main/>
        <Footer/>
      </ThemeProvider>
    </div>
  )
}

export default App
