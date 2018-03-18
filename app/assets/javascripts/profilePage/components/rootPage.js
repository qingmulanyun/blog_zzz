import React from 'react'
import { withStyles } from 'material-ui/styles';
import { connect } from 'redux';
import Sidebar from './sidebarComponent'

const style = theme => ({

});

class RootPage extends React.Component {

    render (){
        return (
            <div className="row">

                <div className="col s3">
                    <Sidebar />
                </div>

                <div className="col s9">
                    {this.props.children}
                </div>

            </div>
        )
    }
}

export default RootPage