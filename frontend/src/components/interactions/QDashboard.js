import React, { Component, Fragment} from 'react'
import Question from './Question';

export class QDashboard extends Component {
    render() {
        return (
            <Fragment>
                <Question id={this.props.match.params.id}/>
            </Fragment>
        )
    }
}

export default QDashboard
