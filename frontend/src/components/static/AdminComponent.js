import React from 'react'
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import PageContent from './PageContent';

function AdminComponent() {
  return (
    <div>
      <Header/>
      {/* <div className="row mx-4">
        <div className="col-md-4">
         <Sidebar/>
        </div>
        <div className="col-md-8">
          <PageContent/>
        </div>
      </div> */}

      <div className="container-fluid">
        <div className="row">
          <Sidebar/>
          <PageContent/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AdminComponent