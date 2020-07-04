import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addQuestion, getAllQuestions } from '../../actions/management';
import { withRouter } from 'react-router-dom';
import { createMessage } from '../../actions/messages';

export class QForm extends Component {
    state = {
        question: '',
    }

    static propTypes = {
        addQuestion: PropTypes.func.isRequired,
        getAllQuestions: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        allquest: PropTypes.array.isRequired,
    };

    componentDidMount(){
        this.props.getAllQuestions();
    }

    showNotice = (ogQuest) =>{
        $('#question').modal('hide');
        this.props.history.push('/myAccount');
        this.props.createMessage({repQuest: `Sorry, this question has been asked by ${ogQuest.owner.username}. Try ask it in 'My Account' page ;)`});
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { question } = this.state;
        const aquest = { question };

        this.props.isAuthenticated ? this.props.allquest.some(quest => quest.question.toLowerCase() === question.toLowerCase()) ?
        this.showNotice.call(this, this.props.allquest.find(quest => quest.question.toLowerCase() === question.toLowerCase())) : (this.props.addQuestion(aquest)) : (this.props.history.push('/login'));

        $('#question').modal('hide');
    
        this.setState({
            question: '',
        })

    };

    render() {
        const { question } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Question</label>
                        <input className="form-control" type="text" name="question" onChange={this.onChange} value={question} />
                    </div>
                    <div className='form-group'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    allquest: state.questions.allquest,
})

export default connect(mapStateToProps, { addQuestion, getAllQuestions, createMessage })(withRouter(QForm));