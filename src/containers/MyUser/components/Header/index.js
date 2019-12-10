import React, { Component } from 'react';
import "./style.css"

class Header extends Component {
    render() {
        const { userName } = this.props
        
        return (
            <div className="my__header">
                <div className="myUser__header">
                    <div className="myUser__portrait" >
                        <i></i>
                    </div>
                    <div className="myUser__information" >
                        <p className="myUser__name"><i></i><span>{userName?userName:"未登录"}</span></p>
                    </div>
                    <div className="myUser__arrow" >
                        <span></span>
                    </div>
                </div>
            </div>

        );
    }
}

export default Header;