import { useState } from "react";
import axios from "axios";

export function Test() {
    // Normal variable
    let y = 20;
    const name = "Batman";

    // useState variable (Edit / Show real-time)
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] =  useState([]);

    async function onSearchChange(event: any) {
        const inputTag = event.target
        setSearch(inputTag.value); // edit search variable
        
        const resp = await axios.get(`https://api.tvmaze.com/search/shows?q=${search}`);
        
        console.log(resp.data);
        setSearchResult(resp.data)
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
                                <div className="col-6">
                                    <div className="card">
                                        <img src = "..." className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="">Rating: {searchResult[0]["show"]["rating"]["average"]}</p>
                                            <p className="">Runtime: {searchResult[0]["show"]["runtime"]}</p>
                                            <p className="">Start date: {searchResult[0]["show"]["premiered"]}</p>
                                            <p className="">End date: {searchResult[0]["show"]["ended"]}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card">
                                        <img src = "..."className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h5 className="card-title"></h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}