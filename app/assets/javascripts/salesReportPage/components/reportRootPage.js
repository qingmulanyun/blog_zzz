import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux'
import { Loading } from '../../utilities/loadingComponent/loading';
import Typography from '@material-ui/core/Typography';
import ChartsPage from './chartsPage'
import { fetchReportData } from '../redux/actions/rootActions'

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

    componentDidMount(){
        this.props.fetchReportData();
    }


    render(){
        const { classes, loading, reportData } = this.props;

        return(
                <div>
                    <Typography className={classes.title} >
                        销售报告
                    </Typography>
                    {loading && <Loading />}

                  { Object.keys(reportData).length > 0 && <ChartsPage reportData={reportData}/>}

                </div>

        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.root.loading,
    reportData: state.root.data
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReportData:() => {
            dispatch(fetchReportData());
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReportRootPage));