import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import Header from '../components/Header'
import axios from 'axios';
import config from '../config';
import Modal from '../components/Modal';
import Swal from 'sweetalert2';
export default function ReportStock() {
  return (
    <div>
    <Template>
      <Header title="ReportStock" breadMain="หน้าแรก" breadActive="ReportStock" />
      <div className="card">
        <div className="card-body">
          Start creating your amazing application!
        </div>
      </div>
    </Template>
  </div>
  )
}
