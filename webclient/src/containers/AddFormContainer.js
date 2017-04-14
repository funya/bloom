import { connect } from 'react-redux'
import { addTimelineItem } from '../actions'
import AddForm from '../components/AddForm'


const mapDispatchToProps = (dispatch) => {
    return {
        submitForm: (body, title, date) => {
            dispatch(addTimelineItem(body, title, date))
        }
    }
}

const AddFormContainer = connect(
    null,
    mapDispatchToProps
)(AddForm)

export default AddFormContainer