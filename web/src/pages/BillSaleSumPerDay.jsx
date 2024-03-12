import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Header from '../components/Header'
import config from '../config';
import axios from 'axios';
export default function BillSaleSumPerDay() {
    const [currentYear, setCurrentYear] = useState(() => {
        let mydate = new Date();
        return mydate.getFullYear();
    });
    const [arrayYear, setArrYear] = useState(() => {
        let arr = [];
        let myDate = new Date();
        let currentYear = myDate.getFullYear();
        let beforeYear  = currentYear - 5

        for(let i = beforeYear; i <= currentYear; i++){
            arr.push(i)
        }
        return arr;
    });
    const [currentMonth, setCurrentMonth] = useState(() => {
        let mydate = new Date();
        return mydate.getMonth()+1
    })
    const [arrayMonth,setArrMonth] = useState(() => {
        let arr = [
            { value:1, label:"มกราคม"},
            { value:2, label:"กุมภาพันธ์"},
            { value:3, label:"มีนาคม"},
            { value:4, label:"เมษายน"},
            { value:5, label:"พฤษภาคม"},
            { value:6, label:"มิถุนายน"},
            { value:7, label:"กรกฏาคม"},
            { value:8, label:"สิงหาคม"},
            { value:9, label:"กันยายน"},
            { value:10, label:"ตุลาคม"},
            { value:11, label:"พฤศจิกายน"},
            { value:12, label:"ธันวาคม"},
        ]
        return arr;
    });
    const [billSales,setBillSales] = useState([]);
    const [currentBillSale, setCurrentBillSale] = useState({});
    const [billSaleDetails, setBillSaleDetails] = useState([]);

    useEffect(() => {
        handleShowReport()
    },[]);

    const handleShowReport = async () => {
        try {
            const path = `${config.api_path}/billsale/listByYearAndMonth?year=${currentYear}&month=${currentMonth}`
            console.log(path)
            const response = await axios.get(path,config.headers())
            console.log(response)
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <Template>
                <Header title="รายงานสรุปยอดขายรายวัน" breadMain="หน้าแรก" breadActive="รายงานสรุปยอดขายรายวัน" />
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="input-group">
                                    <span className='input-group-text'>ปี </span>
                                    <select value={currentYear} className='form-control' onChange={e => setCurrentYear(e.target.value)}>
                                        { arrayYear.map((item,index) => (
                                             <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="input-group">
                                    <span className='input-group-text'>เดือน</span>
                                    <select value={currentMonth} className='form-control'  onChange={e=> setCurrentMonth(e.target.value)}>
                                        { arrayMonth.map((item,index) => (
                                             <option key={index} value={item.value}>{item.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <button onClick={handleShowReport} className='btn btn-primary mt-2'>
                                    <i className='fa fa-check me-2'></i>
                                    แสดงรายการขาย
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Template>
        </div>
    )
}
