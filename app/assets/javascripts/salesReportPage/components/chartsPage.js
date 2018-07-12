import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux'
import { Line as LineChart } from 'react-chartjs';
import { Bar as BarChart } from 'react-chartjs';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
moment.locale('ZH_CN');
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '2em !important',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "100%"
    },
    container: {
        paddingTop: theme.spacing.unit,
        minHeight: 500
    },
});

var chartData = {
    labels: [],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [],
            spanGaps: true,
        }
    ]
}

const chartOptions ={
    responsive: true,
    maintainAspectRatio: true,
}

class ReportRootPage extends React.Component{

    render(){
        const { classes, loading, reportData } = this.props;
        chartData = {
            labels: reportData.labels.map(date => moment(date).format('YYYY[年] MMM')),
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: reportData.data,
                    spanGaps: true,
                }
            ]
        }
        return(
            <div className={classes.root}>
                <Grid container  spacing={24} className={classes.container}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <LineChart data={chartData} options={chartOptions}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <BarChart data={chartData} options={chartOptions}/>
                    </Grid>
                </Grid>
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