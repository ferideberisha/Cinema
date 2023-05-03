import React, { useState } from "react"
import { trending } from "../../dummyData"
import Home from "../homes/Home"
import "./trending.css"

const Trending = () => {
  const [setItem] = useState(trending)
  return (
    <>
      <section className='trending'>
        <Home items={setItem} />
      </section>
    </>
  )
}

export default Trending
