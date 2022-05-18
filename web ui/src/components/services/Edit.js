import React, {useState, useEffect} from "react"
import axios from "axios"
import { Link, useParams, useNavigate } from "react-router-dom"

export default function Edit(){

    const [loadedData, setLoadedData] = useState(true)
    const [formData, setFormData] = useState({name: ''})
    const [service_id, setUserId] = useState(useParams())
    const navigate = useNavigate()

    useEffect(() => {
        axios({
            url: `http://127.0.0.1:5000/services/${service_id.id}`,
        })
        .then((response) => {
            setFormData({
                ...formData,
                ['name'] : response.data.name
            })
            setLoadedData(false)
        })
        .catch((error) => {
            console.log(error)
        });

    }, []);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    const sendData = (event) => {
        event.preventDefault()
        const service = { name: formData.name };
        axios.put(`http://127.0.0.1:5000/services/${service_id.id}`, service)
        .then((response) => {
            navigate('/services', {state: {
                withAlert : true,
                class: 'success',
                action: 'edit',
                message: 'The service has been successfully modified.',
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
                            <Link to="/services">Services</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Edit</li>
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
                                value={formData.name}
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
