import React, { Component } from 'react';
import { Container, Segment, Icon, Image, Card, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class StoryItem extends Component {

    render() {
        return (
            <Card fluid color='pink' as='div' centered className='story-item'>
                    <Card.Content>
                        <Divider horizontal style={{whiteSpace:"normal"}}><Card.Header as='h1' className='story-item-header'>{this.props.name}</Card.Header></Divider>
                        {this.props.description != "" && (
                            <Card.Description className='text-container'>{this.props.description}</Card.Description>)
                        }
                    </Card.Content>
                <Card.Content extra className='extra-link-container'> 
                    <Link to={`story/${this.props.id}`}> Read more <Icon name='long arrow right'/></Link> 
                </Card.Content>
            </Card>
        )
    }
}

export default StoryItem
