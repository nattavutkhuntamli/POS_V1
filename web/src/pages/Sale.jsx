import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Header from '../components/Header'
import axios from 'axios'
import Swal from 'sweetalert2'
import config from '../config'
export default function Sale() {
    const [products, setProducts] = useState([])
    const [billSale, setBillSale] = useState({})
    useEffect(() => {
        fetchData()
        openBill()
    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get(`${config.api_path}product/listForSale`, config.headers());
            // const res = await axios.get(`${config.api_path}billsale/openBill`, config.headers());
            if (res.status === 200) {
                setProducts(res.data.body);
            }
            if (res.status === 200) {
                setProducts(res.data.result);
            }
        } catch (error) {
            console.error(error)
          
        }
    }
    const openBill = async () => {
        try {
            const res = await axios.get(`${config.api_path}billsale/openBill`, config.headers());
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Template>
                <Header title="รายการสินค้า" breadMain="หน้าแรก" breadActive="สินค้า" />
                <div className="card " >
                    <div className="card-header bg-white">
                        <h3 className="card-title"> ขายสินค้า </h3>
                        <div className="card-tools">
                            <button className='btn btn-success me-2'> <i className=' fa fa-check  me-2'></i>จบการขาย</button>
                            <button className='btn btn-info me-2'> <i className=' fa fa-file  me-2'></i>บิลวันนี้</button>
                            <button className='btn btn-secondary me-2'> <i className=' fa fa-file-alt  me-2'></i>บิลล่าสุด</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-9">
                                {/* <div className="input-group ">
                            <span className="input-group-text bg-primary">Barcode</span>
                            <input type="text" className='w-50 form-controller border-primary bg-primary text-white' />
                            <button className='btn btn-primary'><i className="fa fa-search">ค้นหา</i></button>
                        </div> */}

                                {/* <div className="table-responsive-sm mt-3">
                            <table className='table table-bordered table-striped'>
                                <thead className='text-center '  style={{"backgroundColor":"red"}}>
                                <tr >
                                    <th scope="col">ลำดับ</th>
                                    <th scope='col'>รหัสบาร์โค๊ด</th>
                                    <th scope="col">ชื่อสินค้า</th>
                                    <th scope="col">จำนวน</th>
                                    <th width={"100"}></th>
                                </tr>
                                </thead>
                            </table>
                        </div> */}
                                <div className="row">
                                    {products.length > 0 ? products.map(item => (
                                        <div className="col-lg-3 col-md-6 " key={item.id}>
                                            <div className="card d-flex flex-column align-items-center text-nowrap">
                                                <div className="text-center "> 
                                                <img   className="card-img" src={`${config.host + item.productImages[0].imageName}`} alt={item.name}  width={'200px'} height={'200px'} /> </div>
                                                <div className="card-body pt-4  ">
                                                    <div className="text-muted text-center mt-auto">{item.name}</div>
                                                    <div className="text-center">
                                                        <div className="font-weight-bold"><span className="text-dark ">{parseInt(item.price).toLocaleString('th')} บาท</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) : ""}
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="text-end">
                                    <span className='btn btn-secondary    h2 pe-3 ps-3  w-100 p-3 text-right' style={{ "borderRadius": "0", "color": "#70FE3F", "backgroundColor": "black" }}>0.00</span>
                                </div>
                                <div className="card mt-3">
                                    <div className="card-body">
                                        ddd
                                    </div>
                                </div>
                            </div>
                        </div>







                    </div>
                </div>
            </Template>
        </div>
    )
}
