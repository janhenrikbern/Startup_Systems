import React, { Component } from 'react';

class Navbar extends Component {

    render() {
        return (
        <nav className="level">
            <div className="level-left">
                <div className="level-item">
                    <p class="title">
                        Filament
                    </p>
                </div>
            </div>
            <div className="level-right">
                {/* <div className="level-item">
                    <p class="title">
                        Menu
                    </p>
                </div> */}
            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-active">
                    <a class="navbar-link">
                        Menu
                    </a>
                    <div class="navbar-dropdown is-right">
                        <a class="navbar-item">
                            Overview
                        </a>
                        <a class="navbar-item">
                            Elements
                        </a>
                        <a class="navbar-item">
                            Components
                        </a>
                        <hr class="navbar-divider"></hr>
                        <div class="navbar-item">
                            Version 0.9.1
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </nav>
        );
    }
}

export default Navbar;