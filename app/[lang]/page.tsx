import Footer from "./components/Home/Footer"
import Main from "./components/Home/Main"
import Projects from "./components/Home/Projects"

const Home = () => {
  return (
    <div className="relative flex flex-col items-center min-h-max max-md:mb-10">
      <Main />
      <Projects />
      <Footer />
    </div>
  )
}

export default Home
