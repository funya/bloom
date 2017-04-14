import React, { Component } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react'

class AddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
            date: ""
        }
    }
    
    /**
     * handleChange() is called whenever the user types into the
     * input control. This updates the corresponding properties
     */
    handleBodyChange(event) {
        this.setState({ ...this.state, body: event.target.value});
    }
    handleTitleChange(event) {
        this.setState({ ...this.state, title: event.target.value});
    }
    handleDateChange(event) {
        this.setState({ ...this.state, date: event.target.value});
    }

    handleSubmit(event) {
        //tell the browser to prevent the default form submit
        //behavior so that we don't navigate away from the page
        event.preventDefault();
        //call the func prop that handles when submit is clicked.
        //which basically adds the state fields turns it into an timeline
        //item, and add to the timeline
        this.props.submitForm(this.state.body, this.state.title, this.state.date)
        //clear 
        this.setState({
            title: "",
            body: "",
            date: ""
        })
    }

    render() {
        return (
            <Form onSubmit={event => this.handleSubmit(event)}>
                <Form.Field>
                    <label> Event Title</label>
                    <input type='text'  value={this.state.title} onChange={event => this.handleTitleChange(event)}/>
                </Form.Field>
                <Form.Field width='5'>
                    <label> Event Date</label>
                    <input placeholder='Event Date'  value={this.state.date} type='date' onChange={event => this.handleDateChange(event)}/>
                </Form.Field>
                <Form.Field>
                    <label> Event Content</label>
                    <TextArea onChange={event => this.handleBodyChange(event)}  value={this.state.body}/>
                </Form.Field>
                <Button onClick={event => this.handleSubmit(event)} color='green'>Submit</Button>
            </Form>
        );
    }
}

export default AddForm;