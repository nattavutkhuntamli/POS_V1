import React, { useEffect, useState } from 'react';
import Template from '../components/Template';
import Header from '../components/Header';
import axios from 'axios';
import config from '../config';
import Modal from '../components/Modal';
import Swal from 'sweetalert2';

export default function User() {
  document.title = 'ระบบจัดการร้านค้าออนไลน์';

  const [InputValue, setInputValue] = useState({
    username: '',
    name: '',
    pwd: '',
    level: '',
  });
  const [password,setPassword] = useState("")
  const [passwordConfm,setPasswordCfm] = useState("")
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchDataMember();
  }, []);

  const fetchDataMember = async () => {
    try {
      const response = await axios.get(`${config.api_path}user/list`, config.headers());
      if (response.status === 200) {
        setUsers(response.data.body);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async () => {
    const btn = document.getElementsByClassName('btnClose');
    for (let i = 0; i < btn.length; i++) {
      btn[i].click();
    }
  };

  const ClearForm = () => {
    // setInputValue({
    //   username: '',
    //   pwd: '',
    //   name: '',
    //   level: '',
    // });
    setInputValue({})
  };

  const changePassword = (item) => {
    if(item.length > 0 ) {
      setPassword(item)
      CompassPassword()
    }
  };
  const changePassCfm = (item) => {
    if(item.length > 0){
      setPasswordCfm(item)
      CompassPassword()
    }
  }
  
  const CompassPassword  = () => { 
    if(password == passwordConfm){
      setInputValue({ ...InputValue, pwd: password })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกรหัสผ่านทั้งสองช่องให้ตรงกัน',
      })
    }
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const register = await axios.post(`${config.api_path}user/insert`, InputValue, config.headers());
      if (register.status === 200) {
        Swal.fire({
          icon: 'success',
          title: register.data.message,
          text: register.data.message,
        })
        ClearForm()
        handleClose()
        fetchDataMember()
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <div>
      <Template>
        <Header title="จัดการข้อมูลผู้ใช้" breadMain="หน้าแรก" breadActive="จัดการข้อมูลผู้ใช้" />
        <div className="card">
          <div className="card-header bg-dark">
            <h3 className="card-title"><i className="nav-icon fas fa-user"></i> ข้อมูลสมาชิก</h3>
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse" title="ย่อ">
                <i className="fas fa-minus text-white"></i>
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="float-right">
              <button className='btn btn-sm btn-dark' data-bs-toggle="modal" data-bs-target="#modalUser"> <i className='fa fa-add'></i> เพิ่มสมาชิก</button>
            </div><br />
            <div className=" mt-3 table-responsive-sm">
              <table className='mt-5 table  table-bordered table-hover table-sm text-nowrap'>
                <thead className="text-center">
                  <tr>
                    <th scope="col">ลำดับ</th>
                    <th scope='col'>ชื่อผู้ใช้</th>
                    <th scope="col">Username</th>
                    <th scope="col">ระดับ</th>
                    <th scope="col">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? users.map((item, index) => (
                    <tr key={index} className='text-center'>
                      <td>{index +1}</td>
                      <td>{item.user}</td>
                      <td>{item.name}</td>
                      <td>{item.level}</td>
                      <td>
                        <button type="button" className='btn btn-sm btn-dark' data-bs-toggle="modal" data-bs-target="#modalUser" tabIndex={item.id} onClick={e=> setInputValue(item)}>แก้ไข</button>
                        <button type="button" className='btn btn-sm btn-danger' onClick={(e) => deleteUser(item.id)} tabIndex={item.id}>ลบ</button>
                      </td>
                    </tr>
                  )) :
                    <tr className='text-center'><td colSpan={5}>ไม่มีข้อมูล</td></tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal id="modalUser" title="เพิ่มข้อมูลสมาชิก">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-sm-12">
                <label >ชื่อผู้ใช้ <span className='text-danger'> *</span></label>
                <input type="text" className="form-control" id="username" name="username" value={InputValue.username || ''} placeholder="ชื่อผู้ใช้" required onChange={e => setInputValue({ ...InputValue, username: e.target.value })} maxLength={10} />
              </div>
              <div className="form-group col-sm-12">
                <label >รหัสผ่าน <span className='text-danger'> *</span></label>
                <input type="password" className="form-control" id="password" name="password"  placeholder="รหัสผ่าน" required onBlur={e => changePassword(e.target.value)} />
              </div>
              <div className="form-group col-sm-12">
                <label >ยืนยันรหัสผ่าน <span className='text-danger'> *</span></label>
                <input type="password" className="form-control" id="confirmpwd" name="confirmpwd" placeholder="ยืนยันรหัสผ่าน" required onBlur={e => changePassCfm(e.target.value)} maxLength={10} />
              </div>
              <div className="form-group col-sm-12">
                <label >ชื่อนามสกุล <span className='text-danger'> *</span></label>
                <input type="text" className="form-control" id="name" name="name" placeholder="ชื่อนามสกุล" value={InputValue.name || ''} required onChange={e => setInputValue({ ...InputValue, name: e.target.value })} />
              </div>
              <div className="form-group col-sm-12">
                <label htmlFor="level">ระดับ</label>
                <select required id="level" name='level' className='form-control ' value={InputValue.level || ''} onChange={e => setInputValue({ ...InputValue, level: e.target.value })}>
                  <option value="">เลือกระดับ</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary w-100">บันทึก</button>
            </div>
          </form>
        </Modal>
      </Template>
    </div>
  );
}
