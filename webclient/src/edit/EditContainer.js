import React, { Component } from 'react';
import 'whatwg-fetch'
import { arrayMove } from 'react-sortable-hoc';
import { apiRoot, storageKey } from '../authentication/Auth'
import './edit.css';
import Edit from './Edit'

class EditContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            story: this.props.location.state,
            timelineitems: [],
        };
    }

    //Fetch Sections
    fetchSections = () => {
        this.setState({ loadingSections: true })
        // Get the single story information 
        fetch(`${apiRoot}/stories/${this.state.story.id}`, {
            mode: "cors",
            headers: new Headers({
                "Authorization": localStorage.getItem(storageKey)
            })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    return Promise.reject({
                        status: resp.status,
                        statusText: resp.statusText,
                        statusMessage: resp.text()
                    })
                }
            })
            .then(data => {
                this.setState({ timelineitems: data, loadingSections: false })
            })
            .catch(err => {
                this.setState({ loadingSections: false })
                console.log(err)
                return null
            })
    }

    // Initialization of DOM nodes goes here. When the edit page is mounted, a fetch 
    // call is made to get the sections of the story. 
    componentDidMount() {
        this.fetchSections()
    }


    // Event handler that manages the changing of the story title
    handleTimelineTitleChange = (event) => this.setState({ title: event.target.value })


    // Callback called when resorting of section ends
    onSortEnd = ({ oldIndex, newIndex }) => {
        // console.log("Oldindex",oldIndex, this.state.timelineitems)
        // console.log("Newindex",newIndex, this.state.timelineitems)
        this.setState({
            timelineitems: arrayMove(this.state.timelineitems, oldIndex, newIndex),
        });
    };

    render() {
        console.log("Rendering Edit comp. State: ", this.state)
        return (
            <Edit
                {...this.state}
                fetchSections={this.fetchSections}
            />
        )
    }
}

export default EditContainer