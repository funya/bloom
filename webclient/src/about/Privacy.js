import React, { Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react'

class Privacy extends Component {

    render() {
        return (
            <div>
                <Segment basic padded>
                    <Header id="title" textAlign='center' as='h1'>Privacy Policy</Header>
                </Segment>
                <Segment basic padded>
                    <Segment basic>
                        <Container text>
                            This privacy policy was last modified on May 24, 2017.
                            <br/>
                            <br/>
                            Bloom is a storytelling platform that operates on chayabloom.me. Our services
                            provide a space in which trauma survivors can share their stories in a reliable,
                            flexible, and secure manner. Privacy is of utmost importance to Bloom and we 
                            understand the importance of enabling the privacy and providing the legal 
                            implications of this site.  This page informs you of our policy regarding the
                            collection, use, and disclosure of personal information we receive from users 
                            of the site.
                            <br/>
                            <br/>
                            We use personal information only for the purpose of offering services and 
                            linking users to their personal accounts. By using Bloom, you agree to the 
                            collection of information in accordance with this policy.
                        </Container>
                    </Segment>

                    <Segment basic>
                        <Container text><Header as='h1'>Information Collection and Use</Header></Container>
                        <Container text>
                            We ask account holders to provide email addresses, which constitutes the 
                            only relevant information linking your identity to Bloom. Personally identifiable 
                            information that is optional to disclose in your stories and accounts include other
                            aspects such as name, gender, ethnicity.  These attributes are optional, only
                            an email is mandatory.  Data will not be shared with outside entities except 
                            the story data users wish to disclose to the public. Our aim is to make Bloom as 
                            anonymous as the user desires.
                        </Container>
                    </Segment>

                    <Segment basic>
                        <Container text><Header as='h1'>Log Data</Header></Container>
                        <Container text>
                            Like many site operators, we collect information that your browser 
                            sends whenever you visit our Site. This Log data may include information
                            such as your IP address, browser type, version, and pages that you 
                            have visited as well as time and date of your visit.
                        </Container>
                    </Segment>

                    <Segment basic>
                        <Container text><Header as='h1'>User Rights</Header></Container>
                        <Container text>
                            As a user of Bloom, you constitute the right to remove any or all personal and
                            nonpersonal data at any time.  This data will be deleted from our backend database
                            and nothing will be saved that can be traced to you.
                            If you have further question regarding our privacy policy, please contact us.
                        </Container>
                    </Segment>
                </Segment>
            </div>
        )
    }
}

export default Privacy