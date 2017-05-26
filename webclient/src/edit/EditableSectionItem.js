import React, { Component } from 'react';
import { Segment, Icon, Card, Image } from 'semantic-ui-react';
import EditSectionModal from './EditSectionModal';
import DeleteSectionModal from './DeleteSectionModal';

class EditableSectionItem extends Component {
    render() {
        let { section } = this.props
        return (
            <div className='section-grid-item-container'>
                <div className='menu-icons'>
                    <Icon name='content' className='reorder-icon' size='large' />
                    <div className='menu-icons-right'>
                        <EditSectionModal section={section}/>
                        <DeleteSectionModal section={section}/>
                    </div>
                </div>
                <Card className='section-grid-item-content'>
                    {
                        section.image.length > 0 ? (
                            <Image src={section.image} />
                        ) : (
                                <Card.Content description={section.body} />
                            )
                    }
                </Card>
            </div>
        )
    }
}

export default EditableSectionItem