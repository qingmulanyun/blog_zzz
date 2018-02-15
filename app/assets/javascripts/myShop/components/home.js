import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import SellerItemsBoard from './SellerItemsBoard'
import Typography from 'material-ui/Typography';
import { fetchShopInfo } from '../redux/actions/rootActions'

const styles = theme => ({
    title: {
        marginBottom: 1,
        fontSize: 16,
    },
    pos: {
        color: theme.palette.text.secondary,
    },

});


class ShopHomeBoard extends React.Component{

    componentWillMount() {
        this.props.fetchShopInfo();
    }

    render(){
        const { classes, currentShop } = this.props;

        return(
                <div>
                    <Typography className={classes.title} variant="raised" >
                        {currentShop.name} - 商品列表
                    </Typography>
                    <SellerItemsBoard />
                </div>

        );
    }
}

const mapStateToProps = (state) => ({
    currentTab: state.root.currentTab,
    currentShop: state.root.shop
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchShopInfo: ()=> {
            dispatch(fetchShopInfo())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopHomeBoard));