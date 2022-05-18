import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Create(){

    const [loadedData, setLoadedData] = useState(false)
    const [formData, setFormData] = useState({name: ''})
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    const sendData = (event) => {
        event.preventDefault()
        const service = { name: formData.name };
        axios.post('http://127.0.0.1:5000/services', service)
        .then((response) => {
            navigate('/services', {state: {
                withAlert : true,
                class: 'success',
                action: 'add',
                message: 'The service has been added successfully.',
            }})
        })
        .catch((error) => {
            console.log(error)
        });
    }

    return(
        <div className="row mt-4">
            <div className="row">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/services">Accounts</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Create</li>
                    </ol>
                </nav>
            </div>
            {loadedData
                ? <div>Loading..</div>
                : <div>
                    <form onSubmit={sendData}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input 
                                onChange={handleInputChange} 
                                className="form-control" 
                                id="name"
                                name="name"
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                  </div>
            }

        </div>
    )
};
