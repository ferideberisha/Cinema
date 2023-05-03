import React, { useState } from "react"
import "./home.css"
import { homeData } from "../../dummyData"
import Home from "./Home"

const Homes = () => {
  const [setItems] = useState(homeData)

  return (
    <>
      <section className='home'>
        <Home items={setItems} />
      </section>
      <div className='mragin'></div>
    </>
  )
}

export default Homes
