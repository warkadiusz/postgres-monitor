import React from 'react';

function Header(props) {
  return (<div className="main-header">
    <div className="logo-header" data-background-color="blue">
      <a href="index.html" className="logo">
        <span className="navbar-brand text-white">{props.appName}</span>
      </a>
      <button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon">
						<i className="icon-menu"></i>
					</span>
      </button>
      <button className="topbar-toggler more"><i className="icon-options-vertical"></i></button>
      <div className="nav-toggle">
        <button className="btn btn-toggle toggle-sidebar">
          <i className="icon-menu"></i>
        </button>
      </div>
    </div>
    <nav className="navbar navbar-header navbar-expand-lg" data-background-color="blue2">
      <div className="container-fluid">
      </div>
    </nav>
  </div>);
}

export default Header
