import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAQuestion, addLike, getLikes, addUpvote, getUpvotes } from '../../actions/management';
import AnswerForm from './AnswerForm';
import CommentForm from './CommentForm';
import { withRouter } from 'react-router-dom';
import { createMessage } from '../../actions/messages';

export class Question extends Component {

    state = {
        ansID:0
    }

    static propTypes = {
        aquest: PropTypes.array.isRequired,
        getAQuestion: PropTypes.func.isRequired,
        addLike: PropTypes.func.isRequired,
        getLikes: PropTypes.func.isRequired,
        addUpvote: PropTypes.func.isRequired,
        getUpvotes: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        likes: PropTypes.array.isRequired,
        upvotes: PropTypes.array.isRequired,
        auth: PropTypes.object.isRequired,
    }

    componentDidMount(){
        this.props.getLikes();
        this.props.getUpvotes();
        this.props.getAQuestion(this.props.id);
    };

    joinLike = (ansID) => {
        const { isAuthenticated, user } = this.props.auth

        isAuthenticated ? !this.props.likes.some(like => like.owner.username == user.username) ?
        this.props.addLike({toAnswer:[ansID]}, this.props.id) : this.props.likes.some(like => like.toAnswer.includes(ansID) && like.owner.username == user.username) ?
        this.props.createMessage({ liked: "Sorry, you have liked this answer" }) : 
        this.props.addLike({toAnswer:(this.props.likes.filter(like => like.owner.username == user.username)[0].toAnswer).concat([ansID])}, this.props.id, this.props.likes.filter(like => like.owner.username == user.username)[0].id) :
        this.props.history.push('/login')

    }

    joinUpvote = (comID) => {
        const { isAuthenticated, user } = this.props.auth

        isAuthenticated ? !this.props.upvotes.some(vote => vote.owner.username == user.username) ?
        this.props.addUpvote({toComment:[`${comID}`]}, this.props.id) : this.props.upvotes.some(vote => vote.toComment.includes(comID) && vote.owner.username == user.username) ?
        this.props.createMessage({ upvoted: "Sorry, you have liked this comment" }) : 
        this.props.addUpvote({toComment:(this.props.upvotes.filter(vote => vote.owner.username == user.username)[0].toComment).concat([comID])}, this.props.id, this.props.upvotes.filter(vote => vote.owner.username == user.username)[0].id) :
        this.props.history.push('/login')
    }

    onClick = (ansID) => {
        this.setState({ansID:ansID});
        $('#comment').modal('show');
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="jumbotron">
                        <h1 className="display-5">{ this.props.aquest.map(q => (
                            q.question
                        )) }</h1>
       
                        <div className="lead">{ this.props.aquest.map(q => (
                            <h5 key={q.id}>
                                { q.spec }<small className="text-muted"> - {q.owner.username}</small>
                            </h5>
                        )) }</div>
                        <hr className="my-4"/>


                        { this.props.aquest.map(q => (

                            <div key={q.id}>

                                { q.answers.sort((a,b) => b.likes.length - a.likes.length).map(a => (
                                    
                                    <div className="card mb-3" key={a.id}>
                                        <h3 className="card-header">{a.owner.username}</h3>
                                    
                                        <div className="card-body">
                                            <h5><strong>{a.answer}</strong></h5>
                                        </div>
                                        {a.picture !== null ? <img style={{height: "100%", width: "100%", display: "block"}} src={a.picture} className="img-fluid" alt="Card image" /> : <div/>}

                                        <hr className="my-4"/>
                                        <div className="card-body">
                                            <h4 className="card-subtitle text-muted">Comments</h4>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            { a.comments.sort((a,b) => b.upvotes.length - a.upvotes.length).map(c => (
                                                <li className="list-group-item" key={c.id}> { c.comment } - { c.owner.username } <br/><br/>

                                                    <div className="btn-group mr-2" role="group" aria-label="Second group">
                                                        <span className="btn btn-secondary btn-sm">{c.upvotes.length}</span>
                                                        <button type="button" className="btn btn-secondary btn-sm" onClick={ this.joinUpvote.bind(this, c.id) }>&#9650;</button>
                                                    </div>
                                                </li>
                                                
                                            ))}
                                        </ul>

                                        <div className="container mt-2 mb-2">
                                            <button type="button" className="btn btn-primary" onClick={ this.onClick.bind(this, a.id) }>Comment</button>
                                        </div>

                                        <div className="modal fade" id="comment" tabIndex="-1" role="dialog" aria-labelledby="commentTitle" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Comment</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <CommentForm ansID={this.state.ansID} questID={this.props.id}/>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                
                                        <div className="card-footer text-muted">
                                            <div className="btn-group mr-2" role="group" aria-label="Second group">
                                            <span className="btn btn-secondary">{a.likes.length}</span>
                                                <button type="button" className="btn btn-secondary" onClick={ this.joinLike.bind(this, a.id) } >&#10084;</button>
                                            </div>
                                        </div>
                                    </div>

                                ))}

                            </div>
                        )) }
                        
                        <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#answer">Answer</button>
                        <div className="modal fade" id="answer" tabIndex="-1" role="dialog" aria-labelledby="commentTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Answer</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <AnswerForm id={this.props.id}/>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    aquest: state.aquest,
    auth: state.auth,
    likes: state.management.likes,
    upvotes: state.management.upvotes,
});


export default connect(mapStateToProps, {getAQuestion, addLike, getLikes, createMessage, addUpvote, getUpvotes})(withRouter(Question));
