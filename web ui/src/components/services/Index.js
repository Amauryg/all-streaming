import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";


export default function Index(){
    const location = useLocation();
    const [services, setServices] = useState([])
    const [loadedData, setLoadedData] = useState(true)
    const [alert, setAlert] = useState({show: false, message: '', class: ''})

    const getServices = ()=>{
        setLoadedData(true)
        axios({
            url: "http://127.0.0.1:5000/services",
        })
        .then((response) => {
            setServices(response.data);
            setLoadedData(false)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        if(location.state !== null){
             setAlert({
                            show: location.state.withAlert,
                            message: location.state.message,
                            class: location.state.class,
                        })
        }
        getServices()
        
    }, []);

    const onDelete = (item) => {
        axios.delete(`http://127.0.0.1:5000/services/${item.id}`)
        .then((response) => {
            setAlert({
                show: true,
                message: 'The service has been successfully removed',
                class: 'danger',
            })
            getServices()
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
                        <li className="breadcrumb-item active" aria-current="page">Services</li>
                    </ol>
                </nav>
            </div>
            {alert.show
                ?<div className="row">
                    <div className={`alert alert-dismissible fade show alert-${alert.class}`} role="alert">
                        {alert.message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                :<div></div>
            }

            <div className="text-end mb-3">
                <Link className="btn btn-primary" to="/services/create" >New Service</Link>
            </div>
            {loadedData
                ? <div>Loading..</div>
                : <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Actions{loadedData}</th>
                            <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                services.map(
                                    (i)=>(
                                        <tr key={i.id}>
                                            <td scope="row">
                                                <Link to={"/services/edit/"+i.id} className="btn btn-outline-primary btn-sm me-1">Edit</Link>
                                                <a 
                                                    onClick={() => { if (window.confirm('Are you sure you wish to delete this service?')) onDelete(i) } } 
                                                    className="btn btn-outline-danger btn-sm"
                                                >
                                                    Delete
                                                </a>
                                            </td>
                                            <td>{i.name}</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                  </div>
            }
        </div>
    )
};
