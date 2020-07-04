import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addComment } from '../../actions/management';

export class CommentForm extends Component {
    state = {
        comment: '',
    }

    static propTypes = {
        addComment: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { comment } = this.state;
        const com = { comment, answers:[`${this.props.ansID}`] };

        this.props.isAuthenticated ? this.props.addComment(com, this.props.questID) : (this.props.history.push('/login'));
        $('#comment').modal('hide');

        this.setState({
            comment: ''
        })
    };

    render() {
        const { comment } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Comment</label>
                        <input className="form-control" type="text" name="comment" onChange={this.onChange} value={comment} maxLength="100" placeholder="Maximum 100 characters" />
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

export default connect(mapStateToProps, { addComment })(withRouter(CommentForm));