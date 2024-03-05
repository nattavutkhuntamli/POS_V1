import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../config';
import { Link, useLocation } from 'react-router-dom';

import Swal from 'sweetalert2';
import Modal from './Modal';
function SideBar() {
    const location = useLocation();
    const [memberId, setMemberId] = useState(null);
    const [membername, setMembername] = useState(null);
    const [packageName, setPackageName] = useState(null);
    const [editMembername, setEditMembername] = useState();
    const [editPassword, setEditPassword] = useState(null)
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const response = await axios.get(`${config.api_path}member/info`, config.headers())
            if (response.status === 200) {
                setMemberId(response.data.body.id)
                setMembername(response.data.body.name);
                setPackageName(response.data.body.package.name);
            }
        } catch (error) {
            localStorage.removeItem('isLoginMember')
            localStorage.removeItem('pos_token')
            window.location.href = "/login"
            if (error.status === undefined) {
                console.error('Error fetching data:', error)
            }
            if (error.response.status === 401) {
                localStorage.removeItem('isLoginMember')
                localStorage.removeItem('pos_token')
                window.location.href = "/login"
            }else{
                console.log('eeeeeee')
            }
        }
    }
    const handleLogout = () => {
        Swal.fire({
            icon: 'question',
            title: 'Sign out',
            text: 'ยืนยันการออกจากระบบ',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((res) => {
            if (res.isConfirmed) {
                localStorage.removeItem('isLoginMember')
                localStorage.removeItem('pos_token')
                window.location.href = "/login"
            } else {
                Swal.fire('success', 'ยกเลิก', 'success')
            }
        })
    }

    const handleProfile = async () => {
        try {
            const response = await axios.get(`${config.api_path}member/info`, config.headers())
            if (response.status === 200) {
                setMembername(response.data.body.name)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleupdateProfile = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                icon: 'question',
                title: 'อัพเดทชื่อร้านค้า',
                text: 'ยืนยันการแก้ไขข้อมูลร้านค้า',
                confirmButtonColor: '#3085d6',
                showDenyButton: true,
            }).then(async(res) => {
                if (res.isConfirmed) {
                    const data = {
                        name: editMembername
                    }
                    const response =  await axios.put(`${config.api_path}member/editProfile/${memberId}`, data, config.headers())
                    if (response.status === 200) {
                        Swal.fire({
                            icon:'success',
                            title: response.data.message,
                            text: response.data.message,
                        }).then(() => {
                            setTimeout(() => {
                                window.location.reload()
                            }, 500)
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'ไม่สำเร็จ',
                            text: 'กรุณาลองใหม่อีกครั้ง',
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ยกเลิก',
                        text: 'ยกเลิกการแก้ไขข้อมูล',
                    });
                }
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'ไม่สำเร็จ',
                text: 'กรุ��า��องใหม่อีกครั้ง',
            })

        }
    }

    const handleupdatePass = async(e) => {
        e.preventDefault();
        try {
            Swal.fire({
                icon: 'question',
                title: 'อัพเดทรหัสผ่าน',
                text: 'ยืนยันการแก้ไขรหัสผ่าน',
                confirmButtonColor: '#3085d6',
                showDenyButton: true,
            }).then(async(res) => {
                if(res.isConfirmed){
                    const data = {
                        pass: editPassword
                    }
                    const response =  await axios.put(`${config.api_path}member/editPass/${memberId}`, data, config.headers())
                    if (response.status === 200) {
                        Swal.fire({
                            icon:'success',
                            title: response.data.message,
                            text: response.data.message,
                        }).then(() => {
                            setTimeout(() => {
                                localStorage.removeItem('isLoginMember')
                                localStorage.removeItem('pos_token')
                                window.location.reload()
                            }, 500)
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'ไม่สำเร็จ',
                            text: 'กรุ��า��องใหม่อีกครั้ง',
                        })
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'ยกเลิก',
                        text: 'ยกเลิกการแก้ไขรหัสผ่าน',
                    });
                }
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'ไม่สำเร็จ',
                text: 'กรุ��า��องใหม่อีกครั้ง',
            })
        }
    }
    return (
        <div>
            <aside className="main-sidebar elevation-4 sidebar-light-olive">
                <a href="../../index3.html" className="brand-link">
                    <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '0.8' }} />
                    <span className="brand-text font-weight-light">POS ON CLOUD</span>
                </a>

                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <div>
                                <a href="#" className="d-block">{membername} </a>
                            </div>
                            <div>
                                <a href="#" className="d-block">Package: {packageName}</a>
                            </div>
                        </div>
                    </div>



                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-header">เมนู</li>

                            <li className="nav-item">
                                <Link to='/home' className={location.pathname === '/home' ? 'nav-link active' : 'nav-link'}>
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        หน้าแรก
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to='/sale' className={location.pathname === '/sale' ? 'nav-link active' : 'nav-link'}>
                                  <i className="nav-icon fa-regular fa-dollar-sign"></i>
                                    <p>
                                        ขายสินค้า
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to='/product' className={location.pathname === '/product' ? 'nav-link active' : 'nav-link'}>
                                    <i className="nav-icon fas fa-box"></i>
                                    <p>
                                        สินค้า
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to='/user' className={location.pathname === '/user' ? 'nav-link active' : 'nav-link'}>
                                    <i className="nav-icon fas fa-user"></i>
                                    <p>
                                        ชื่อผู้ใช้งานระบบ
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-header">ตั้งค่า</li>
                            <li className="nav-item">
                                <a onClick={handleProfile} className="nav-link" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modalEditProfile" tabIndex="-1" >
                                    <i className="nav-icon fas fa-user-circle text-info"></i>
                                    <p className="text">  ประวัติส่วนตัว</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a onClick={handleProfile} className="nav-link" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#modalEditPass" tabIndex="-1" >
                                    <i className="nav-icon fas fa-user-circle text-info"></i>
                                    <p className="text">  แก้ไขรหัสผ่าน</p>
                                </a>
                            </li>
                            <li className="nav-header">ออกจากระบบ</li>
                            <li className="nav-item">
                                <a onClick={handleLogout} className="nav-link" style={{ cursor: "pointer" }}>
                                    <i className="nav-icon far fa-circle text-danger"></i>
                                    <p className="text">ออกจากระบบ</p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <Modal id="modalEditProfile" title="แก้ไขข้อมูลส่วนตัว">
                <form onSubmit={handleupdateProfile}>
                    <div className="form-group">
                        <label>ชื่อร้านค้าเดิม</label>
                        <input
                            type="text"
                            value={membername || ''}
                            className='form-control'
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>ชื่อร้านค้าใหม่</label>
                        <input
                            type="text"
                            className='form-control'
                            onChange={e => setEditMembername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary w-100" type="submit"><i className='fa fa-arrow-right me-2'></i> แก้ไขข้อมูล</button> &nbsp;
                    </div>
                </form>
            </Modal>

            <Modal id="modalEditPass" title="แก้ไขข้อมูลรหัสผ่าน">
                <form onSubmit={handleupdatePass} >
                    <div className="form-group">
                        <label>รหัสผ่านใหม่</label>
                        <input
                            type="password"
                            onChange={e => setEditPassword(e.target.value)}
                            className='form-control'
                        />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary w-100" type="submit"><i className='fa fa-arrow-right me-2'></i> แก้ไขรหัสผ่าน</button> &nbsp;
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default SideBar