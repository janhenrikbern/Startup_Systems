import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { is_menu_active: false};
        this.remount = this.componentDidMount
    }

    componentDidMount() {
        this.setState(state => ({ is_menu_active: false}))
      }

    componentWillUnmount() {
        this.setState(state => ({ is_menu_active: false}))
    }

    onMenuClick() {
        this.setState(state => ({ is_menu_active: !state.is_menu_active}))
    }

    dropdownMenu() {
        if (this.state.is_menu_active) {
            return (
                <div className={"navbar-item has-dropdown"}>
                    <a className="navbar-link" onClick={() => this.onMenuClick()}>
                        Menu
                    </a>
                </div>
            );
        } else {
            return (
                <div className={"navbar-item has-dropdown is-active"}>
                    <a className="navbar-link" onClick={() => this.onMenuClick()}>
                        Menu
                    </a>
                    <div className="navbar-dropdown is-right">
                        <a className="navbar-item">
                            Overview
                        </a>
                        <a className="navbar-item">
                            Elements
                        </a>
                        <a className="navbar-item" onClick={() => this.props.firebase.auth().signOut()}>
                            Sign-out
                        </a>
                        <hr className="navbar-divider"></hr>
                        <div className="navbar-item">
                            Version 0.9.1
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
        <nav className="level">
            <div className="level-left">
                <div className="level-item">
                    <p className="title filament">
                        Filament
                    </p>
                </div>
            </div>
            <div className="level-right">
            {/* <div className="navbar-end">
                {this.dropdownMenu()}
            </div> */}
            </div>
        </nav>
        );
    }
}

export default Navbar;