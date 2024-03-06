import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Header from '../components/Header'
import axios from 'axios'
import Swal from 'sweetalert2'
import config from '../config'
export default function Sale() {
    const [products, setProducts] = useState([])
    const [billSale, setBillSale] = useState({})
    const [currentBill, setcurrentBill] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        fetchData()
        openBill()
        fetchBillSaleDetail()

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
    const fetchBillSaleDetail = async () => {
        try {
            // currentBillInfo
            const res = await axios.get(`${config.api_path}billsale/currentBillInfo`, config.headers());
            if (res.status === 200) {
                setcurrentBill(res.data.body.billSaleDetails);
                sumtotalPrice(res.data.body.billSaleDetails)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const sumtotalPrice = (currentBill) => {
        let total = 0
        if (currentBill != null && currentBill != undefined) {
            for (let i = 0; i < currentBill.length; i++) {
                total += currentBill[i].price * currentBill[i].qty
            }
            setTotalPrice(parseInt(total).toLocaleString('th-TH'))
        }

    }
    const openBill = async () => {
        try {
            const res = await axios.get(`${config.api_path}billsale/openBill`, config.headers());
        } catch (error) {
            console.log(error)
        }
    }
    const handleSave = async (item) => {
        try {
            const url = `${config.api_path}billsale/sale`
            const send = await axios.post(url, item, config.headers());
            if (send.status === 200) {
                Swal.fire({
                    icon: 'success',
                    text: `${send.data.message}`,
                }).then(() => {
                    fetchData()
                    fetchBillSaleDetail()
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const DeleteItemCart = async(item) => {
        try {
            Swal.fire({
                icon: 'question',
                title: 'ลบสินค้า',
                text: 'ยืนยันการลบสินค้า',
                confirmButtonColor: '#3085d6',
                showDenyButton: true,
            }).then(async(res) => {
                if (res.isConfirmed) {

                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'ยกเลิก',
                        text: 'ยกเลิกการลบสินค้า',
                    })
                }
            })
        } catch (error) {
            console.log(error)
            
        }
    }
    return (
        <div>
            <Template>
                <Header title="รายการสินค้า" breadMain="หน้าแรก" breadActive="สินค้า" />
                <div className="card" >
                    <div className="card-header bg-white">
                        <h3 className="card-title"> ขายสินค้า </h3>
                        <div className="card-tools">
                            <button className='btn btn-success me-2'> <i className=' fa fa-check  me-2'></i>จบการขาย</button>
                            <button className='btn btn-info me-2'> <i className=' fa fa-file  me-2'></i>บิลวันนี้</button>
                            <button className='btn btn-secondary me-2'> <i className=' fa fa-file-alt  me-2'></i>บิลล่าสุด</button>
                        </div>
                    </div>
                    <div className="card-body" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="row">
                                    {products.length > 0 ? products.map(item => (
                                        <div className="col-lg-3 col-md-6" key={item.id} onClick={e => handleSave(item)} style={{ cursor: "pointer" }}>
                                            <div className="card d-flex flex-column align-items-center text-nowrap">
                                                <div className="text-center">
                                                    <img className="card-img" src={`${config.host + item.productImages[0].imageName}`} alt={item.name} width={'200px'} height={'200px'} />
                                                </div>
                                                <div className="card-body pt-4">
                                                    <div className="text-muted text-center mt-auto">{item.name}</div>
                                                    <div className="text-center">
                                                        <div className="font-weight-bold"><span className="text-dark">{parseInt(item.price).toLocaleString('th')} บาท</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) : ""}
                                </div>
                            </div>
                            <div className="col-12 col-sm-3">
                                <div className="card" style={{ border: "2px dotted", maxHeight: "100%", overflowY: "auto" }}>
                                    <div className="card-body">
                                        <div className="text-end">
                                            <span className='btn btn-secondary h2 pe-3 ps-3 w-100 p-3 text-right' style={{ borderRadius: "0", color: "#70FE3F", backgroundColor: "black" }}>{totalPrice || 0.00}</span>
                                        </div>
                                        {currentBill.length > 0 ? (
                                            currentBill.map((item, index) => (
                                                <div className="card mt-3" key={index} >
                                                    <div className="card-body text-nowrap">
                                                        <div className='mb-2 '>{item.product.name}</div>
                                                        <div className='mb-1 '>จำนวนสินค้า: <b className="text-danger">{item.qty}</b>  | ราคาชิ้นละ: {parseInt(item.price).toLocaleString('th')}</div>
                                                        <div className='mb-1 '>รวม {(item.qty * parseInt(item.price)).toLocaleString('th')} บาท</div>
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <div className="float-end">
                                                                    <button className='btn btn-sm btn-danger me-2' onClick={e => DeleteItemCart(item)}>
                                                                        <i className="fa fa-trash"></i>
                                                                    </button>
                                                                    <button className='btn btn-sm  btn-info' >
                                                                        <i className="fa fa-edit"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))

                                        ) : (
                                            <div className="card mt-3">
                                                <div className="card-body">
                                                    <div className="text-center">ไม่มีสินค้าในตะกร้า</div>
                                                </div>
                                            </div>
                                        )}
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
