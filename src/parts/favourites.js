import React, { Component } from 'react';
import { browserHistory } from 'react-dom';
// import FileBase64 from 'react-file-base64';
import { PostData } from '../service/post.js';
import Messages from './conversations';

class Fav extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div className='menu-nav tac'>
                        <a href="#new-message"><i onClick={() => this.setState({new: true})} className="fas fa-plus flr"></i></a>
                        <h4 className='menu-head'>Favourites</h4>
                    </div>
            </div>
        )
    }
}

export default Fav
