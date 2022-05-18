import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Edit(){
    const [services, setServices] = useState([])
    const [loadedData, setLoadedData] = useState(true)
    const [statusOptions, setstatusOptions] = useState(['Available', 'Used', 'Locked'])
    const [formData, setFormData] = useState({name: '', service_id: '', status: statusOptions[0]})
    const [user_id, setUserId] = useState(useParams())
    const navigate = useNavigate()

    useEffect(() => {
        axios({
            url: "http://127.0.0.1:5000/services",
        })
        .then((response) => {
            setServices(response.data)
            axios({
                url: `http://127.0.0.1:5000/accounts/${user_id.id}`,
            })
            .then((response) => {
                setFormData({
                    ...formData,
                    ['name'] : response.data.name,
                    ['status'] : response.data.status,
                    ['service_id'] : response.data.service_id,
                })    
                setLoadedData(false)
            })
            .catch((error) => {
                console.log(error)
            });
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
        const account = { name: formData.name, service_id : formData.service_id, status : formData.status};
        axios.put(`http://127.0.0.1:5000/accounts/${user_id.id}`, account)
        .then((response) => {
            navigate('/accounts', {state: {
                withAlert : true,
                class: 'success',
                action: 'edit',
                message: 'The account has been successfully modified.',
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
                            <Link to="/accounts">Accounts</Link>
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
                                value={formData.name}
                                onChange={handleInputChange} 
                                className="form-control" 
                                id="name"
                                name="name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="service_id" className="form-label">Stream Service</label>
                            <select 
                                value={formData.service_id}
                                onChange={handleInputChange}
                                className="form-select" 
                                id="service_id"
                                name="service_id"
                            >
                                {services.map(i =>
                                        <option key={i.id} value={i.id}>{i.name}</option>
                                    )
                                };
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select  
                                value={formData.status}
                                onChange={handleInputChange}  
                                className="form-select" 
                                id="status"
                                name="status"
                            >
                                {statusOptions.map(i =>
                                        <option key={i} value={i}>{i}</option>
                                    )
                                };
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                  </div>
            }

        </div>
    )
};
