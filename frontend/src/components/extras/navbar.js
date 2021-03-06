import React, {Component} from 'react'
import {Loader,Image, Dropdown, Dimmer } from 'semantic-ui-react'
import logo from '../../assets/logo.png'
import axios from 'axios'
import store from '../../store/store'
import { connect } from 'react-redux'

import '../../style/profile.css'
import '../../style/home.css'
var mod = require('../../style/color')

class Navbar extends Component{

    constructor(props){
        super(props)
        this.state = { user : 'no', admin : false, loggedin : false,  res : false,}
    }

    componentDidMount(){
        
        axios.get('profile/user/').then(
            (response) => {
                this.setState({loggedin:true, res:true})
                store.dispatch({
                    type: 'USER_SUCCESS',
                    user: response.data
                  });
            }
        ).catch(
            (error) =>{
                this.setState({res:true})
            }
        )
    }


    logout = () => {
        axios.get('/profile/logout').then(
            (response) => {
                this.setState({loggedin: false})
            }
        )
    }

    goto = (e, go) => {
        window.location='/mypage/'+go
    }
    
    render(){



        if(this.state.res){
            if(this.state.loggedin){
                
                const trigger = (
                    <span>
                        {this.props.user['username']} <span>&nbsp;&nbsp;</span>
                        {this.props.user.display_picture==='http://localhost:8000/media/pic/default_profile_photo.jpeg' ? 
                            <div class='avatar-circle' style={{backgroundColor : mod.color[this.props.user.id % 13],verticalAlign:'middle', width:'42px', height:'42px', display:'inline-block'}}><span class='initials_nav'>{this.props.user.fname[0]}{this.props.user.lname[0]}</span></div> 
                            : <Image src={this.props.user.display_picture} avatar/>
                        }
                    </span>
                )
                
                let adminview
                if(this.props.user['admin']){
                    adminview = <Dropdown.Item icon='spy' onClick={(e) => this.goto(e,'admin')} text='Admin'/>
                    
                }

                let nav =(
                    <div className='item1' id='color3'>
                        <div className='item1-1'>
                            <Image src= {logo} style={{width:'70px'}}/>
                            <span>&nbsp;&nbsp;</span> Bug Track
                        </div>
                        <div className ='item1-2'>
                            <Dropdown trigger={trigger}>
                                <Dropdown.Menu>
                                    <Dropdown.Item icon='home' text='My Page' onClick={(e) => this.goto(e,'home')}/>
                                    {adminview}

                                    <Dropdown.Item icon='log out' text='Logout' onClick={this.logout}/>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                )

                return(
                    nav
                )
            }
            else{
                
                window.location='/'
            }
        }
        else{
            return(
                <Dimmer active={true}>
                <Loader size='massive'></Loader>
                </Dimmer>
            )
        }

    }

    
}

function mapStateToProps(state) {

    return {
      user: state.Reducer.user
    };
}

export default connect(mapStateToProps)(Navbar);
