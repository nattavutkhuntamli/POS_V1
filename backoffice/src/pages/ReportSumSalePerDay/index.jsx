import React, { useEffect, useState } from 'react'
import Template from '../../components/Template'
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../config';


export default function index() {
  const [year, setYear] = useState(() => {
    let arr=[];
    let d = new Date()
    let  currentYear = d.getFullYear()
    let lastYear = currentYear - 5
    for(let i = lastYear; i <= currentYear; i++){
      arr.push(i)
    }
    return arr
  });

  const [selectedYear, setSelectedYear] = useState(() => {
    return new Date().getFullYear()
  })

  const [moths, setMonths] = useState(() => {
    return [
         "มกราคม" ,
         "กุมภาพันธ์" ,
         "มีนาคม" ,
         "เมษายน" ,
         "พฤษภาคม" ,
         "มิถุนายน" ,
         "กรกฏาคม" ,
         "สิงหาคม" ,
         "กันยายน" ,
         "ตุลาคม" ,
         "พฤศจิกายน" ,
         "ธันวาคม" ,
    ]
  });

  const [selectedMonth, setSelectedMonth] = useState(() => {
    return new Date().getMonth() +1;
  })

  const [results,setResults] = useState([]);

  const handlerShowReport = async(e) => {
    e.preventDefault();
    try {
        const payload = {
            month:selectedMonth,
            year:selectedYear
        }
        const res = await axios.post(`${config.api_path}changepackage/reportSumSalePerDay`, payload, config.headers());
        if (res.status === 200) {
            setResults(res.data.body);
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message
        })
    }
  }
  return (
    <div>
        <Template>
            <div className="card">
                <div className="card-header">
                    <div className="card-title">รายงานยอดขายรายวัน</div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-2">
                            <div className="input-group">
                                <span className="input-group-text">ปี</span>
                                <select value={selectedYear} className="form-control" onChange={e => setSelectedYear(e.target.value)}>
                                    {year.map((item,index) => (
                                        <React.Fragment key={index}>
                                            <option value={index+1}>{item}</option>
                                        </React.Fragment>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="input-group">
                                <span className="input-group-text">เดือน</span>
                                <select value={selectedMonth} className="form-control" onChange={e => setSelectedMonth(e.target.value)}> 
                                     {moths.map((item,index) => (
                                        <React.Fragment key={index}>
                                            <option value={index+1}>{item}</option>
                                        </React.Fragment>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-8">
                            <button className='btn btn-primary btn-lg  mt-1 rounded-0' onClick={handlerShowReport}>
                                <i className='fa fa-check me-2'></i>
                                แสดงรายการ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    </div>
  )
}
