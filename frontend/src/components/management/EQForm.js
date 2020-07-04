import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllQuestions, editQuestion, getTags } from '../../actions/management';
import { createMessage } from '../../actions/messages';

export class EQForm extends Component {
    state = {
        question: '',
        spec: '',
        tags:[],
    }

    static propTypes = {
        getAllQuestions: PropTypes.func.isRequired,
        editQuestion: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        getTags: PropTypes.func.isRequired,
        tags: PropTypes.array.isRequired,
        allquest: PropTypes.array.isRequired,
        auth: PropTypes.object.isRequired,
    };

    componentDidMount(){
        this.props.getTags();
        this.props.getAllQuestions();
    }
    showNotice = (ogQuest) =>{
        $(`#edQest-${this.props.qID}`).modal('hide');
        this.props.createMessage({repQuest: `Sorry, this question has been asked by ${ogQuest.owner.username}. Try ask it as a new question ;)`});
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { question, spec, tags } = this.state;
        var aquest = { question, spec, tags };
        if(question.length == 0 && spec.length == 0){
            aquest = { question:this.props.question, spec:this.props.spec, tags };
        }else if(question.length == 0){
            aquest = { question:this.props.question, spec, tags };
        }else if(spec.length == 0){
            aquest = { question, spec:this.props.spec, tags };
        }

        const { user } = this.props.auth;

        this.props.allquest.some(quest => quest.question.toLowerCase() === question.toLowerCase() && quest.owner.username != user.username) ?
        this.showNotice(this.props.allquest.find(quest => quest.question.toLowerCase() === question.toLowerCase())) : 
        this.props.editQuestion(aquest, this.props.qID);

        $(`#edQest-${this.props.qID}`).modal('hide');

    };

    deleteTag = (tID) => {
        const {tags} = this.state;
        tags.splice(tags.findIndex(t => t == tID), 1)
        this.setState({tags: tags});
    }

    addTag = (tID) => {
        const {tags} = this.state;
        tags.some(t => t == tID) ? null : (tags.push(tID), this.setState({tag:tags}))
    }

    static getDerivedStateFromProps(props, state){
        return{
            tags: props.tIDs,
        }
    }


    render() {
        const {tags} = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Question</label>
                        <input className="form-control" type="text" name="question" onChange={this.onChange} defaultValue={this.props.question} />
                    </div>
                    <div className="form-group">
                        <label>Specification - Optional</label>
                        <input className="form-control" type="text" name="spec" onChange={this.onChange} defaultValue={this.props.spec}/>
                    </div>
                    {tags.length > 0 ? 
                    <div className="form-group">
                        <h5>
                        {tags.map(tID => <span className="badge badge-pill badge-light mr-1 mb-1" key={tID}>#{this.props.tags.find(tag => tag.id == tID).category} <button onClick={this.deleteTag.bind(this, tID)}>&times;</button></span>)}
                        </h5>
                    </div> : null
                    }

                    <div className="form-group">
                        <label>Add Tag(s)</label><br/>
                        {this.props.tags.map(tag => 
                        <button type="button" className="btn btn-outline-dark btn-sm mr-2 mb-2" key={tag.id} onClick={this.addTag.bind(this, tag.id)}>#{tag.category}</button>
                        )}
                    </div>


                    <div className='form-group'>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    allquest: state.questions.allquest,
    tags: state.management.tags,
    auth: state.auth,
})

export default connect(mapStateToProps, { getAllQuestions, createMessage, editQuestion, getTags })(EQForm);