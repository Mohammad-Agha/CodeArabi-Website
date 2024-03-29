import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };


    useEffect(() => {
        showButton();

    }, [])

    window.addEventListener('resize', showButton);


    return (
        <>
            <nav className='navbar'>
                <Link to="/" className='navbar-logo' onClick={closeMobileMenu} >
                    &lt;/<span style={{ color: "#90ee90c5" }}>عربي</span>.كود&gt;
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to="/" className='nav-links-mobile' onClick={closeMobileMenu}>
                            الصفحة الرئيسية
                   </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/blogs" className='nav-links-mobile' onClick={closeMobileMenu}>
                            المدونات
                   </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/about" className='nav-links-mobile' onClick={closeMobileMenu}>
                            معلومات عنا
                   </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/contact" className='nav-links-mobile' onClick={closeMobileMenu}>
                            اتصل بنا
                   </Link>
                    </li>

                </ul>

            </nav>
        </>
    )
}

export default Navbar
