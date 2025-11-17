import { useEffect, useState } from "react";
import axios from "axios";

import { showTextByKey } from "~/utils/text-util";
import "./test.css";

export function Test() {
    // Normal variable
    let y = 20;
    const name = "Batman";

    // useState variable (Edit / Show real-time)
    const [search, setSearch] = useState(""); // use at search
    const [searchResult, setSearchResult] =  useState([]);

    useEffect(() => {
        someFunction()
    }, [])

    const onSearchChange = async (event: any) => {
        const inputTag = event.target
        setSearch(inputTag.value); // edit search variable
        
        const resp = await axios.get(`https://api.tvmaze.com/search/shows?q=${search}`);
        
        console.log(resp.data);
        setSearchResult(resp.data);

    }

    // arrow function
    const someFunction = () => {
        console.log('Page loaded');
    }

    function MovieList() {
        return searchResult.map((obj) => {
            return (
                <div className="col-6 mb-4" key={obj?.show?.id}>
                    <div className="card">
                        <img className="card-img-top movie-cover" src = {showTextByKey(obj?.show?.image?.medium, "/default_user.png")} alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{showTextByKey(obj?.show?.name, 'No title')}</h5>
                            <p className="mb-2">Rating: {showTextByKey(obj?.show?.rating?.average, '-')}</p>
                            <p className="mb-2">Runtime: {showTextByKey(obj?.show?.runtime, "-")} </p>
                            <p className="mb-2">Start date: {showTextByKey(obj?.show?.premiered, "-")} </p>
                            <p className="mb-2">End date: {showTextByKey(obj?.show?.ended, "-")} </p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="card">
                        <h3 className="card-header bg-primary text-white">Seach movie</h3>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <input value={search} onChange={onSearchChange} type="text" placeholder="Enter your movie name" className="form-control" />
                                    Your search = {search}
                                </div>
                            </div>
                            <div className="row">
                                <MovieList/> {/* React-component */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}