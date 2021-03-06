import React from 'react'
import {Image, Grid,} from 'semantic-ui-react'
import axios from 'axios'
import querystring from 'querystring'

import '../style/profile.css'
import '../style/avatar.css'

var mod = require('../style/color')

class ProfileView extends React.Component{
    constructor(props){
        super(props)
        this.state={user:{}}
    }
    componentDidMount(){
        axios.get('profile/profile?'+querystring.stringify({'slug' : this.props.match.params.userId})).then( response =>{
            this.setState({user:response.data})
        }).catch( error =>{
            window.location = '/mypage/home'
        })
    }
    
    render(){
        let date = new Date(this.state.user.date_joined)
        let profilecard = <div class='contain_profile'>
            <div className='profilecard' >
            <Grid columns={2} divided stackable textAlign='center'>
                <Grid.Row>
                    <Grid.Column className='avatar_for_profile_img'>
                        {this.state.user.display_picture==='http://localhost:8000/media/pic/default_profile_photo.jpeg' ? 
                                <div class='avatar-circle' style={{backgroundColor : mod.color[this.state.user.id % 13]}}><span class='initials'>{this.state.user.fname[0]}{this.state.user.lname[0]}</span></div> 
                                : <Image src={this.state.user.display_picture} circular size='small'/>
                        }
                    </Grid.Column>
                    <Grid.Column>
                        <div className='data-profile'>
                            {this.state.user.fname ? this.state.user.fname : <i>F_Name</i>} {this.state.user.lname ? this.state.user.lname : <i>L_Name</i>}<br/>
                            @{this.state.user.username}<br/>
                            {this.state.user.email}<br/>
                            {this.state.user.enr}<br/>
                            <i>Joined : {date.toDateString()}</i><br/>
                            { this.state.user.admin && <b>Admin</b>}<br/>
                            { this.state.user.disabled && <b>Disabled</b>}
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
        </div>
        return(
            profilecard
        
        )
    }
}


export default ProfileView