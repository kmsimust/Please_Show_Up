import axios from "axios";
import React, { useEffect, useState } from "react";

import "./learn_axios.css";

export default function LearnAxiosPage() {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);

    useEffect(() => { // Run at page loaded / Refresh
        console.log("Page loaded");
    }, []);

    // JS is Asynchronous Programming
    async function onSearchChange(event: any) {
        setSearch(event.target.value); // 0.001S
        // call TVMaze API
        const resp = await axios.get(
            "https://api.tvmaze.com/search/shows?q=" + search,
        ); // 2S
        console.log(resp.data); // 0.0001S
        setSearchData(resp.data);
    }

    function MoviesCard() {
        return (
            <div className="row">
                {searchData.map((obj) => {
                    return (
                        <div className="col-6 mb-4">
                            <div className="card h-100">
                                <img
                                    src={obj?.show?.image?.original}
                                    className="card-img-top movie-cover"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {obj?.show?.name}
                                    </h5>
                                    <p className="card-text mb-2">
                                        Start Date:
                                        {obj?.show?.premiered}
                                    </p>
                                    <p className="card-text mb-2">
                                        End Date:
                                        {obj?.show?.ended}
                                    </p>
                                    <p className="card-text mb-2">
                                        Rating:
                                        {obj.show.rating.average
                                            ? obj.show.rating.average
                                            : " -"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="container">
            {JSON.stringify(searchData?.[0]?.show?.name)}
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="card shadow">
                        <h3 className="card-header bg-primary text-white">
                            Search movie
                        </h3>
                        <div className="card-body">
                            <input
                                type="text"
                                className="form-control mb-4"
                                name="search"
                                value={search}
                                onChange={onSearchChange}
                                placeholder="Enter your search name"
                            />
                            {/* React-component */}
                            <MoviesCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
