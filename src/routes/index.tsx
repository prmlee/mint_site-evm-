import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "../components/Header";
import Mint from "../pages/Mint";

const Router = () =>
{ 
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Mint/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;