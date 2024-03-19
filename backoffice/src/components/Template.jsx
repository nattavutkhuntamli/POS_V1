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
                if(error.response.status === 401) {
                    localStorage.removeItem('isLoginMember')
                    localStorage.removeItem('pos_token')
                    window.location.href = "/"
                }else{
                    console.log(error)
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
            <div className='row'>
                <div className='col-xxl-2 col-xl-2 ps-4 pt-2' style={{height:'100dvh', background:"#182d1b"}}>
                    <div className="text-white">
                        <div className='p-3'> {admin.name} : {admin.level}</div>
                        <div className='mt-3'> <button className='btn  btn-lg btn-outline-danger w-100' onClick={handleLogout}>Sign out</button></div>
                    </div>
                   <div className='d-grid gap-3 mt-5'>
                      <Link to="/dashboard" className={location.pathname==='/dashboard' ? 'btn  btn-lg btn-default w-100 rounded text-start active' :'btn  btn-lg btn-default w-100 rounded text-start'}>
                         <i className='fa fa-file-alt text-white me-2'></i>รายงานคนทีใช้บริการ
                      </Link>
                      <Link to="/dashboard" className={location.pathname==='/dashboard' ? 'btn  btn-sm btn-default w-100 rounded text-start active' :'btn  btn-lg btn-default w-100 rounded text-start'}>
                         <i className='fa fa-file-alt text-white me-2'></i>รายงานคนที่ขอปลี่ยน แพกเกจ
                      </Link>
                      
                      <Link to="/dashboard" className={location.pathname==='/dashboard' ? 'btn  btn-sm btn-default w-100 rounded text-start active' :'btn  btn-lg btn-default w-100 rounded text-start'}>
                         <i className='fa fa-file-alt text-white me-2'></i>รายงานรายได้รายวัน
                      </Link>
                      <Link to="/dashboard" className={location.pathname==='/dashboard' ? 'btn  btn-sm btn-default w-100 rounded text-start active' :'btn  btn-lg btn-default w-100 rounded text-start'}>
                         <i className='fa fa-file-alt text-white me-2'></i>รายงานรายได้รายเดือน
                      </Link>
                      <Link to="/dashboard" className={location.pathname==='/dashboard' ? 'btn  btn-sm btn-default w-100 rounded text-start active' :'btn  btn-lg btn-default w-100 rounded text-start'}>
                         <i className='fa fa-file-alt text-white me-2'></i>รายงานรายได้รายปี
                      </Link>
                      <Link to="/dashboard" className={location.pathname==='/dashboard' ? 'btn  btn-sm btn-default w-100 rounded text-start active' :'btn  btn-lg btn-default w-100 rounded text-start'}>
                         <i className='fa fa-user-alt text-white me-2'></i>ผู้ใช้ระบบ
                      </Link>
                      
                      
                   </div>
                </div>
                <div className='col-xxl-10 col-xl-10 ps-4 pt-5'>
                    {props.children}
                </div>
            </div>
        </>

    )
}
