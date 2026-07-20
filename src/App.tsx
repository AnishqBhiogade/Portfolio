import PixelCursor from './components/PixelCursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Connect from './sections/Connect'

export default function App() {
  return (
    <div className="min-h-screen">
      <PixelCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Connect />
      </main>
      <Footer />
    </div>
  )
}