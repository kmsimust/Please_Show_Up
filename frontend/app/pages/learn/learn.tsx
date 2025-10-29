import React, { useState } from "react";

export default function LearnPage() {
    const x = 10; // Normal variable
    //const [firstname, setFirstname] = useState('')
    // {} is a object
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        age: "",
    });

    function formChange(event: any) {
        const name = event.target.name; // name = firstname
        const temp = structuredClone(formData); // temp = {firstname: "", lastname: "", age: ""}
        setFormData({
            ...temp,
            [name]: event.target.value,
        });

        //event.target.value;
    }

    /*function onFirstnameChange(event: any) {
        setFirstname(event.target.value); // modify value of firstname
    }
    function onLastnameChange(event: any) {
        setLastname(event.target.value); // modify value of lastname
    }*/

    return (
        <div className="container" style={{ fontSize: 16 }}>
            <div className="row">
                <div className="offset-4 col-4">
                    <div className="card">
                        <h2 className="card-header">Profile</h2>
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-3">
                                    <label htmlFor="">Firstname:</label>
                                </div>
                                <div className="col-9">
                                    <input
                                        type="text"
                                        name="firstname"
                                        className="form-control"
                                        value={formData.firstname}
                                        onChange={formChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-3">
                                    <label htmlFor="">Lastname:</label>
                                </div>
                                <div className="col-9">
                                    <input
                                        type="text"
                                        name="lastname"
                                        className="form-control"
                                        value={formData.lastname}
                                        onChange={formChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-3">
                                    <label htmlFor="">Age:</label>
                                </div>
                                <div className="col-9">
                                    <input
                                        type="number"
                                        name="age"
                                        className="form-control"
                                        value={formData.age}
                                        onChange={formChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <p>My full name = {formData.firstname}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
