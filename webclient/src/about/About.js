import React, { Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react'

class About extends Component {

    render() {
        return (
            <div>
                <Segment basic padded>
                    <Header id="title" textAlign='center' as='h1'>About</Header>
                </Segment>
                <Segment basic padded>
                    <Container text>
                        <p>Bloom is a project in collaboration with API Chaya, a local nonprofit that serves Asian, South Asian, and Pacific Islander survivors and families impacted by domestic violence and sexual assault, as well as human trafficking survivors from all communities.</p>
                        <p>Bloom is a storytelling platform intended as a resource for victims and survivors.  We encourage afflicted individuals to share your story with API Chaya through Bloom. Confidentiality is strictly enforced and stories are regulated by API Chaya to ensure privacy.</p>
                        <p>Thank you to all who exhibit bravery and resilience in participating.</p>
                        <p>If you are visiting Bloom and are interested in learning more about API Chaya's services, please visit the main <a href="https://www.apichaya.org">website</a>.</p>
                        <p>
                            Additional contact information:<br />
                            info@apichaya.org<br />
                            Office: 206-467-9976<br />
                            Office hours: Monday-Friday 9am-5pm<br />
                            Helpline: 206-325-0325 or (toll-free) 1-877-922-4292 <br />
                            Helpline hours: Monday-Friday, 10am-4pm
                            </p>
                    </Container>
                </Segment>
            </div>
        )
    }
}

export default About