import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import OrdersListBoard from './ordersListBoard'
import Typography from 'material-ui/Typography';
import { Loading } from '../../utilities/loadingComponent/loading';

const styles = theme => ({
    title: {
        marginBottom: 1,
        fontSize: 16,
    },
    pos: {
        color: theme.palette.text.secondary,
    },

});


class OrdersRootPage extends React.Component{

    render(){
        const { classes, loading } = this.props;

        return(
                <div>
                    <Typography className={classes.title} >
                       已接订单
                    </Typography>
                    {loading && <Loading />}
                    <OrdersListBoard />
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrdersRootPage));