import React from 'react'
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Sidebar from './sidebarComponent'
import classnames from 'classnames'

const style = theme => ({
    contentContainer: {
        paddingTop: "0.5em !important"
    }
});

class RootPage extends React.Component {

    render (){
        const { classes } = this.props;
        return (
            <div className="row">

                <div className="col s3">
                    <Sidebar />
                </div>

                <div className={classnames('col','s9', classes.contentContainer)}>
                    {this.props.children}
                </div>

            </div>
        )
    }
}

export default withStyles(style)(RootPage)