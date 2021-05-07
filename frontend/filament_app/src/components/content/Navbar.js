import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { is_menu_active: false};
        this.remount = this.componentDidMount
    }

    // componentDidMount() {
    //     this.setState(state => ({ is_menu_active: false}))
    //   }

    // componentWillUnmount() {
    //     this.setState(state => ({ is_menu_active: false}))
    // }

    onMenuClick() {
        this.setState(state => ({ is_menu_active: !state.is_menu_active}))
    }

    dropdownMenu() {
        if (this.state.is_menu_active) {
            return (
                <div className={"navbar-item has-dropdown is-active"}>
                    <button className="navbar-link no-button-style" onClick={() => this.onMenuClick()}>
                        Menu
                    </button>
                    <div className="navbar-dropdown is-right">
                        <button className="navbar-item no-button-style">
                            Profile
                        </button>
                        <button className="navbar-item no-button-style">
                            Projects
                        </button>
                        <hr className="navbar-divider"></hr>
                        <button className="navbar-item no-button-style" onClick={() => this.props.firebase.auth().signOut()}>
                            Sign-out
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"navbar-item has-dropdown"}>
                    <button className="navbar-link no-button-style" onClick={() => this.onMenuClick()}>
                        Menu
                    </button>
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
            <div className="navbar-end">
                {this.dropdownMenu()}
            </div>
            </div>
        </nav>
        );
    }
}

export default Navbar;