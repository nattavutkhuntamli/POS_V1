import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Header from '../components/Header'
import axios from 'axios';
import config from '../config';
import Modal from '../components/Modal';
import Swal from 'sweetalert2';
export default function ReportStock() {
  const [stocks, setStocks] = useState([]);
  const [currentStock, setCurrentStock] = useState({});

  useEffect(() => {
    fetchStockData()
  }, [])
  const fetchStockData = async () => {
    try {
      const response = await axios.get(`${config.api_path}stock/report`, config.headers());
      if (response.status === 200) {
        setStocks(response.data.results)
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(stocks)
  return (
    <div>
      <Template>
        <Header title="รายงาน Stock" breadMain="หน้าแรก" breadActive="รายงาน Stock" />
        <div className="card">
          <div className="card-body">
            <div className='table-response-sm mt-3'>
              <table className='table table-bordered table-striped'>
                <thead>
                  <tr >
                    <th  width={150} >Barcode</th>
                    <th width={250}>รายการ</th>
                    <th width={80} className='text-end'>รับเข้า</th>
                    <th width={80} className='text-end'>ขายออก</th>
                    <th width={80} className='text-end'>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  { stocks.length > 0  ?
                      stocks.map((Item, index) =>
                      (
                        <React.Fragment key={index}>
                           <tr>
                              <td>{Item.result.barcode}</td>
                              <td>{Item.result.name}</td>
                              <td className='text-end'><a className='btn btn-link text-success'>{ parseInt(Item.stockIn).toLocaleString('th-TH')}</a></td>
                              <td className='text-end'><a className='btn btn-link text-danger'>{ parseInt(Item.stockOut).toLocaleString('th-TH')}</a></td>
                              <td className='text-end'> { parseInt(Item.stockIn).toLocaleString('th-TH') - parseInt(Item.stockOut).toLocaleString('th-TH')}</td>
                              {console.log(Item.result.barcode)}
                           </tr>
                        </React.Fragment>
                      )
                    ) : <tr><td colSpan={5} className='text-center'>ไม่มีข้อมูลรายการขาย</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Template>
    </div>
  )
}
