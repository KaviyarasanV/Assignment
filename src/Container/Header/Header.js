import React from 'react';

const Header = () => {

    return (
        <header className="navbar navbar-expand-lg navbar-light" id="navbar">
            <div className="container" >
                <div className="hero__search__phone__icon" >
                    <i className="fa fa-home " aria-hidden="true"></i>
                </div>
                <div className="hero__search">
                    <div className="hero__search__phone">
                        <div className="hero__search__phone__icon">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div className="hero__search__phone__text">
                            <h5>999 4440 444 </h5>
                            <span>support 24/7 time</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;