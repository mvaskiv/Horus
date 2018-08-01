import React, { Component } from 'react';
import { browserHistory } from '@version/react-router-v3';
// import FileBase64 from 'react-file-base64';
import { PostData } from '../service/post.js';
import Messages from './conversations';

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            mod: false,
            theme: false
        };
        this.iniState = this.state;
        this._savePref = this._savePref.bind(this);
        this._themePref = this._themePref.bind(this);
        this.resetChanges = this.resetChanges.bind(this);
    }

    _themePref(a) {
        if (a === 1) {this.setState({theme: 'dark'});}
        else {this.setState({theme: false});}
        this.setState({mod: true})
    }

    resetChanges() {
        this.setState(this.iniState);
        this.forceUpdate();
    }

    logout() {
        if (window.confirm('Do you really wanna log out?')) {
            localStorage.removeItem('udata');
            window.location.reload();
        }
    }

    _savePref() {
        if (this.state.theme === 'dark') {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
        this.setState({updated: true});
        window.location.reload();
    }

    render() {
        var themeOn = (this.state.theme ? 'btn half btn-success' : 'btn half btn-default');
        var themeOff = (this.state.theme ? 'btn half btn-default' : 'btn half btn-danger');
        return (
            <div>
                <div className='menu-nav tac'>
                        <a href="#" className='save-btn' onClick={() => this._savePref()}>Save</a>
                        <h4 className='menu-head'>Settings</h4>
                    </div>
                    <div className='settings-self'>
                    <label>Use dark theme:</label>
                    <div className="btn-group rel mma half">
                        <button className={themeOn} onClick={() => this._themePref(1)}>YES</button>
                        <button className={themeOff} onClick={() => this._themePref(0)}>NO</button>
                    </div>
                    <a className="logout-btn" onClick={ this.logout }>Log out</a>
                </div>
            </div>
        )
    }
}

export default Settings
