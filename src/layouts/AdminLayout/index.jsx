import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import classNames from "classnames";
import Sidebar from "../components/Sidebar";

import styles from './AdminLayout.module.scss';

function AdminLayout({ children }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const layoutRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (layoutRef.current && !layoutRef.current.contains(event.target)) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex">
      <div ref={layoutRef} className={classNames(styles.sidebar, { [styles.open]: sidebarVisible })}>
        <button className={classNames(styles.closeButton)} onClick={toggleSidebar}>
          <FaTimes className={classNames('text-[#fff]', 'text-[24px]')} />
        </button>
        <Sidebar />
      </div>
      <div className="w-full px-0 flex flex-col">
        <div className={classNames(styles.heading)}>
          <button className={styles.toggleButton} onClick={toggleSidebar}>
            <FaBars className={classNames('text-[#fff]', 'text-[24px]')} />
          </button>
          <span className={classNames('text-[#fff]', 'text-[24px]')}>Admin Mix Food</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
