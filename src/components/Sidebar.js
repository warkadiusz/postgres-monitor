import React from 'react';

function Sidebar(props) {
  return (<div className="sidebar sidebar-style-2">
    <div className="sidebar-wrapper scrollbar scrollbar-inner">
      <div className="sidebar-content">
        <div className="user">
          <div className="avatar-sm float-left mr-2">
            <img src="assets/img/jm_denis.jpg" alt="..." className="avatar-img rounded-circle" />
          </div>
          <div className="info">
            <a href="#">
								<span>
									Test
									<span className="user-level">-</span>
								</span>
            </a>
            <div className="clearfix" />
          </div>
        </div>
        <ul className="nav nav-primary">
          <li className="nav-item active">
            <a data-toggle="collapse" href="#dashboard" className="collapsed" aria-expanded="false">
              <i className="fas fa-home" />
              <p>Dashboard</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>);
}

export default Sidebar;
