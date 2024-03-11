import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Header from '../components/Header'
import axios from 'axios';
import config from '../config';
import Modal from '../components/Modal';
export default function BillSales() {
  const [billSales, setBillSales] = useState([])
  const [billDetails, setBillDetails] = useState({})
  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.api_path}/billsale/list`, config.headers())
      if (response.status === 200) {
        setBillSales(response.data.body)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Template>
        <Header title="รายงานบิลขาย" breadMain="หน้าแรก" breadActive="รายงานบิลขาย" />
        <div className="card">
          <div className="card-body">
            <div className='mt-3 table-response-sm'>
              <table className='table table-bordered'>
                <thead className='text-center'>
                  <tr>
                    <th scope="col">เลขบิล</th>
                    <th scope='col'>วัน เวลา ที่ขาย</th>
                    <th scope="col">จำนวนยอดขาย</th>
                    <th scope='col'>รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  {billSales.length != 0 && billSales != {} && billSales != undefined ? (
                    <>
                      {billSales.map((billItem, index) => (
                          <tr className='text-center' key={index}>
                            <td>{billItem.id}</td>
                            <td>{new Date(billItem.payData).toLocaleString('th-TH')}</td>
                            <td>{parseInt(billItem.billSaleDetails.length).toLocaleString('th-TH')}</td>
                            <td>
                              <button className='btn btn-success me-2 w-100' onClick={e => setBillDetails(billItem.billSaleDetails)}  data-toggle="modal" data-target="#modalBillSaleDetail" >
                                  <i className='fa fa-file-alt me-2'></i> รายละเอียด
                              </button>
                            </td>
                          </tr>
                      ))}
                      <tr>
                        <td colSpan={3} className='text-end'>ยอดบิลรวม</td>
                        <td className='text-start'>
                          {billSales.reduce((total, billItem) => total + billItem.billSaleDetails.length,0).toLocaleString('th')}
                        </td>
                      </tr>
                    </>
                  ) : (<tr className='text-center'><td colSpan={2}>ไม่มีข้อมูล</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal id="modalBillSaleDetail" title="รายละเอียดในบิล" modalSize="modal-lg">
              <div className='mt-2 table-responsive-sm'>
                  <table className='mt-2 table table-bordered table-hover table-sm text-nowrap'>
                      <thead>
                          <tr className='text-center'>
                              <th>ลำดับ</th>
                              <th>barcode</th>
                              <th>ชื่อสินค้า</th>
                              <th className='text-end'>ราคาสินค้า</th>
                              <th className='text-end'>จำนวนสินค้า</th>
                              <th className='text-end'>ยอดรวม</th>
                          </tr>
                      </thead>
                      <tbody>
                          {billDetails !== undefined && billDetails.length > 0 ? (
                              <>
                                  {billDetails.map((billItem, index) => (
                                      <React.Fragment key={index}>
                                          <tr>
                                              <td className='text-center'>{index + 1}</td>
                                              <td>{billItem.product.barcode}</td>
                                              <td>{billItem.product.name}</td>
                                              <td className='text-end'>{parseInt(billItem.price).toLocaleString('th')}</td>
                                              <td className='text-end'>{billItem.qty}</td>
                                              <td className='text-end'>{parseInt(billItem.price * billItem.qty).toLocaleString('th')}</td>
                                          </tr>
                                      </React.Fragment>
                                  ))}
                                  <tr>
                                      <td colSpan={5} className='text-end'>ยอดขายรวม</td>
                                      <td className='text-end'>
                                          {billDetails.reduce((total, billItem) => total + billItem.price * billItem.qty, 0).toLocaleString('th')}
                                      </td>
                                  </tr>
                              </>
                          ) : (
                              <tr><td colSpan={6}>ไม่มีข้อมูล</td></tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </Modal>
      </Template>
    </div>
  )
}
