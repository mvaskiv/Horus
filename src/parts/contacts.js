import React, { Component } from 'react';
import { browserHistory } from 'react-dom';
// import FileBase64 from 'react-file-base64';
import { PostData } from '../service/post.js';
import Messages from './conversations';

const UserThumbList = (props) => {
    var username = props.data['f_name'];
    var surname = props.data['l_name'];
    var userid = props.data['id'];
    var usergen = props.data['gender'];
    var userava = props.data['avatar'];    
    var src = usergen === "M" ? "https://randomuser.me/api/portraits/med/men/" + userid + ".jpg" : "https://randomuser.me/api/portraits/med/women/" + userid + ".jpg";
    
    if (props.match) {
        var r = new RegExp(props.match, 'i');
            if (username.match(r)) {
                return (
                    <div className='u-thumb-list-wrapper' onClick={() => Messages.setChatid(-42, userid, userava, username)}>
                        <img className='user-xs-avatar' key={this} alt={ username } src={ userava ? 'Matcha/uploads/' + userava : src } />
                        <p className='u-thumb-list-name'> { username } { surname } </p>
                    </div>
                );
            } else {
                return null;
            }
        } else {
        return (
            <div className='u-thumb-list-wrapper' onClick={() => Messages.setChatid(-42, userid, userava, username)}>
                <img className='user-xs-avatar' key={this} alt={ username } src={ userava ? 'Matcha/uploads/' + userava : src } />
                <p className='u-thumb-list-name'> { username } { surname } </p>
            </div>
        );
    }
}


class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            search: '',
            testsearch: false,
            users: false,
            message: false,
            sort: 'age',
            gender: false,
            start_age: 9,
            end_age: 99,
            start: 0,
            number: 15
        }
        this._resetSearch = this._resetSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this._getAvailableUsers = this._getAvailableUsers.bind(this);
        this._scrollListener = this._scrollListener.bind(this);        
    };

    async componentDidMount() {
        await this._getAvailableUsers();
        this.ulist.addEventListener('scroll', this._scrollListener);        
    }
    
    onChange(e) {
        this.setState({search: e.target.value});
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    _scrollListener() {
        if (this.ulist.scrollTop + this.ulist.clientHeight >= this.ulist.scrollHeight) {
            this._onScroll();
        }
    }

    async _getAvailableUsers() {
        await PostData('users', this.state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                var a = responseJson.data;
                this.setState({users: a});
                if (responseJson.status === 'dbEnd') {
                    this.setState({dbEnd: true});
                    // this.ulist.removeEventListener('scroll', this._scrollListener);
                    return ;
                }
            }
        });
        await this.setState({loaded: true});
    }

    async _onScroll() {
        var n = this.state.number + 15;
        await this.setState({number: n});
        PostData('users', this.state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                var a = responseJson.data;
                this.setState({users: a});
                if (responseJson.status === 'dbEnd') {
                    this.setState({dbEnd: true});
                    // this.ulist.removeEventListener('scroll', this._scrollListener);
                    return ;
                }
            }
        });
    }

    _resetSearch() {
        this.setState({search: ''});
    }

    render() {
        if (!this.state.loaded) {
            return (
                <div>
                    <div className='menu-nav-new tac'>
                        <div>
                            <a href="#new-message"><i onClick={() => Messages.resetChat()} className="fas fa-plus flr"></i></a>
                            <h4 className='menu-head'>Contacts</h4>
                        </div>
                        <div>
                            <div className='form-element-group chat-search-input'>
                                <input
                                    type='text'
                                    className='form-element search-in'
                                    placeholder='Search' />
                                <span onClick={() => this.testMessage()} className='form-element-extra search-snd-btn'><i className="fas fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className='preloader-div'><img className='cool-preloader-img' src='https://media.giphy.com/media/26xBMTrIhFT1YYe7m/source.gif' alt='' /></div>
                </div>
            );
            // return <div className='preloader-div'><img className='cool-preloader-img' src='https://i.pinimg.com/originals/bb/9e/45/bb9e4523225243dacfd02ebc653b5b6d.gif' alt='' /></div>
        } else if (this.state.loaded) {
            if (this.state.users) {
                var userlist = this.state.users.map((user, i) => {
                    if (user.id !== localStorage.getItem('uid')) {
                        return (
                            <UserThumbList key={i} data={ user } match={ this.state.search } />
                        );
                    }
                });
            }
            
            return (
                <div>
                    <div className='menu-nav-new tac'>
                        <div>
                            <a href="#"><i className="fas fa-plus flr"></i></a>
                            <h4 className='menu-head'>Contacts</h4>
                        </div>
                        <div>
                            <div className='form-element-group chat-search-input'>
                                <input
                                    type='text'
                                    className='form-element search-in'
                                    value={ this.state.search }
                                    onChange={this.onChange}
                                    placeholder='Search' />
                                <span onClick={ this._resetSearch } className='form-element-extra search-snd-btn'><i className={ this.state.search ? 'far fa-times-circle' : 'fas fa-search' }></i></span>
                            </div>
                        </div>
                    </div>
                    <div className='messages-panel' ref={ulist => {this.ulist = ulist;}}>
                        { userlist }
                        <div className='preload-cnt'><img className='preloader-u-msg-lst' src="http://www.wellnessexpome.com/wp-content/uploads/2018/06/pre-loader.gif"
                        style={{display: this.state.dbEnd ? 'none' : 'block'}}/></div>
                    </div>
                </div>
            )
        }
    }    
}

export default Contacts