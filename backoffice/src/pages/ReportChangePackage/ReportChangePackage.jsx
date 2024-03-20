import React, { useEffect, useState } from 'react'
import Template from '../../components/Template'
import axios from 'axios'
import config from '../../config'
import Swal from 'sweetalert2'
import Modal from '../../components/Modal'
export default function ReportChangePackage() {
    const [changepackages, setChangepackages] = useState([]);
    const [arrHour, setarrHour] = useState(() => {
        let arr =[];
        for(let i = 1; i <= 24; i++){
            arr.push(i);
        }
        return arr;
    });
    const [arrminute, setarrminute] = useState(() => {
        let arr =[];
        for(let i = 1; i <= 60; i++){
            arr.push(i);
        }
        return arr;
    })
    useEffect(() => {
        changePackageData()
    }, [])
    const changePackageData = async() => {
        try {
            const results = await axios.get(`${config.api_path}changepackage/list`, config.headers());

            if (results.status === 200) {
                setChangepackages(results.data.body)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Template>
                <div className="card">
                    <div className="card-header">
                        รายงานคนทีขอเปลี่ยนแพคเกจ
                    </div>
                    <div className="card-body">
                        <div className='table-response-sm'>
                            
                            <table className='table table-bordered table-striped'>
                                <thead>
                                    <tr>
                                        <th className='text-center'>ชื่อ</th>
                                        <th className='text-center'> เบอร์โทร</th>
                                        <th className='text-center'>วันที่ขอเปลี่ยนแพคเกจ</th>
                                        <th className="text-end">แพคเกจที่ต้องการ</th>
                                        <th className="text-end">ค่าบริการต่อเดือน</th>
                                        <th className='text-center'>สถานะ</th>
                                        <th width={150}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {changepackages.length > 0 && changepackages != []  ? changepackages.map((Item,index) => (
                                        <React.Fragment key={index}>
                                            <tr>
                                                 <td className='text-center'>{Item.member.name}</td>
                                                 <td className='text-center'>{Item.member.phone}</td>
                                                 <td className='text-center'>{new Date(Item.createdAt).toLocaleString('th-TH')}</td>
                                                 <td className="text-end">{Item.package.name}</td>
                                                 <td className="text-end"> { parseInt(Item.package.price).toLocaleString('th-TH')}</td>
                                                 <td className='text-center'>{Item.status}</td>
                                                 <td>
                                                    <button className='btn  btn-sm btn-success roundend' data-target="#modalPay" data-toggle="modal">
                                                         <i className="fa fa-check me-2"></i> 
                                                         ได้รับเงินแล้ว
                                                    </button>
                                                 </td>
                                            </tr>
                                        </React.Fragment>
                                    )
                                   ) : <tr><td colSpan={5}>ไม่มีข้อมูล</td></tr>}
                               
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Template>
            <Modal id="modalPay" title="รายการที่ชำระเงิน">
               <div>
                    <label htmlFor="payDate">วันที่ชำระเงิน</label>
                    <input type="date" className='form-control' />
               </div>
               <div>
                    <label htmlFor="payTime">เวลา</label>
                    <div className="row">
                        <div className="col-6">
                            <div className="input-group">
                                <div className="input-group-text">ชั่วโมง</div>
                                <select name="" id="" className='form-control'>
                                    { arrHour.length > 0 ? arrHour.map((item,index) => (
                                        <option key={index} value={item}>{item}</option>
                                    )): null}
                                </select>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="input-group">
                                <div className="input-group-text">นาที</div>
                                <select name="" id="" className='form-control'>
                                     { arrminute.length > 0 ? arrminute.map((item,index) => (
                                        <option key={index} value={item}>{item}</option>
                                     )): null}
                                </select>
                            </div>
                        </div>
                    </div>
               </div>
               <div className='mt-3'>
                    <label htmlFor="payRemart">หมายเหตุ</label>
                    <input type="text" className='form-control' />
               </div>
               <div className='mt-3'>
                    <button className='btn btn-primary w-100 rounded'>
                       <i className='fa fa-check me-2'></i>
                       บันทึกข้อมูลการชำระเงิน
                    </button>
               </div>
            </Modal>
        </>
    )
}
