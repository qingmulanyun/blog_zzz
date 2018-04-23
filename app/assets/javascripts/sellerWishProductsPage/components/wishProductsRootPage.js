import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography';
import { Loading } from '../../utilities/loadingComponent/loading';
import { fetchWishProductsInfo } from '../redux/actions/rootActions'
import WishProductsListBoard from './wishProductsListBoard'
const styles = theme => ({
    title: {
        marginBottom: 1,
        fontSize: 16,
    },
    pos: {
        color: theme.palette.text.secondary,
    },

});


class WishProductsRootPage extends React.Component{

    componentWillMount() {
        this.props.fetchWishProductsInfo();
    }

    render(){
        const { classes, loading, allWishProducts } = this.props;

        return(
                <div>
                    <Typography className={classes.title} >
                       买家心愿商品申请
                    </Typography>
                    {loading && <Loading />}
                    <WishProductsListBoard />
                </div>

        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.root.loading,
    allWishProducts: state.root.allWishProducts
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchWishProductsInfo: () => {
            dispatch(fetchWishProductsInfo())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WishProductsRootPage));