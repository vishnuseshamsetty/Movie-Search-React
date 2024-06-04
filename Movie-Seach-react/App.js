import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
    let [movie, setMovie] = useState("")//setMovie(e.target.value) se movies m store krna h 
    let [result, setResult] = useState([])
    let [isloading, setIsloading] = useState(false)
    let [status , setStatus] = useState(null)
    
 

    const handleSearch = () => {        //setIsloading button click krte hi sbse phle loading aayega 
        setResult([]);         //setresult mtlb phle empty homna page ka 
        setIsloading(true)     //setLoading true mtlb loading wala status show hona 
        axios.get(`https://www.omdbapi.com/?apikey=c951ff1&s=${movie}`)
            .then((res) => {
                setIsloading(false) 
                setStatus(true) // setloading yha true kr rhe h taki response k bad loading gayab hojaye
                if (res.data.Response == "True") {
                    setResult(res.data.Search)
                } else {
                    setResult([])
                    setStatus(false)
                }
            })
        
    }
    return (
        <>
            <div className="field">
                <input
                    value={movie}
                    placeholder="Search here" onChange={(e) => { setMovie(e.target.value) }} />
                <button onClick={() => { handleSearch() }}>Search</button>
            </div>
            {isloading == true ? <p class="status"> loading...</p> : ""}
            {status == false ? <p class='status'>   404 Not Found !!</p>: ""}

            <div className="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {result.map((item, i) => {
                        return <div class="col">
                            <div class="card">
                                <img src={item.Poster} class="card-img-top poster" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{item.Title}</h5>
                                    <p class="card-text">Realese Year : {item.Year}</p>

                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}
export default App;