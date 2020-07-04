import React, { Fragment } from 'react';
import Form from './Form';
import Management from './management';

export default function Dashboard() {
    return (
        <Fragment>
            <div className="jumbotron">
                <Form />
                <Management />
            </div>
        </Fragment>
            
    )
}