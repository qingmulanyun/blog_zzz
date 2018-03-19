import React from 'react'
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Sidebar from './sidebarComponent'
import classnames from 'classnames'
import { Loading } from '../../utilities/loadingComponent/loading';

const style = theme => ({
    contentContainer: {
        paddingTop: "0.5em !important"
    }
});

class RootPage extends React.Component {

    render (){
        const { classes, loading } = this.props;
        return (
            <div className="row">
                {loading && <Loading />}
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


const mapStateToProps = (state) => ({
    loading: state.root.loading
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RootPage));