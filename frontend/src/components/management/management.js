import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTags, getQuestions, deleteQuestion, getAnswers, deleteAnswer, getComments, deleteComment, getAllQuestions} from '../../actions/management';
import { createMessage } from '../../actions/messages';
import EQForm from './EQForm';
import EAForm from './EAForm';
import ECForm from './ECForm';


export class Management extends Component {

    state = {
        Qsort:'',
        Asort:'',
        Csort:'',
        ogQest:'',
        ogSpec:'',
        ogTags: [],
        ogQestID:0,
        ogAns:'',
        ogAnsID:0,
        ogCom:'',
        ogComID: 0,
    }
    
    static propTypes = {
        allquest: PropTypes.array.isRequired,
        questions: PropTypes.array.isRequired,
        answers: PropTypes.array.isRequired,
        tags: PropTypes.array.isRequired,
        getQuestions: PropTypes.func.isRequired,
        deleteQuestion: PropTypes.func.isRequired,
        getAnswers: PropTypes.func.isRequired,
        deleteAnswer: PropTypes.func.isRequired,
        getComments: PropTypes.func.isRequired,
        deleteComment: PropTypes.func.isRequired,
        getAllQuestions: PropTypes.func.isRequired,
        getTags: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.getQuestions();
        this.props.getAnswers();
        this.props.getComments();
        this.props.getAllQuestions();
        this.props.getTags();
    };

    onClick = (id) =>{
        $(`#${id}`).popover('toggle');
    }

    onSort = (e) => {
        const sort = e.target.value;
        if (sort == "q1" || sort == 'q2' || sort == 'q3'){
            this.setState({Qsort:sort});
        }else if(sort == "a1" || sort == 'a2'){
            this.setState({Asort:sort});
        }else if(sort == "c1" || sort == "c2"){
            this.setState({Csort:sort});
        }
    }

    edQest = (quest) => {
        this.setState({ogQest:quest.question, ogSpec:quest.spec, ogQestID:quest.id, ogTags:quest.tags})
        $(`#edQest-${quest.id}`).modal('show');
    }

    edAns = (ans) => {
        this.setState({ogAns:ans.answer, ogAnsID:ans.id})
        $(`#edAns-${ans.id}`).modal('show');
    }

