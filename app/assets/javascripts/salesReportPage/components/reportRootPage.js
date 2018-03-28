import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import { Loading } from '../../utilities/loadingComponent/loading';
import Typography from 'material-ui/Typography';
import ChartsPage from './chartsPage'

const styles = theme => ({
    title: {
        marginBottom: 1,
        fontSize: 16,
    },
    pos: {
        color: theme.palette.text.secondary,
    },

});


class ReportRootPage extends React.Component{

    render(){
        const { classes, loading } = this.props;

        return(
                <div>
                    <Typography className={classes.title} >
                        销售报告
                    </Typography>
                    {loading && <Loading />}

                   <ChartsPage />

                </div>

        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.root.loading
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReportRootPage));