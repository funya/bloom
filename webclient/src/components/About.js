import React, { Component } from 'react';

//import { Menu, Container, Header, Image, Button, Grid, Input } from 'semantic-ui-react'
import './About.css'
var FontAwesome = require('react-fontawesome');
import lotus from '../img/lotus.svg'

class About extends Component {
    render() {
        return ( 
            <div className = "about">
                <FontAwesome name='rocket' spin/>,
                <br/>
                <img id="lotuslogo" src={lotus} alt='logo' /><h1 id='title' >About Bloom</h1>
                <br/>
                <p> ****rewrite this area/ REPLACE LOGO - text for testing<br/><br/>
                
                Bloom is a project in collaboration with API Chaya, a local nonprofit that serves Asian, South Asian, and Pacific Islander survivors and families impacted by domestic violence and sexual assault, as well as human trafficking survivors from all communities.
                <br/>
                <br/>
                Bloom is a storytelling platform intended as a resource for victims and survivors.  We encourage afflicted individuals to share your story with API Chaya through Bloom.  Confidentiality is strictly enforced and stories are regulated by API Chaya to ensure privacy.
                <br/>
                <br/>
                Thank you to all who exhibit bravery and resilience in participating.
                <br/>
                <br/>
                If you are visiting Bloom and are interested in learning more about API Chaya's services, please visit their website: <a href="https://www.apichaya.org">https://www.apichaya.org</a>
                <br/>
                <br/>
                Additional contact information:<br/>
                info@apichaya.org<br/>
                Office: 206-467-9976<br/>
                Office hours: Monday-Friday 9am-5pm<br/>
                Helpline: 206-325-0325 or (toll-free) 1-877-922-4292 <br/>
                Helpline hours: Monday-Friday, 10am-4pm
                </p>
                <br/>
                <br/>
            </div>
        );
    }
}

export default About