import React, { useState, useEffect, createRef, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  // Create the dialog open state.
  const [open, setOpen] = useState(false);

  const handleInfoClick = () => {
    setOpen(true);
  }

  // Create the reference to the about screen dialog.
  const dialog = createRef(null);

  // Create the close action handler.
  const handleCloseClick = useCallback(event => {
    setOpen(false);
  }, []);

  // Create the listener to dialog's close button.
  useEffect(() => {
    const currentDialog = dialog.current;
    currentDialog.addEventListener('dds-dialog:action', handleCloseClick);

    return () => {
      currentDialog.removeEventListener('dds-dialog:action', handleCloseClick)
    }
  }, [dialog, handleCloseClick]);

  // Return the App component.
  return (
    <div className="App">
      <dds-dialog open={open} actions="false" ref={dialog}>
        <div slot="dds-dialog-header"></div>
        <div slot="dds-dialog-body">
          <div className="app-about-screen-body">
            <dds-icon name="cloud_wireless" stroke="#0076CE" fill="#0076CE" height="100px" width="200px"></dds-icon>
            <h1>DDSp React Boilerplate</h1>
            <p>1.1.4.32 (Release 1234, 2021218)</p>
            <div className="app-about-screen-copyright-section">
              <dds-icon stroke="#0076CE" fill="#0076CE" height="30px" width="150px" name="logo_dell_technology"></dds-icon>
              <p>&copy; 2008-2021 Dell Inc. or its subsidiaries. All rights reserved.</p>
            </div>
          </div>
        </div>
      </dds-dialog>
      <dds-masthead>
        <div slot="title">DDSp React</div>
        <dds-button type="primary" size="fluid" onClick={handleInfoClick} slot="action">
            <dds-icon name="info_circ_16"></dds-icon>
        </dds-button>
      </dds-masthead>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="dds-display-text-1">DDSp React Boilerplate</h1>
        <h2 className="dds-display-text-2">Welcome to DDSp</h2>
      </div>
      <div className="dds-container introduction-section">
        <div className="dds-row">
          <div className="card-container dds-col-lg-4 dds-col-md-12">
            <dds-card header="true" footer="true" status="default" type="default">
              <div slot="header" className="dds-row app-padding-16">
                <h1 className="dds-display-text-3">Get Started</h1>
              </div>
              <div slot="body" className="dds-row app-padding-16">
                <p className="dds-body-text">Get a high-level overview of the DDSp platform, including the components, documentations and real-life use cases.</p>
              </div>
              <div slot="footer">
                <dds-button type="tertiary"><a href="http://10.227.52.64:6009/" target="_blank"  rel="noreferrer">Getting Started</a></dds-button>
              </div>
            </dds-card>
          </div>
          <div className="card-container dds-col-lg-4 dds-col-md-12">
            <dds-card header="true" footer="true" status="default" type="default">
              <div slot="header" className="dds-row app-padding-16">
                <h1 className="dds-display-text-3">Learn and Explore</h1>
              </div>
              <div slot="body" className="dds-row app-padding-16">
                <p className="dds-body-text">Learn about the fundamental design concepts and architecture of the Dell Design System for Product.</p>
              </div>
              <div slot="footer">
                <dds-button type="tertiary"><a href="https://web.ddsproduct.com/31b3fd8b1/p/8567a6-dell-design-system-for-product/b/949ec7" target="_blank"  rel="noreferrer">Introduction to DDSp</a></dds-button>
              </div>
            </dds-card>
          </div>
          <div className="card-container dds-col-lg-4 dds-col-md-12">
            <dds-card header="true" footer="true" status="default" type="default">
              <div slot="header" className="dds-row app-padding-16">
                <h1 className="dds-display-text-3">Feedback and Support</h1>
              </div>
              <div slot="body" className="dds-row app-padding-16">
                <p className="dds-body-text">You can reach to the contributors for any feedback, help or if you want to contribute to the devkit.</p>
              </div>
              <div slot="footer">
                <dds-button type="tertiary"><a href="http://10.227.52.64:6009/?path=/story/contributing-contributors--page" target="_blank"  rel="noreferrer">Contact</a></dds-button>
              </div>
            </dds-card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
