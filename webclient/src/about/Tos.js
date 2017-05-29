import React, { Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react'

class Tos extends Component {

    render() {
        return (
            <div>
                <Segment basic padded>
                    <Header id="title" textAlign='center' as='h1'>Terms of Service</Header>
                </Segment>
                <Segment basic padded>
                    <Segment basic>
                        <Container text><Header as='h1'>Conduct</Header></Container>
                        <Container text>
                            In your digital interactions with other users of Bloom, limited to seeing published
                            stories on our landing page, you agree to conduct yourself civilly and respectfully.
                            While using the website, you agree that you shall not under any circumstance, harass
                            or mention at all in negative connotation, any of the stories that users post with
                            the purpose of being public and available to other users on Bloom. Bloom reserves the
                            right to determine, at its sole discretion, what constitutes mischief or any form of
                            inappropriate behavior that is not productive towards the mission of Bloom.  Bloom has
                            the right to deny services or access to anyone who does not act in accordance with this
                            conduct statement, as well as to delete accounts and stories that are deemed harmful
                            to the mission of Bloom and or API Chaya.
                        </Container>
                    </Segment>

                    <Segment basic>
                        <Container text><Header as='h1'>Intellectual Property</Header></Container>
                        <Container text>
                            You acknowledge that Bloom retains all rights, title, and interest in and to all copyrights,
                            trademarks, trade secrets, patents, and any other rights in the Services, software
                            application and programming interfaces, and all content therein. The services, graphics,
                            and logos are owned by Bloom and protected by the laws of the United States of America.
                            You agree to prevent any unauthorized copying, use, or distribution of services.
                        </Container>
                    </Segment>

                    <Segment basic>
                        <Container text><Header as='h1'>Termination</Header></Container>
                        <Container text>
                            You may terminate your Bloom account, any associated email address and access to our services at any time.
                            You agree that until then, your information is stored in our database.
                            <br />
                            <br />
                            Termination of your account includes any or all of the following: removal of access to
                            all or part of the offerings within the Bloom services, deletion of your username,
                            password, and all associated information, and files (private and or public published stories)
                            and content associated with your account.
                        </Container>
                    </Segment>

                    <Segment basic>
                        <Container text><Header as='h1'>Applicable Law</Header></Container>
                            <Container text>
                                By using Bloom services, you agree that the Federal Arbitration Act, applicable
                                federal law, and the laws of the state of Washington, without regard to principles
                                of conflicting laws, will govern these Conditions of Use and any dispute of any sort
                                that might arise between you and Bloom.
                        </Container>
                    </Segment>
                </Segment>
            </div>
        )
    }
}

export default Tos