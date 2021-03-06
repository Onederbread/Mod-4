import React, { useEffect, useState } from "react"
import { Link, Switch, Route } from "react-router-dom"
import Cat from "./components/Cat"
import Dog from "./components/Dog"
import Home from "./components/Home"
import axios from "axios"

function App() {

  const [inputData, setInputData] = useState({ recipient: '', message: '', sender: '' })
  const [catImgData, setCatImgData] = useState({ catImg: '' })
  const [dogImgData, setDogImgData] = useState({ dogImg: '' })

  function handleChange(event) {
    console.log('worked')
    const { name, value } = event.target
    setInputData(prevInputData => ({ ...prevInputData, [name]: value }))
    console.log(inputData.recipient)
  }

  useEffect(() => {
    const getCat = () => {
      axios.get('https://aws.random.cat/meow')
        .then(res => {
          console.log(res.data.file)
          setCatImgData({ catImg: res.data.file })
        })
        .catch(err => console.log(err))
    }
    getCat()
  }, [])

  useEffect(() => {
    const getDog = () => {
      axios.get('https://random.dog/woof.json')
        .then(res => {
          console.log(res.data.url)
          setDogImgData({ dogImg: res.data.url })
        })
        .catch(err => console.log(err))
    }

    getDog()
  }, [])

  return (
    <>
      <nav className="nav-bar" >
        <span className="link-wrapper" >
          <Link to="/" style={{ color: "whitesmoke" }}>Home</Link>
          <Link to="/cat" style={{ color: "whitesmoke" }}>Cat</Link>
          <Link to="/dog" style={{ color: "whitesmoke" }}>Dog</Link>
        </span>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home
            catImg={catImgData.catImg}
            dogImg={dogImgData.dogImg}
          />
        </Route>
        <Route path="/cat">
          <Cat
            recipient={inputData.recipient}
            message={inputData.message}
            sender={inputData.sender}
            handleChange={handleChange}
          />
        </Route>
        <Route path="/dog">
          <Dog
            recipient={inputData.recipient}
            message={inputData.message}
            sender={inputData.sender}
            handleChange={handleChange}
          />
        </Route>
      </Switch>
    </>
  )
}

export default App