import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from '../../components/topbar/Topbar';

const Samplepage = () => {
  return (
    <>
      {/*  Body Wrapper */}
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <Sidebar />
        {/*  Main wrapper */}
        <div className="body-wrapper">
          <Topbar />
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Sample Page</h5>
                <p className="mb-0">This is a sample page </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Samplepage