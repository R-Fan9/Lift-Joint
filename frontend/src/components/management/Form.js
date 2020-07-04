import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addQuestion, getAllQuestions, getAQuestion, getTags, addTag } from '../../actions/management';
import { createMessage } from '../../actions/messages';
import { Link } from 'react-router-dom';


export class Form extends Component {
    state = {
        question: '',
        spec: '',
        newTag: '',
        tags: [],
        originalQuest: {id:0, question:'', owner:{username:''}},
        repeatedQest: {question: '', spec: ''},
    }

    static propTypes = {
        addQuestion: PropTypes.func.isRequired,
        getAllQuestions: PropTypes.func.isRequired,
        getAQuestion: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        addTag: PropTypes.func.isRequired,
        getTags: PropTypes.func.isRequired,
        tags: PropTypes.array.isRequired,
        allquest: PropTypes.array.isRequired,
    };

    componentDidMount(){
        this.props.getTags();
        this.props.getAllQuestions()
    }

    showNotice = (ogQuest, repQest) => {
        this.setState({originalQuest: ogQuest, repeatedQest: repQest});
        $('#repQ').modal('show');
    }

    onClick = (qID) => {
        this.props.getAQuestion.bind(this, qID);
        $('#repQ').modal('hide');
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { question, spec,  tags} = this.state;
        const aquest = { question, spec, tags };

        this.props.allquest.some(quest => quest.question.toLowerCase() === question.toLowerCase()) ? this.showNotice.call(this, this.props.allquest.find(quest => quest.question.toLowerCase() === question.toLowerCase()), aquest) : 
        this.props.addQuestion(aquest);

        this.setState({
            question: '',
            spec: '',
            tags:[],
        });
    };

    checkRepQest = (repQest) => {
        repQest.spec == '' ? this.props.createMessage({includeSpec:"Please include specification"}) : this.props.addQuestion.call(this, repQest)
    }

    createTag = e => {
        e.preventDefault();
        const {newTag} = this.state;
        this.props.tags.some(tag => tag.category.toLowerCase() == newTag.toLocaleLowerCase()) ? this.props.createMessage({repTag:"Sorry, this tag already exist"}) :
        this.props.addTag({category:newTag});

        this.setState({newTag:''});
    }

    selectTag = e => {

        const {tags} = this.state;

        var tagID = e.target.id.slice(4, e.target.id.length);
        var tagList = tags;
        if(e.target.getAttribute('aria-pressed') == 'false'){
            tagList.push(tagID);
        }else{
            tagList.splice(tagList.findIndex(tID => tID == tagID), 1)
        }
        this.setState({tags: tagList});

    }

    render() {
        const { question, spec, originalQuest, repeatedQest, newTag } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Ask Question</h2>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <input className="form-control" type="text" name="question" onChange={this.onChange} value={question} placeholder="Question"/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="spec" onChange={this.onChange} value={spec} placeholder="Specification - Optional"/>
                    </div>

                    <div className="form-group">
                        <label>Add Tags</label><br/>
                        {this.props.tags.map(tag => 
                        <button type="button" key={tag.id} className="btn btn-outline-dark btn-sm mr-2 mb-2" data-toggle="button" aria-pressed="false" autoComplete="off" id={`tag-${tag.id}`} onClick={this.selectTag}>#{tag.category}</button>
                        )}
                    </div>

                    <div className='form-group'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>

                <hr />

                <form onSubmit={this.createTag}>
                    <div className="form-group">
                        <label>Create Tag</label>
                        <input className="form-control" type="text" name="newTag" onChange={this.onChange} value={newTag} />
                    </div>

                    <div className='form-group'>
                        <button type="submit" className="btn btn-secondary">Create</button>
                    </div>
                </form>

                <div className="modal fade" id="repQ" tabIndex="-1" role="dialog" aria-labelledby="repQTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="repQTitle">Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            "{ originalQuest.question }" - { originalQuest.owner.username }
                        </div>
                        <div className="modal-footer">
                            <Link to={`/question/${originalQuest.id}`} onClick={ this.onClick.bind(this, originalQuest.id) }><button type="button" className="btn btn-secondary">View original question</button></Link>
                            <button type="button" className="btn btn-primary" onClick={this.checkRepQest.bind(this, repeatedQest)} data-dismiss="modal" >Continue Asking</button>
                        </div>
                        </div>
                    </div>
                </div> 
     

            </div>

            
        )
    }
}

const mapStateToProps = state => ({
    allquest: state.questions.allquest,
    tags: state.management.tags,
})

export default connect(mapStateToProps, { addQuestion, getAllQuestions, getAQuestion, createMessage, getTags, addTag })(Form);