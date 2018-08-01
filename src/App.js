import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';


import './App.css';
import Login from './parts/auth';
import Chat from './parts/chat';
import Messages from './parts/conversations';
import Contacts from './parts/contacts';
import Settings from './parts/settings';
import Fav from './parts/favourites';

const MenuBar = (props) => (
  <div className='menubar' style={{ bottom: props.hidden ? -3 + 'em' : 0 + 'em' }}>
      <nav className='full'>
      <a className={(props.view === 'favourites' ? 'menulink-sel' : 'menulink')} onClick={() => App._callMenuItem("favourites")}><i className="far fa-star"></i></a>
      <a className={(props.view === 'conversations' ? 'menulink-sel' : 'menulink')} onClick={() => App._callMenuItem("conversations")}><i className="far fa-comment"></i></a>
      <a className={(props.view === 'contacts' ? 'menulink-sel' : 'menulink')} onClick={() => App._callMenuItem("contacts")}><i className="far fa-address-book"></i></a>
      <a className={(props.view === 'settings' ? 'menulink-sel' : 'menulink')} onClick={() => App._callMenuItem("settings")}><i className="fas fa-sliders-h"></i></a>
      </nav>
  </div>
)

const MainView = (props) => (
  <div>

      <div style={{display: props.view === 'favourites' ? 'block' : 'none'}}>
          <Fav />
      </div>
      <div style={{display: props.view === 'conversations' ? 'block' : 'none'}}>
          <Messages />
      </div>
      <div style={{display: props.view === 'contacts' ? 'block' : 'none'}}>
          <Contacts />
      </div>
      <div style={{display: props.view === 'settings' ? 'block' : 'none'}}>
          <Settings />
      </div>
      
  </div>
)

class App extends Component {
  constructor() {
    super();
    this.state = {
      view: 'conversations',
      hideMenu: false,
      showMessages: false,
      chatid: false,
      mate: false
    };
    App._callChat = App._callChat.bind(this);
    App._hideChat = App._hideChat.bind(this);
    App._callMenuItem = App._callMenuItem.bind(this);
    App._hideMenu = App._hideMenu.bind(this);
  }

  // componentWillMount() {
  //   switch (localStorage.getItem('theme')) {
  //     case 'dark': require('./style/dark.css');
  //   }
  // }

  componentDidMount() {
    if (!this.state.chatid) {
      this.setState({showMessages: false});
    }
  }

  static _hideChat() {
    this.setState({showMessages: false});
  }

  static _callChat(chat, user, ava, username) {
    this.setState({chatid: chat});
    this.setState({mate: {f_name: username, avatar: ava, id: user}});
    this.setState({showMessages: true});
  }

  static _hideMenu(i){
    if (i === 1) {
      this.setState({hideMenu: true});
    } else {
      this.setState({hideMenu: false});
    }
  }

  static _callMenuItem(item) {
    this.setState({view: item});
  }

  render() {
    if (!localStorage.getItem('udata')) {
      return <div className='sky-bg'><Login /></div>
    } else {
      return (
        <div className='body-cnt'>
        <div className='noti-panel-cnt' style={{transform: !this.state.showMessages ? 'translateX(100%)' : 'translateX(0%)'}}>
              <Chat 
                id={this.state.chatid}
                mate={this.state.mate}
                shown={this.state.showMessages} />
          </div>
        <div className='body-cnt' style={{transform: this.state.showMessages ? 'translateX(-33%)' : 'translateX(0%)'}}>
          <MainView view={ this.state.view } />
          <MenuBar view={ this.state.view } hidden={ this.state.hideMenu } />
          </div>
          
        </div>
      );
    }
  }
}

export default App;
