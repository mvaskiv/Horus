import React, { Component } from 'react';
import {browserHistory} from 'react-dom';
import { PostData } from '../service/post.js';
import App from '../App';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
            wrongCred: false,
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    login() {
        if(this.state.login && this.state.password) {
            PostData('login', this.state).then((result) => {
                let responseJson = result;
                // alert(JSON.stringify(responseJson));
                if (responseJson.status === "ok" && responseJson.token) {
                    localStorage.setItem('udata', responseJson.token);
                    localStorage.setItem('uid', responseJson.id);
                    localStorage.setItem('theme', 'light');
                    // this.setState({redirectToReferrer: true});
                    
                    setTimeout(function() {
                        window.location.reload();
                    }, 700);
                } else if (responseJson.status === "ko" || responseJson.error === "no user") {
                    this.setState({wrongCred: true});
                } else {
                    alert ("Ooops, server-side error. PLease, try again a bit later.");
                }
            });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        if (this.state.redirectToReferrer || sessionStorage.getItem('udata')) {
            // return (<Router history={browserHistory}><Route path="/" Component={ Main } /><Redirect from='/login' to='/' /></Router>)
        }
        return (
            <div className="Intro">
                <a onClick={() => App._loginCall(0)}><i className="far fa-times-circle flr mar5 close"></i></a>
                <h3>&nbsp;Welcome back</h3><br />
                    <input type="text" className='form-element full input-ln' placeholder="Your email or login" name='login' onChange={this.onChange}/>
                    <input type="password" className='form-element full input-ln' placeholder="Your password" name='password' onChange={this.onChange}/>
                <button className="btn btn-primary full" onClick={this.login}>Enter</button>
                <div className="alert a-is-danger login-alert" style={{display: this.state.wrongCred ? 'block' : 'none'}}>
                    <p>Please, check your credentials and try again.</p>
                </div>
            </div>
        );
    }
}
//     constructor() {
//         super();
//         this.state = {
//             password: '',
//             wrongCred: false,
//             redirectToReferrer: false
//         };
//         this.login = this.login.bind(this);
//         this.onChange = this.onChange.bind(this);
//     }
//     login() {
//         if(this.state.password) {
//             PostData('login', this.state).then((result) => {
//                 let responseJson = result;
//                 // alert(JSON.stringify(responseJson));
//                 if (responseJson.status === "ok" && responseJson.token) {
//                     localStorage.setItem('udata', responseJson.token);
//                     localStorage.setItem('uid', responseJson.id);
//                     this.setState({redirectToReferrer: true});
//                     browserHistory.push('/');
//                 } else if (responseJson.status === "ko" && responseJson.error === "no user") {
//                     this.setState({wrongCred: true});
//                 }
//             });
//         }
//     }

//     onChange(e) {
//         this.setState({[e.target.name]:e.target.value});
//     }

//     render() {
//         if (this.state.redirectToReferrer || sessionStorage.getItem('udata')) {
//             // return (<Router history={browserHistory}><Route path="/" Component={ Main } /><Redirect from='/login' to='/' /></Router>)
//         }
//         return (
//             <div className="Intro">
//                 <h4>&nbsp;Please provide your access code</h4><br />
//                 <input type="password" className='form-element full input-ln' placeholder="Your access code" name='password' onChange={this.onChange}/>
//                 <button className="btn btn-primary full" onClick={this.login}>Enter</button>
//             </div>
//         );
//     }
// }

export default Login;
