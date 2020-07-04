import React, { Component } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import QForm from './QForm';
import { getAllQuestions } from '../../actions/management';


export class Header extends Component {
    state = {
        search: '',
        suggestQest: [],
        suggestAuth: [],
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        getAllQuestions: PropTypes.func.isRequired,
        allquest: PropTypes.array.isRequired
    }

    componentDidMount(){
        this.props.getAllQuestions();
    }

    onChange = e => {
        const value = e.target.value;
        let suggestQest = [];
        let suggestAuth = [];
        if (value.length > 0){
            const regex = new RegExp(`${value}`, 'i');
            suggestQest = this.props.allquest.filter( q => regex.test(q.question));
            suggestAuth = this.props.allquest.filter( q => regex.test(q.owner.username));
        }
        this.setState({search: value, suggestQest, suggestAuth });
    }

    onSubmit = e => {
        e.preventDefault();

        this.props.history.push(`/search/${ this.state.search }`);
    }

    selectedSuggest = (value) => {
        this.setState({
            search: value,
            suggestQest: [],
            suggestAuth: [],
        })
    }

    showSuggestions = () =>{
        const {suggestQest, suggestAuth} = this.state;
        if(suggestQest.length === 0 && suggestAuth === 0) {
            return null;
        }
        if(suggestQest.length > 0) {
            return (
                <div className="list-group position-absolute w-100 overflow-auto" style={{zIndex: "100", cursor:"pointer", height:"150px"}}>
                    { suggestQest.map(quest => (
                        <a className="list-group-item list-group-item-action" key={quest.id} onClick={this.selectedSuggest.bind(this, quest.question)}>{ quest.question }</a>
                    )) }
                </div>
            )
        }
        if(suggestAuth.length > 0) {
            const distinctAuth = Array.from(new Set(suggestAuth.map(a => a.owner.username))).map(n => {
                return {
                    id: suggestAuth.find(s => s.owner.username === n).id,
                    username: n
                };
            });
         
            return (
                <div className="list-group position-absolute w-100 overflow-auto" style={{zIndex: "100", cursor:"pointer", height:"150px"}}>
                    { distinctAuth.map(n => (
                        <a className="list-group-item list-group-item-action" key={n.id} onClick={this.selectedSuggest.bind(this, n.username)}>{ n.username }</a>
                    )) }
                </div>
            )
        }
    }
    
    render() {
        const { isAuthenticated, user} = this.props.auth

        const { search } = this.state
        
        const authLinks = (
            <ul className="navbar-nav mr-auto">
                <span className="navbar-text mr-3">
                    <strong>
                        {user ? `Welcome ${user.username}` : ""}
                    </strong>
                </span>
                <li className="nav-item">
                    <Link to="/myAccount" className="nav-link">My Account</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={this.props.logout}>Logout</Link>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        );
        
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link to="/" className="nav-link">L &#9949; J</Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor02">
                            { isAuthenticated ? authLinks : guestLinks }

                            <Link to="/answerQs"><button type="button" className="btn btn-primary my-2 my-sm-0 mr-2">Answer</button></Link>

                            <button type="button" className="btn btn-primary my-2 my-sm-0 mr-2" data-toggle="modal" data-target="#question">Ask Questions</button>

                            <form className="form-inline my-2 my-lg-0 mr-3" onSubmit={this.onSubmit}>
                                <span className="position-relative">
                                    <input className="form-control" type="text" placeholder="Search" name="search" autoComplete="off" onChange={this.onChange} value={ search }/>
                                    { this.showSuggestions() }
                                </span>
                                <button className="btn btn-secondary my-2 ml-2" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
                <div className="modal fade" id="question" tabIndex="-1" role="dialog" aria-labelledby="questionTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="questionTitle">Ask Question</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <QForm />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = state =>({
    auth: state.auth,
    allquest: state.questions.allquest,
})

export default connect(mapStateToProps, { logout, getAllQuestions })(withRouter(Header));
