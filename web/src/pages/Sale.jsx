import React from 'react'
import Template from '../components/Template'
import Header from '../components/Header'
export default function Sale() {
    return (
        <div>
        <Template>
          <Header title="รายการสินค้า" breadMain="หน้าแรก" breadActive="สินค้า" />
          <div className="card">
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
                        <div className="input-group ">
                            <span className="input-group-text bg-primary">Barcode</span>
                            <input type="text" className='w-50 form-controller border-primary bg-primary text-white' />
                            <button className='btn btn-primary'><i className="fa fa-search">ค้นหา</i></button>
                        </div>

                        <div className="table-responsive-sm mt-3">
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
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="text-end">
                            <span className='btn btn-secondary    h2 pe-3 ps-3 ' style={{"borderRadius":"0", "color":"#70FE3F", "backgroundColor":"black"}}>0.00</span>
                        </div>
                        <div className="card mt-2">
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
