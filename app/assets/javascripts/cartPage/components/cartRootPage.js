import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux'
import CartItemsBoard from './cartItemsBoard'
import Typography from '@material-ui/core/Typography';
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


class CartRootPage extends React.Component{

    render(){
        const { classes, loading } = this.props;

        return(
                <div>
                    <Typography className={classes.title} >
                       购物车
                    </Typography>
                    {loading && <Loading />}
                    <CartItemsBoard />
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CartRootPage));