import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography';
import { Loading } from '../../utilities/loadingComponent/loading';
import { fetchWishProductsInfo } from '../redux/actions/rootActions'
import WishProductsListBoard from './wishProductsListBoard'
import ProposalPage from './proposalPage'

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
                    <ProposalPage />
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