    edCom = (com) => {
        this.setState({ogCom:com.comment, ogComID:com.id})
        $(`#edCom-${com.id}`).modal('show');
    }

    
    render() {
        const { Qsort, Asort, Csort, ogQest, ogSpec, ogTags, ogQestID, ogAns, ogAnsID, ogCom, ogComID } = this.state;
        return (
            <Fragment>
                <div className="accordion md-accordion accordion-blocks" id="accordionEx78" role="tablist" aria-multiselectable="true">
                    <div className="card">
                        <div className="card-header" role="tab" id="headingUnfiled">
                            <a data-toggle="collapse" data-parent="#accordionEx78" href="#collapseUnfiled" aria-expanded="true" aria-controls="collapseUnfiled">
                                <h5 className="mt-1 mb-0">
                                    QUESTIONS ({this.props.questions.length}) <span><i className="fa fa-question-circle float-right"></i></span>
                                </h5>
                            </a>
                        </div>

                        <div id="collapseUnfiled" className="collapse show" role="tabpanel" aria-labelledby="headingUnfiled" data-parent="#accordionEx78">
                            <div className="card-body">
                                <div className="table-ui mb-3 float-right">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-6 col-md-12">
                                            <select className="mdb-select colorful-select dropdown-info" defaultValue={'DEFAULT'} onChange={this.onSort}>
                                                <option value="DEFAULT" disabled>Default: Oldest/Earliest</option>
                                                <option value="q1">Most Recent</option>
                                                <option value="q2">Answered</option>
                                                <option value="q3">Unanswered</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive mx-auto">
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>My Questions</th>
                                                <th />
                                                <th>People's Answers &amp; Comments</th>
                                                <th />
                                            </tr>
                                        </thead>

                                        <tbody>
                                            { Qsort != "q2" && Qsort != "q3" ? this.props.questions.sort((a,b) => Qsort == "" ? new Date(a.created_at) - new Date(b.created_at) : Qsort == "q1" ? new Date(b.created_at) - new Date(a.created_at) : null).map(question => (
                                                <tr key={question.id}>
                                                    <td>
                                                        {question.question} <br/>
                                                        <div className='d-none d-sm-block'><h6>{question.spec}</h6></div>
                                                        {question.spec.length > 0 ? <div className='d-block d-sm-none'><button type="button" className="btn btn-secondary" id={`spec-${question.id}`} onClick={this.onClick.bind(this, `spec-${question.id}`)} title="" data-container="body" data-trigger="focus" data-placement="bottom" data-content={question.spec}>Specification</button></div> : <div></div>}
                                                        <h5>
                                                        {question.tags.map(tID => <span key={tID} className="badge badge-dark mr-1 mb-1">#{this.props.tags.find(t => t.id == tID).category}</span>)}
                                                        </h5>
                                                    </td>
                                                    <td><button className="btn btn-primary btn-sm" onClick={this.edQest.bind(this, question)}>Edit</button>

                                                    <div className="modal fade" id={`edQest-${question.id}`} tabIndex="-1" role="dialog" aria-labelledby="edQestTitle" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="edQestTitle">Edit Question</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <EQForm question={ogQest} spec={ogSpec} qID={ogQestID} tIDs={ogTags}/>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </td>

                                                    { question.answers.length > 0 ?
                                                        <td>
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Answers</th>
                                                                        <th>Comments</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    { question.answers.sort((a,b) => b.likes.length - a.likes.length).map(ans => (
                                                                        <tr key={ans.id}>
                                                                            <td><button type="button" className="btn btn-secondary" id={`ans-${ans.id}`} onClick={this.onClick.bind(this, `ans-${ans.id}`)} title="" data-container="body" data-trigger="focus" data-placement="top" data-content={ans.answer}>{ ans.owner.username }</button><br/>
                                                                                &#10084; { ans.likes.length }
                                                                            </td>

                                                                            { ans.comments.length > 0 ?
                                                                                <td>  
                                                                                    { ans.comments.sort((a,b) => b.upvotes.length - a.upvotes.length).map(com => (
                                                                                        <tr key={com.id}>
                                                                                            <td><button type="button" className="btn btn-secondary" id={`com-${com.id}`} onClick={this.onClick.bind(this, `com-${com.id}`)} title="" data-container="body" data-trigger="focus" data-placement="top" data-content={com.comment}>{ com.owner.username }</button><br/>
                                                                                                &#9650;{ com.upvotes.length }
                                                                                            </td>
                                                                                        </tr>
                                                                                    )) }
                                                                                </td> :
                                                                                <td>
                                                                                    0 comments yet
                                                                                </td>
                                                                            }
                                                                        </tr>
                                                                    )) }
                                                                </tbody>
                                                            </table>
                                                        </td> : 
                                                        <td>
                                                            0 answers &amp; comments yet
                                                        </td>
                                                    }
                                                    <td><button className="btn btn-danger btn-sm" onClick={ this.props.deleteQuestion.bind(this, question.id) }>Delete</button></td>
                                                </tr>
                                            )) :
                                            this.props.questions.filter(quest => Qsort == "q2" ? quest.answers.length > 0 : Qsort == "q3" ? quest.answers.length == 0 : null).map(question => (
                                                <tr key={question.id}>
                                                    <td>
                                                        {question.question} <br/>
                                                        <div className='d-none d-sm-block'><h6>{question.spec}</h6></div>
                                                        {question.spec.length > 0 ? <div className='d-block d-sm-none'><button type="button" className="btn btn-secondary" id={`spec-${question.id}`} onClick={this.onClick.bind(this, `spec-${question.id}`)} title="" data-container="body" data-trigger="focus" data-placement="bottom" data-content={question.spec}>Specification</button></div> : <div></div>}
                                                        <h5>
                                                        {question.tags.map(tID => <span key={tID} className="badge badge-dark mr-1 mb-1">#{this.props.tags.find(t => t.id == tID).category}</span>)}
                                                        </h5>
                                                    </td>
                                                    <td><button className="btn btn-primary btn-sm" onClick={this.edQest.bind(this, question)}>Edit</button>

                                                    <div className="modal fade" id={`edQest-${question.id}`} tabIndex="-1" role="dialog" aria-labelledby="edQestTitle" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="edQestTitle">Edit Question</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <EQForm question={ogQest} spec={ogSpec} qID={ogQestID} tIDs={ogTags}/>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </td>

                                                    { question.answers.length > 0 ?
                                                        <td>
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Answers</th>
                                                                        <th>Comments</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    { question.answers.sort((a,b) => b.likes.length - a.likes.length).map(ans => (
                                                                        <tr key={ans.id}>
                                                                            <td><button type="button" className="btn btn-secondary" id={`ans-${ans.id}`} onClick={this.onClick.bind(this, `ans-${ans.id}`)} title="" data-container="body" data-trigger="focus" data-placement="top" data-content={ans.answer}>{ ans.owner.username }</button><br/>
                                                                                &#10084; { ans.likes.length }
                                                                            </td>

                                                                            { ans.comments.length > 0 ?
                                                                                <td>  
                                                                                    { ans.comments.sort((a,b) => b.upvotes.length - a.upvotes.length).map(com => (
                                                                                        <tr key={com.id}>
                                                                                            <td><button type="button" className="btn btn-secondary" id={`com-${com.id}`} onClick={this.onClick.bind(this, `com-${com.id}`)} title="" data-container="body" data-trigger="focus" data-placement="top" data-content={com.comment}>{ com.owner.username }</button><br/>
                                                                                                &#9650;{ com.upvotes.length }
                                                                                            </td>
                                                                                        </tr>
                                                                                    )) }
                                                                                </td> :
                                                                                <td>
                                                                                    0 comments yet
                                                                                </td>
                                                                            }
                                                                        </tr>
                                                                    )) }
                                                                </tbody>
                                                            </table>
                                                        </td> : 
                                                        <td>
                                                            0 answers &amp; comments yet
                                                        </td>
                                                    }
                                                    <td><button className="btn btn-danger btn-sm" onClick={ this.props.deleteQuestion.bind(this, question.id) }>Delete</button></td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br/>

                    <div className="card">
                        <div className="card-header" role="tab" id="heading79">
                            <a data-toggle="collapse" data-parent="#accordionEx78" href="#collapse79" aria-expanded="true" aria-controls="collapse79">
                                <h5 className="mt-1 mb-0">
                                    ANSWERS ({this.props.answers.length})<span><i className='fas fa-pen-square float-right'></i></span>
                                </h5>
                            </a>
                        </div>

                        <div id="collapse79" className="collapse" role="tabpanel" aria-labelledby="heading79" data-parent="#accordionEx78">
                            <div className="card-body">
                                <div className="table-ui mb-3 float-right">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-6 col-md-12">
                                            <select className="mdb-select colorful-select dropdown-info mx-2" defaultValue={'DEFAULT'} onChange={this.onSort}>
                                                <option value="DEFAULT" disabled>Default: Oldest/Earliest</option>
                                                <option value="a1">Most Recent</option>
                                                <option value="a2">Most Likes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive mx-auto">
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>My Answers</th>
                                                <th />
                                                <th>People's Comments</th>
                                                <th>To Questions</th>
                                                <th />
                                            </tr>
                                        </thead>

                                        <tbody>
                                            { this.props.answers.sort((a,b) => Asort=='' ? new Date(a.created_at) - new Date(b.created_at) : Asort=='a1' ? new Date(b.created_at) - new Date(a.created_at) : Asort=='a2' ? b.likes.length - a.likes.length : null).map(answer => (
                                                <tr key={answer.id}>
                                                    <td><div className='d-none d-sm-block'>{answer.answer}<br/></div>
                                                        {answer.answer.length > 100 ? <div className='d-block d-sm-none'><button type="button" className="btn btn-secondary" id={`mans-${answer.id}`} onClick={this.onClick.bind(this, `mans-${answer.id}`)} title="" data-container="body" data-trigger="focus" data-placement="bottom" data-content={answer.answer}>{ answer.created_at.slice(0,10) }</button><br/></div> : <div className='d-block d-sm-none'>{answer.answer}<br/></div>}

                                                        { answer.picture !== null ? 
                                                        <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target={`#ans-${answer.id}`}>Image</button> : null
                                                        }<br />

                                                        &#10084; { answer.likes.length }

                                                        <div className="modal fade" id={`ans-${answer.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="exampleModalLongTitle">{answer.picture !== null ? answer.picture.slice(52,answer.picture.length) : null}</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <img style={{height: "100%", width: "100%", display: "block"}} src={answer.picture} className="img-fluid" alt="Card image" />
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </td>
                                                    <td><button className="btn btn-primary btn-sm" onClick={this.edAns.bind(this, answer)}>Edit</button>

                                                    <div className="modal fade" id={`edAns-${answer.id}`} tabIndex="-1" role="dialog" aria-labelledby="edAnsTitle" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="edAnsTitle">Edit Answer</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <EAForm answer={ogAns} aID={ogAnsID}/>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </td>


                                                    { answer.comments.length > 0 ?
                                                        <td>
                                                            { answer.comments.sort((a,b) => b.upvotes.length - a.upvotes.length).map(com => (
                                                                <tr key={com.id}>
                                                                    <td><button type="button" className="btn btn-secondary" id={`acom-${com.id}`} onClick={this.onClick.bind(this, `acom-${com.id}`)} title="" data-container="body" data-trigger="focus" data-placement="top" data-content={com.comment}>{ com.owner.username }</button><br/>
                                                                        &#9650;{ com.upvotes.length }
                                                                    </td>
                                                                </tr>
                                                            )) }
                                                        </td>:
                                                        <td>
                                                            0 comments yet
                                                        </td>
                                                    }

                                                    <td>
                                                        { answer.questions.length > 0 ? this.props.allquest.filter(quest => quest.id == answer.questions[0]).map(quest => (
                                                            <table className="table" key={quest.id}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Original Question</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr key={quest.id}>
                                                                        <td>"{ quest.question }" - { quest.owner.username }</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        )) : "The original question was deleted"}
                                                    </td>

                                                    <td><button className="btn btn-danger btn-sm" onClick={ this.props.deleteAnswer.bind(this, answer.id) }>Delete</button></td>
                                                </tr>
                                            )) }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>

                    <div className="card">
                        <div className="card-header" role="tab" id="heading80">
                            <a data-toggle="collapse" data-parent="#accordionEx78" href="#collapse80" aria-expanded="true" aria-controls="collapse80">
                                <h5 className="mt-1 mb-0">
                                    COMMENTS ({this.props.comments.length})<span><i className="fas fa-comment-dots float-right"></i></span>
                                </h5>
                            </a>
                        </div>

                        <div id="collapse80" className="collapse" role="tabpanel" aria-labelledby="heading80" data-parent="#accordionEx78">
                            <div className="card-body">
                                <div className="table-ui mb-3 float-right">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-6 col-md-12">
                                            <select className="mdb-select colorful-select dropdown-info mx-2" defaultValue={'DEFAULT'} onChange={this.onSort}>
                                                <option value="DEFAULT" disabled>Default: Oldest/Earliest</option>
                                                <option value="c1">Most Recent</option>
                                                <option value="c2">Most Votes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive mx-auto">
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>My Comments</th>
                                                <th />
                                                <th>To Answers &amp; Questions</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.props.comments.sort((a,b) => Csort=="" ? new Date(a.created_at) - new Date(b.created_at) : Csort=="c1" ? new Date(b.created_at) - new Date(a.created_at) : Csort=="c2" ? b.upvotes.length - a.upvotes.length : null).map(comment => (
                                                <tr key={comment.id}>
                                                    <td>{comment.comment}<br/>
                                                        &#9650; {comment.upvotes.length}
                                                    </td>
                                                    <td><button className="btn btn-primary btn-sm" onClick={this.edCom.bind(this, comment)}>Edit</button>

                                                    <div className="modal fade" id={`edCom-${comment.id}`} tabIndex="-1" role="dialog" aria-labelledby="edComTitle" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="edComTitle">Edit Comment</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <ECForm comment={ogCom} cID={ogComID}/>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </td>

                                                    <td>
                                                        { this.props.allquest.map(quest => (
                                                            comment.answers.length > 0 ? quest.answers.filter(answer => answer.id == comment.answers[0]).map(ans => (
                                                                ans.questions.length > 0 ? this.props.allquest.filter(quest => quest.id == ans.questions[0]).map(quest => (
                                                                    <table key={quest.id} className="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Original Answer</th>
                                                                                <th>From Question</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr key={quest.id}>
                                                                                <td><button type="button" className="btn btn-secondary" id={`cans-${ans.id}`} onClick={this.onClick.bind(this, `cans-${ans.id}`)} title="" data-container="body" data-trigger="focus" data-placement="top" data-content={ans.answer}>{ ans.owner.username }</button><br/>
                                                                                    &#10084; { ans.likes.length }
                                                                                </td>
                                                                                <td>"{ quest.question }" - { quest.owner.username }</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                )) : "The original question was deleted"

                                                            )) : "The original answer was deleted"
                                                        )) }
                                                    </td>

                                                    <td><button className="btn btn-danger btn-sm" onClick={ this.props.deleteComment.bind(this, comment.id) }>Delete</button></td>
                                                </tr>
                                            )) }
                                        </tbody>
                                    </table>
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
    questions: state.management.questions,
    answers: state.management.answers,
    comments: state.management.comments,
    tags: state.management.tags,
    allquest: state.questions.allquest,
});

export default connect(mapStateToProps, { getTags, getQuestions, deleteQuestion, getAnswers, deleteAnswer, getComments, deleteComment, getAllQuestions, createMessage })(Management);