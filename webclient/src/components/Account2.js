import React, { Component } from 'react';
import { Container, Message, Segment, Header, Icon, List } from 'semantic-ui-react'

class Account2 extends Component {
    state = {
        user: {email: "bloom@bloom.com", userName: "bloom"}
    }

    render() {
        console.log(this.state)
        let welcomemessage = <Message color='green'>{`Welcome ${this.state.user.userName}`}</Message>

        return (
            <Container fluid id='accountcontainer'>
                <Container>
                    {welcomemessage}
                    <Segment padded secondary>
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='user' circular />
                            <Header.Content>@{this.state.user.userName}</Header.Content>
                            <Header.Subheader>{this.state.user.email}</Header.Subheader>
                        </Header>
                    </Segment>
                    <Segment padded>
                        <Header as='h1' textAlign='center'>Timelines</Header>
                        <List divided relaxed>
                            <List.Item>
                                <List.Icon name='ellipsis vertical' size='large' verticalAlign='middle' />
                                <List.Content>
                                    <List.Header as='a'>Point of No Return</List.Header>
                                    <List.Description as='a'>Updated 10 mins ago</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='ellipsis vertical' size='large' verticalAlign='middle' />
                                <List.Content>
                                    <List.Header as='a'>To All Those Who Have provided Me With a Reason to Continue Breathing</List.Header>
                                    <List.Description as='a'>Updated 22 mins ago</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='ellipsis vertical' size='large' verticalAlign='middle' />
                                <List.Content>
                                    <List.Header as='a'>Letter from LBG</List.Header>
                                    <List.Description as='a'>Updated 34 mins ago</List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Segment>
                </Container>
            </Container>
        )
    }
}

export default Account2