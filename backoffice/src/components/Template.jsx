import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import config from '../config';


export default function Template(props) {
    const location = useLocation();
    const [admin,setAdmin] = useState([])
    useEffect(() => {
        fetchData()
    },[])
    const fetchData = async() => {
        try {
            const response = await axios.get(`${config.api_path}admin/info`,config.headers())
            if (response.status === 200) {
                setAdmin(response.data.body)
            }
        } catch (error) {
            if(error) {
                console.log(error)
                if(error.response.status === 401) {
                    localStorage.removeItem('isLoginBackend')
                    localStorage.removeItem('pos_token')
                    window.location.href = "/"
                }else{
                    localStorage.removeItem('isLoginBackend')
                    localStorage.removeItem('pos_token')
                    window.location.href = "/"
                }
            }
        }
    }
    const handleLogout = () => {
        try {
            Swal.fire({
                icon: 'question',
                title: 'Sign out',
                text: 'ยืนยันการออกจากระบบ',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then((res) => {
                if (res.isConfirmed) {
                    localStorage.removeItem('isLoginBackend')
                    localStorage.removeItem('pos_token')
                    window.location.href = "/"
                } else {
                    Swal.fire('success', 'ยกเลิก', 'success')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='d-flex'>
                <div  className='bg-dark ps-2 pe-3' style={{height:'100dvh', width:"360px",position:"fixed",top:0,left:0 }}>
                    <div className="text-white">
                        <div className='p-3 text-warning h5 ms-2'> {admin.name} : {admin.level}</div>
                        <div className='ms-2'> 
                            <button 
                               className='btn btn-outline-warning btn-sm me-2' 
                               onClick={handleLogout}>
                                ออกจากระบบ
                            </button>
                            <button 
                               className='btn btn-outline-warning btn-sm me-2' 
                               onClick={handleLogout}>
                                เปลี่ยนรหัสผ่าน
                            </button>
                        </div>
                          <hr  className='mt-4' />
                    </div>
                   <div className='d-grid gap-3 mt-2'>
                      <Link to="/dashboard" className={location.pathname==='/dashboard' ? 'btn  btn-lg  btn-outline-info text-white rounded  my-menu w-100 border-0 text-start active ' :'btn  btn-lg  btn-outline-info text-white rounded  my-menu w-100 border-0 text-start'}>
                         <i className='fa fa-home-alt text-white me-2'></i>Dashboard
                      </Link>
                      <Link to="/Reportmember" className={location.pathname==='/Reportmember' ? 'btn  btn-lg  btn-outline-info text-white rounded  my-menu w-100 border-0 text-start active ' :'btn  btn-lg  btn-outline-info text-white rounded  my-menu w-100 border-0 text-start'}>
                         <i className='fa fa-file-alt text-white me-2'></i>รายงานคนทีใช้บริการ
                      </Link>
                      <Link to="/ReportChangePackage" className={location.pathname==='/ReportChangePackage' ? 'btn    btn-outline-info text-white rounded  my-menu w-100 border-0 text-start active' :'btn  btn-lg  btn-outline-info text-white rounded  my-menu w-100 border-0 text-start'}>
                         <i className='fa fa-file-alt text-white me-2'></i>รายงานคนที่ขอปลี่ยน แพกเกจ
                      </Link>
                      
                      <Link to="/ReportSumSalePerDay" className={location.pathname==='/ReportSumSalePerDay' ? 'btn    btn-outline-info text-white rounded  my-menu w-100 border-0 text-start active' :'btn  btn-lg  btn-outline-info text-white rounded  my-menu w-100 border-0 text-start'}>
                         <i className='fa fa-file-alt text-white me-2'></i>รายงานรายได้รายวัน
                      </Link>
                      <Link to="/report2" className={location.pathname==='/report2' ? 'btn    btn-outline-info text-white rounded  my-menu w-100 border-0 text-start active' :'btn  btn-lg  btn-outline-info text-white rounded  my-menu w-100 border-0 text-start'}>
                         <i className='fa fa-file-alt text-white me-2'></i>รายงานรายได้รายเดือน
                      </Link>
                      <Link to="/report3" className={location.pathname==='/report3' ? 'btn    btn-outline-info text-white rounded  my-menu w-100 border-0 text-start active' :'btn  btn-lg  btn-outline-info text-white rounded  my-menu w-100 border-0 text-start'}>
                         <i className='fa fa-file-alt text-white me-2'></i>รายงานรายได้รายปี
                      </Link>
                      <Link to="/report4" className={location.pathname==='/report4' ? 'btn    btn-outline-info text-white rounded  my-menu w-100 border-0 text-start active' :'btn  btn-lg  btn-outline-info text-white rounded  my-menu w-100 border-0 text-start'}>
                         <i className='fa fa-user-alt text-white me-2'></i>ผู้ใช้ระบบ
                      </Link>
                      
                      
                   </div>
                </div>
                <div className=' p-3' style={{width:'100%', overflow:"auto", marginLeft:"360px"}}>
                    {props.children}
                </div>
            </div>
        </>

    )
}
