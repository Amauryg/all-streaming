import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";


export default function Index(){
    const location = useLocation();
    const [accounts, setAccounts] = useState([])
    const [loadedData, setLoadedData] = useState(true)
    const [statusOptions, setstatusOptions] = useState(['Everything','Available', 'Used', 'Locked'])
    const [filters, setFilters] = useState({service_id: 0, status: statusOptions[0]})
    const [services, setServices] = useState([])
    const [alert, setAlert] = useState({show: false, message: '', class: ''})

    const getAccounts = (f = '')=>{
        setLoadedData(true)
        axios({
            url: "http://127.0.0.1:5000/accounts/search"+f,
        })
        .then((response) => {
            setAccounts(response.data);
            setLoadedData(false)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const useFilters = (event)=>{
        event.preventDefault()
        var filter_str = '?'
        if(filters.service_id != 0){
            filter_str += ('service_id='+filters.service_id+'&')
        }
        if(typeof filters.status != 'undefined' && filters.status != 'Everything'){
            filter_str += ('status='+filters.status)
        }
        getAccounts(filter_str)
    }

    useEffect(() => {
        if(location.state !== null){
            setAlert({
                           show: location.state.withAlert,
                           message: location.state.message,
                           class: location.state.class,
                       })
       }
        setLoadedData(true)
        axios({
            url: "http://127.0.0.1:5000/services",
        })
        .then((response) => {
            var services_respose = response.data
            services_respose.unshift({id : 0, name : 'Everything'})
            setServices(response.data)
            setFilters({
                ...services,
                ['service_id'] : response.data[0].id
            })
            getAccounts('')
        })
        .catch((error) => {
            console.log(error)
        });
        
    }, []);

    const handleInputChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name] : event.target.value
        })
    }


    const onDelete = (item) => {
        axios.delete(`http://127.0.0.1:5000/accounts/${item.id}`)
        .then((response) => {
            setAlert({
                show: true,
                message: 'The account has been successfully removed',
                class: 'danger',
            })
            getAccounts()
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
                        <li className="breadcrumb-item active" aria-current="page">Accounts</li>
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
            <form onSubmit={useFilters} className="row g-3">
                <div className="col-md-1">
                    <div className="fw-bold pt-4">
                        Filters:
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="status" className="form-label col-form-label-sm">Status</label>
                    <select 
                        defaultValue={filters.status}
                        onChange={handleInputChange}
                        id="status" 
                        className="form-select form-select-sm"
                        name="status"
                    >
                    {statusOptions.map(i =>
                            <option key={i} value={i}>{i}</option>
                        )
                    };
                    </select>
                </div>
                <div className="col-md-3">
                    <label htmlFor="service_id" className="form-label col-form-label-sm">Streaming Service</label>
                    <select 
                        defaultValue={filters.service_id}
                        onChange={handleInputChange}
                        id="service_id" 
                        className="form-select form-select-sm"
                        name="service_id"
                    >
                    {services.map(i =>
                            <option key={i.id} value={i.id}>{i.name}</option>
                        )
                    };
                    </select>
                </div>
                <div className="col-md-3">
                    <button type="submit" className="btn btn-success mt-4">Filter</button>
                </div>
                
            </form>
            <div className="text-end mt-3">
                <Link className="btn btn-primary" to="/accounts/create" >New Account</Link>
            </div>
            {loadedData
                ? <div>Loading..</div>
                : <div>
                    {accounts.length < 1
                    ?   <div className="alert alert-warning text-center mt-3" role="alert">
                             No records to show
                        </div>
                    :   <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Actions</th>
                                <th scope="col">Name</th>
                                <th scope="col">Service</th>
                                <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    accounts.map(
                                        (i)=>(
                                            <tr key={i.id}>
                                                <td scope="row">
                                                    <Link to={"/accounts/edit/"+i.id} className="btn btn-outline-primary btn-sm me-1">Edit</Link>
                                                    <a 
                                                        onClick={() => { if (window.confirm('Are you sure you wish to delete this account?')) onDelete(i) } } 
                                                        className="btn btn-outline-danger btn-sm"
                                                    >
                                                        Delete
                                                    </a>
                                                </td>
                                                <td>{i.name}</td>
                                                <td>{i.service.name}</td>
                                                <td>{i.status}</td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>

                    }

                  </div>
            }
        </div>
    )
};
