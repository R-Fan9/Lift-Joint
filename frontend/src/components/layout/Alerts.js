import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps){
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if(error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
            if(error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
            if(error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
            if(error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            if(error.msg.username) alert.error(error.msg.username.join());
            if(error.msg.answer) alert.error(`Answer: ${error.msg.answer.join()}`);
            if(error.msg.comment) alert.error(`Comment: ${error.msg.comment.join()}`);
            if(error.msg.question) alert.error(`Question: ${error.msg.question.join()}`);
        }

        if (message !== prevProps.message){
            if(message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
            if(message.addQuestion) alert.success(message.addQuestion);
            if(message.deleteQuestion) alert.info(message.deleteQuestion);
            if(message.deleteAnswer) alert.info(message.deleteAnswer);
            if(message.deleteComment) alert.info(message.deleteComment);
            if(message.liked) alert.error(message.liked);
            if(message.upvoted) alert.error(message.upvoted);
            if(message.repQuest) alert.error(message.repQuest);
            if(message.includeSpec) alert.info(message.includeSpec);
            if(message.editQuestion) alert.success(message.editQuestion);
            if(message.edQuestRep) alert.error(message.edQuestRep);
            if(message.editAnswer) alert.success(message.editAnswer);
            if(message.editComment) alert.success(message.editComment);
            if(message.repTag) alert.error(message.repTag);
            if(message.addedTag) alert.success(message.addedTag);
        }
    };

    render() {
        return <Fragment />
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
