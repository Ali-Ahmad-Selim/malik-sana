import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import NewArrival from './components/newArrival'
import Card from './components/Card'
import Subscribe from './components/subscribe'
const page = () => {
  return (
    <div>
      <Hero />
      <NewArrival />
      <Card />
    
      <About />
      <Subscribe />
    </div>
  )
}

export default page