import React, { Component } from 'react';
import { Container, Segment, Icon, Image, Card, Divider } from 'semantic-ui-react';
import image from '../img/image.png';
import { Link } from 'react-router-dom';
import { apiRoot } from '../authentication/Auth';


class StoryItem extends Component {

    render() {
        return (
            <Card fluid color='pink' as='div' centered className='story-item'>
                

                {this.props.description != "" &&
                    <Card.Content>
                        <Divider horizontal style={{whiteSpace:"normal"}}><Card.Header as='h1' className='story-item-header'>{this.props.name}</Card.Header></Divider>
                        <Card.Description className='text-container'>{this.props.description}</Card.Description>
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
