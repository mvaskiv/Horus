import React, { Component } from 'react';
import { browserHistory } from 'react-dom';
// import FileBase64 from 'react-file-base64';
import { PostData } from '../service/post.js';
import Chat from './chat';
import App from '../App';
import ReactPullToRefresh from 'react-pull-to-refresh';

const MessagePreview = (props) => {
    var username = props.data.data.f_name;
    var chatid = props.data.id;
    var ava = props.data.data.avatar;
    var myid = localStorage.getItem('uid');

    const timeFinder = (t) => {
        if (t) {
            var s = t.split(" ");
            var x = s[1].split(":");
            return x[0] + ":" + x[1];
        }        
    }
    const dateFinder = (t) => {
        if (t) {
            var s = t.split(" ");
            var x = s[0].split("-");
            return x[2] + "." + x[1];
        }        
    }
    var now = new Date();
    var then = new Date(props.data.data.lstmsg.date)
    var day = then.getUTCDay() === now.getUTCDay() ? false :
        then.getUTCDay() === now.getUTCDay() - 1 ? 'Yesterday' :
            dateFinder(props.data.data.lstmsg.date);
    var date = timeFinder(props.data.data.lstmsg.date);
    var sender = props.data.data.lstmsg.sender === myid ? 'You' : username;
    var text = props.data.data.lstmsg.msg;
    var mateid = props.data.user1 === myid ? props.data.user2 : props.data.user1;

    // var previewText = props.data[2];
    return (
        <li key={this} onClick={() => Messages.setChatid(chatid, mateid, ava, username)}>
            <div className="message-header">
                <div className="usr-thumb-sm">
                    <img className='usr-thumb-pic-sm' alt='' src={props.data.data.avatar ? '/Matcha/uploads/' + props.data.data.avatar : '/Matcha/uploads/avatar-placeholder.png'}/>
                </div>
                <div className="message-prev" onClick={() => Messages.setChatid( chatid )}>
                    <span className='message-prev'>
                        <b>{ username }</b><br />
                        <i>{ sender }:</i> { text }    
                    </span>
                </div>
                <div className='msg-prev-date'>
                    <p>{day ? day : date }</p>
                </div>
            </div>
        </li>
    );
}

class Messages extends Component {
    constructor() {
        super();
        this.state = {
            token: localStorage.getItem('udata'),
            id: localStorage.getItem('uid'),
            chats: false,
            chatid: false,
            mate: '',
            new: false
        }
        this._getData = this._getData.bind(this);
        this.refresh = this.refresh.bind(this);
        Messages._updatedDialog = Messages._updatedDialog.bind(this);
        Messages.resetChat = Messages.resetChat.bind(this);
        Messages.setChatid = Messages.setChatid.bind(this);
        Messages.backToMessages = Messages.backToMessages.bind(this);
    }

    componentDidMount() {
        this._getData();
    }

    static resetChat () {
        this.setState({chatid: false});
        App._hideMenu(0);
        // this.setState({new: false});
    }

    static async setChatid(chat, user, ava, username) {
        if (chat === -42) {
            var messageState = {status: 'msg', to: user, token: localStorage.getItem('udata'), id: localStorage.getItem('uid'), msg: null};
            await PostData('send', messageState).then((result) => {
                let responseJson = result;
                if (responseJson.id) {
                    App._callChat(chat, user, ava, username);
                    // this.setState({chatid: responseJson.id});
                    // this.setState({mate: {f_name: username, avatar: ava, id: user}});
                    return ;
                }
            });
            // await this.state.chats.forEach(c => {
            //     if (c.user1 === user || c.user2 === user) {
            //         this.setState({chatid: c.id});
            //         return ;
            //     }
            // });
        }
        // this.setState({chatid: chat});
        // this.setState({mate: {f_name: username, avatar: ava, id: user}});
        
        
        // App._callMenuItem('conversations');
        // App._hideMenu(1);
        App._callChat(chat, user, ava, username);
        // this.setState({new: false});
    }

    static _updatedDialog() {
        this._getData();
    }

    static backToMessages() {
        this.setState({chatid: false});
        this.setState({new: false});
    }

    _getData() {
        PostData('getchats', this.state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                var a = responseJson.data;
                this.setState({chats: a});
                if (responseJson.status === 'dbEnd') {
                    this.setState({dbEnd: true});
                    // this.ulist.removeEventListener('scroll', this._scrollListener);
                    // return true;
                }
                // return true;
            }
        });
        return new Promise(function(resolve, reject) {
           resolve('success');
        });
    }

    refresh(resolve, reject) {
        if (this._getData()) {
          resolve();
        } else {
          reject();
        }
    }  

    render () {
        const chatmap = this.state.chats ? this.state.chats.map((chat, i) => {
            return (
                <MessagePreview
                    key={i}
                    data={chat} />
            );
        }) : null;
        // if (this.state.chatid) {
        //     return <Chat
        //         id={this.state.chatid}
        //         mate={this.state.mate}  />
        // } else {
            return (
                <div className='messages-panel'>
                    <div className='menu-nav tac'>
                        <a className='edit-btn' href="#">Edit</a>
                        <a href="#new-message"><i onClick={() => this.setState({new: true})} className="fas fa-share flr new-msg"></i></a>
                        <h4 className='menu-head'>Messages</h4>
                    </div>
                    <ReactPullToRefresh
                        onRefresh={this.refresh} >
                        <div className='loading'>
                            <span id="l1">.</span>
                            <span id="l2">.</span>
                            <span id="l3">.</span>
                        </div>
                        <ul>
                            { chatmap }
                        </ul>
                        
                    </ReactPullToRefresh>
                </div>
            );
        // }
    }
}

export default Messages