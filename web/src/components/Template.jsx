import React, { Children } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'
import Footer from './Footer'
import Header from './Header'
function Template(props) {
  return (
    <div className="wrapper">
        <Navbar/>
        <SideBar/>
        <div className="content-wrapper pt-3">
             <section className="content">
                {props.children}
             </section>
        </div>
        <Footer/>
    </div>
  )
}

export default Template