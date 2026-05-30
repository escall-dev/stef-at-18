import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/birthday/Header'
import Hero from '../components/birthday/Hero'
import About from '../components/birthday/About'
import EventDetails from '../components/birthday/EventDetails'
import Footer from '../components/birthday/Footer'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <EventDetails />
      <Footer />
    </div>
  )
}

