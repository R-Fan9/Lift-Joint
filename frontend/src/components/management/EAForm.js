import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editAnswer } from '../../actions/management';

export class EAForm extends Component {
    state = {
        answer: ''
    }

    static propTypes = {
        editAnswer: PropTypes.func.isRequired,
    };


    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { answer } = this.state;
        const ans = { answer };

        this.props.editAnswer(ans, this.props.aID);

        $(`#edAns-${this.props.aID}`).modal('hide');

    };

    render() {
        const {answer} = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Answer</label>
                        <input className="form-control" type="text" name="answer" onChange={this.onChange} value={answer} placeholder={this.props.answer} />
                    </div>
                    <div className='form-group'>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default connect(null, { editAnswer })(EAForm);