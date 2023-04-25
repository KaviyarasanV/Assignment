import React, { useState, useEffect } from 'react';
import API from '../../Services/BaseService';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import Action from './Action';
import ls from 'local-storage';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

const Customer = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.Reducer.payload);
    const [info, setInfo] = useState([]);
    const [count, setCount] = useState(1);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [fromDateErr, setFromDateErr] = useState("");
    const [toDateErr, setToDateErr] = useState("");

    useEffect(() => {
        handleInfo(count);
    }, []);

    const handleInfo = (flag) => {
        API.get(`beers?page=${flag}&per_page=10`)
            .then((response) => {
                setInfo(response.data);
                if (response.data.length) {
                    if (flag === 1) {
                        const page_res = [{ page_number: flag, data: response.data }];
                        ls.set('userDetails', page_res);
                        dispatch(Action.success(page_res));
                    }
                    else {
                        const page_res = [{ page_number: flag, data: response.data }];
                        const res = [...userData, ...page_res]
                        ls.set('userDetails', res);
                        dispatch(Action.success(res));
                    }
                }
            });
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Tagline',
            selector: row => row.tagline,
            sortable: true,
        },
        {
            name: 'First Brewed',
            selector: row => row.first_brewed,
            sortable: true,
        },
    ];

    const getCount = (flag) => {
        if (flag === 'Inc' && info.length) {
            const CNTValue = count + 1;
            setCount(CNTValue);
            const filterInfo = userData.filter(userData => userData.page_number === CNTValue);
            if (filterInfo.length) {
                setInfo(filterInfo[0].data);
            }
            else {
                handleInfo(CNTValue);
            }
        }
        else {
            if (count > 1) {
                const CNTValue = count - 1;
                setCount(CNTValue);
                const filterInfo = userData.filter(userData => userData.page_number === CNTValue);
                if (filterInfo.length) {
                    setInfo(filterInfo[0].data);
                }
                else {
                    handleInfo(CNTValue);
                }
            }
        }
    }

    // ----------filter codes------------
    const inputPropsFrom = {
        placeholder: "MM-YYYY",
        value: fromDate,
    };
    const inputPropsTo = {
        placeholder: "MM-YYYY",
        value: toDate,
    };

    const getFromDate = (event) => {
        if (event._isAMomentObject == true) {
            setFromDate(event.format("MM-YYYY"));
        }
    }

    const getToDate = (event) => {
        if (event._isAMomentObject == true) {
            setToDate(event.format("MM-YYYY"));
        }
    }
    const getFilter = () => {
        setFromDateErr('');
        setToDateErr('');
        if (!fromDate && !toDate) {
            setFromDateErr('Brewed Before is required');
            return;
        }
        if (fromDate && !toDate) {
            setToDateErr('Brewed After is required');
            return;
        }
        if (!fromDate && toDate) {
            setFromDateErr('Brewed Before is required');
            return;
        }
        API.get(`beers?brewed_before=${fromDate}&brewed_after=${toDate}`)
            .then((response) => {
                setInfo(response.data);
            });
    }

    const getClear = () => {
        setFromDate('');
        setToDate('');
        setFromDateErr('');
        setToDateErr('');
        const filterInfo = userData.filter(userData => userData.page_number === count);
        setInfo(filterInfo[0].data);
    }

    return (
        <div>
            <section id="innerpage" className="innerpage inventoryPage">
                <div className="container">
                    <div className="row">
                        <div className="common-heading-sec col-lg-12">
                            <div className="me-auto">
                                <div className="search-bar datePickerBlock">
                                    <label htmlFor="FromDate" className="col-form-label">Brewed Before</label>
                                    <Datetime closeOnSelect={true} inputProps={inputPropsFrom} timeFormat={false} dateFormat="MM-YYYY"
                                        name="Date" onChange={getFromDate} id="meeting_date1" />
                                    <p id="fromDateError" className="form-input-error">{fromDateErr}</p>
                                </div>
                                <div className="search-bar datePickerBlock">
                                    <label htmlFor="ToDate" className="col-form-label">Brewed After</label>
                                    <Datetime closeOnSelect={true} inputProps={inputPropsTo} timeFormat={false} dateFormat="MM-YYYY"
                                        name="Date" onChange={getToDate} id="meeting_date2" />
                                    <p id="toDateError" className="form-input-error">{toDateErr}</p>
                                </div>
                                <div className="search-clear me-2" onClick={getFilter} ><i
                                    className="fa-solid fa-magnifying-glass me-2"></i>Find</div>
                                <div className="search-clear me-2" onClick={getClear} ><i
                                    className="fa-solid fa-ban me-2"></i>Clear</div>
                            </div>
                        </div>
                        <div className="col-12 mt-0">
                            <DataTable className='girdTable'
                                highlightOnHover
                                columns={columns}
                                data={info} />
                        </div>
                    </div>
                </div>
                <nav aria-label="Page navigation example mt-5" >
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link" onClick={() => getCount('Dec')} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link">{count}</a></li>
                        <li className="page-item">
                            <a className="page-link" onClick={() => getCount('Inc')} aria-label="Previous">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </section>
        </div>
    )
}
export default Customer;