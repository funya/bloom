import React, { Component } from 'react';
import { Container, Segment, Icon, Image, Card } from 'semantic-ui-react';
import image from '../img/image.png';
import { Link } from 'react-router-dom';
import { apiRoot } from '../authentication/Auth';


class StoryItem extends Component {

    render() {
        return (
            <Card fluid color='pink' raised as='div' centered>
                <Image src={image}></Image>
                <Card.Content>
                    <Card.Header>{this.props.name}</Card.Header>
                </Card.Content>
                {this.props.description != "" &&
                    <Card.Content>
                        <Card.Description>{this.props.description}</Card.Description>
                    </Card.Content>
                }
                <Card.Content extra className='extra-link-container'>
                    <Link to={{ pathname: `story/${this.props.id}`, state: {...this.props}}}> Read more <Icon name='long arrow right'/></Link> 
                </Card.Content>
            </Card>
        )
    }
}

export default StoryItem
