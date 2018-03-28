import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import { Line as LineChart } from 'react-chartjs';
import { Bar as BarChart } from 'react-chartjs';
import Grid from 'material-ui/Grid';

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

const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40],
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
        const { classes, loading } = this.props;

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