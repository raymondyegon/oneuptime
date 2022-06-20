import PropTypes from "prop-types";
import React from "react";

const Navbar = () => {
  
  return (
    <React.Fragment>
      <div className="topnav active"><div className="container-fluid active"><nav className="navbar navbar-light navbar-expand-lg topnav-menu active" id="navigation"><div id="topnav-menu-content" className="navbar-collapse collapse active"><ul className="navbar-nav active"><li className="nav-item dropdown active"><a className="nav-link dropdown-toggle arrow-none active" href="/dashboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline></svg><span>Dashboard</span></a></li><li className="nav-item dropdown"><a className="nav-link dropdown-toggle arrow-none" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>Components <div className="arrow-down"></div></a><div className="dropdown-menu mega-dropdown-menu dropdown-menu-left dropdown-mega-menu-xl"><div className="ps-2 p-lg-0"><div className="row"><div className="col-lg-8"><div><div className="menu-title">Components</div><div className="row"><div className="col-lg-5"><div><a className="dropdown-item" href="/ui-alerts">Alerts</a><a className="dropdown-item" href="/ui-buttons">Buttons</a><a className="dropdown-item" href="/ui-cards">Cards</a><a className="dropdown-item" href="/ui-carousel">Carousel</a><a className="dropdown-item" href="/ui-dropdowns">Dropdowns</a><a className="dropdown-item" href="/ui-grid">Grid</a><a className="dropdown-item" href="/ui-images">Images</a><a className="dropdown-item" href="/ui-modals">Modals</a></div></div><div className="col-lg-5"><div><a className="dropdown-item" href="/ui-drawer">Drawer</a><a className="dropdown-item" href="/ui-progressbars">Progress Bars</a><a className="dropdown-item" href="/ui-tabs-accordions">Tabs &amp; Accordions</a><a className="dropdown-item" href="/ui-typography">Typography</a><a className="dropdown-item" href="/ui-video">Video</a><a className="dropdown-item" href="/ui-general">General</a><a className="dropdown-item" href="/ui-colors">Colors</a></div></div></div></div></div><div className="col-lg-4"><div><div className="menu-title">Extended</div><a className="dropdown-item" href="/extended-lightbox">Lightbox</a><a className="dropdown-item" href="/extended-rangeslider">Range Slider</a><a className="dropdown-item" href="/extended-sweet-alert">SweetAlert 2</a><a className="dropdown-item" href="/extended-session-timeout">Session Timeout</a><a className="dropdown-item" href="/extended-rating">Rating</a><a className="dropdown-item" href="/extended-notifications">Notifications</a></div></div></div></div></div></li><li className="nav-item dropdown"><a className="nav-link dropdown-togglez arrow-none" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect></svg>Apps <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/apps-calendar">Calendar</a><a className="dropdown-item" href="/apps-chat">Chat</a><div className="dropdown"><a className="dropdown-item dropdown-toggle arrow-none" href="/">Email <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/email-inbox">Inbox</a><a className="dropdown-item" href="/email-read">Read Email</a></div></div><div className="dropdown"><a className="dropdown-item dropdown-toggle arrow-none" href="/">Invoices <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/invoices-list">Invoice List</a><a className="dropdown-item" href="/invoices-detail">Invoice Detail</a></div></div><div className="dropdown"><a className="dropdown-item dropdown-toggle arrow-none" href="/">Contacts <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/contacts-grid">User Grid</a><a className="dropdown-item" href="/contacts-list">User List</a><a className="dropdown-item" href="/contacts-profile">Profile</a></div></div></div></li><li className="nav-item dropdown"><a className="nav-link dropdown-toggle arrow-none" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line></svg>Components <div className="arrow-down"></div></a><div className="dropdown-menu"><div className="dropdown"><a className="dropdown-item dropdown-toggle arrow-none" href="/">Forms <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/form-elements">Basic Elements</a><a className="dropdown-item" href="/form-validation">Validation</a><a className="dropdown-item" href="/form-advanced">Advanced Plugins</a><a className="dropdown-item" href="/form-editors">Editors</a><a className="dropdown-item" href="/form-uploads">File Upload </a><a className="dropdown-item" href="/form-wizard">Wizard</a><a className="dropdown-item" href="/form-mask">Form Mask</a></div></div><div className="dropdown"><a className="dropdown-item dropdown-toggle arrow-none" href="/">Tables <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/tables-basic">Bootstrap Basic</a><a className="dropdown-item" href="/tables-datatable">Data Tables</a><a className="dropdown-item" href="/tables-responsive">Responsive</a><a className="dropdown-item" href="/tables-editable">Editable</a></div></div><div className="dropdown"><a className="dropdown-item dropdown-toggle arrow-none" href="/">Charts <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/charts-apex"> Apex charts</a><a className="dropdown-item" href="/charts-echart"> E Charts</a><a className="dropdown-item" href="/charts-chartjs"> Chartjs</a><a className="dropdown-item" href="/charts-sparkline">Sparkline</a></div></div><div className="dropdown"><a className="dropdown-item dropdown-toggle arrow-none" href="/">Icons <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/icons-boxicons">Boxicons</a><a className="dropdown-item" href="/icons-materialdesign">Material Design</a><a className="dropdown-item" href="/icons-dripicons">Dripicons</a><a className="dropdown-item" href="/icons-fontawesome">Font awesome </a></div></div><div className="dropdown"><a className="dropdown-item dropdown-toggle arrow-none" href="/">Maps <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/maps-google">Google </a><a className="dropdown-item" href="/maps-vector">Vector </a><a className="dropdown-item" href="/maps-leaflet">Leaflet </a></div></div></div></li><li className="nav-item dropdown"><a className="nav-link dropdown-toggle arrow-none" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline></svg>Extra pages <div className="arrow-down"></div></a><div className="dropdown-menu"><div className="dropdown"><a className="dropdown-item dropdown-toggle arrow-none" href="/">Invoices <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/invoices-list">Invoice List</a><a className="dropdown-item" href="/invoices-detail">Invoice Detail</a></div></div><div className="dropdown"><a className="dropdown-item dropdown-toggle arrow-none" href="/">Authentication <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/page-login">Login</a><a className="dropdown-item" href="/page-register">Register</a><a className="dropdown-item" href="/page-recoverpw">Recover Password</a><a className="dropdown-item" href="/page-lock-screen">Lock Screen</a><a className="dropdown-item" href="/page-confirm-mail">Confirm Mail</a><a className="dropdown-item" href="/page-email-verification">Email Verification</a><a className="dropdown-item" href="/page-two-step-verification">Two Step Verification</a></div></div><div className="dropdown"><a className="dropdown-item dropdown-toggle arrow-none" href="/">Utility <div className="arrow-down"></div></a><div className="dropdown-menu"><a className="dropdown-item" href="/pages-starter">Starter Page</a><a className="dropdown-item" href="/pages-maintenance">Maintenance</a><a className="dropdown-item" href="/pages-comingsoon">Coming Soon</a><a className="dropdown-item" href="/pages-timeline">Timeline</a><a className="dropdown-item" href="/pages-faqs">FAQs</a><a className="dropdown-item" href="/pages-pricing">Pricing</a><a className="dropdown-item" href="/pages-404">Error 404</a><a className="dropdown-item" href="/pages-500">Error 500</a></div></div></div></li></ul></div></nav></div></div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
};

export default Navbar;
