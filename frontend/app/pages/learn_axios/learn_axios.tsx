import axios from "axios";
import React, { useState } from "react";

export default function LearnAxiosPage() {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);

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

    return (
        <div className="container">
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
                            <div className="row">
                                <div className="col-6">
                                    <div className="card">
                                        <img
                                            src={
                                                searchData[0].show.image.medium
                                            }
                                            className="card-img-top"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Card title
                                            </h5>
                                            <p className="card-text mb-2">
                                                Start Date:
                                            </p>
                                            <p className="card-text mb-2">
                                                End Date:
                                            </p>
                                            <p className="card-text mb-2">
                                                Rating:
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
