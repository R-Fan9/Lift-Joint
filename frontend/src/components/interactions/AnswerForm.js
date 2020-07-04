import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addAnswer } from '../../actions/management';
import { getAQuestion } from '../../actions/management';

export class AnswerForm extends Component {
    state = {
        answer: '',
        questions: [this.props.id],
        picture: null,
    }

    static propTypes = {
        addAnswer: PropTypes.func.isRequired,
        getAQuestion: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { answer, questions, picture } = this.state;
        const ans = { answer, questions, picture };
        
        this.props.isAuthenticated ? (this.props.addAnswer(ans, this.props.id)) : (this.props.history.push('/login'));
        $('#answer').modal('hide');

        this.setState({
            answer: '',
	    picture: null,
        })
    };

    handlePic = e => {
        this.setState({picture:e.target.files[0]})
    }

    render() {
        const { answer, picture } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Answer</label>
                        <input className="form-control" type="text" name="answer" onChange={this.onChange} value={answer} />
                    </div>

                    <div className="form-group">
                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.handlePic}/>
                                {picture === null ? <label className="custom-file-label" htmlFor="inputGroupFile02">Upload image (optional)</label> : <label className="custom-file-label" htmlFor="inputGroupFile02">{picture.name}</label>}
                            </div>
                        </div>
                    </div>

                    <div className='form-group'>
                        <button type="submit" className="btn btn-primary">submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addAnswer, getAQuestion })(withRouter(AnswerForm));
