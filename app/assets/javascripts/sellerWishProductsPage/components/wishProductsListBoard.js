import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import WishProductCard from './wishProductCard'


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
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    container: {
        paddingTop: theme.spacing.unit,
        minHeight: 500
    },
    titleBar: {
        display: "flex",
        alignItems: "center"
    },
    errorTips: {
        display: "block",
        marginLeft:  theme.spacing.unit
    }
});


class WishProductsListBoard extends React.Component{

    render(){
        const { classes, loading, allWishProducts } = this.props;

        return(
                <div>
                    <Grid container spacing={24} className={classes.container}>
                        {allWishProducts.length ==0 && !loading && <Typography  variant="caption" gutterBottom align="center" className={classes.errorTips}>
                            还没有买家提出申请
                        </Typography>}
                        {allWishProducts.map((wishProduct, index )=> (
                            <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={index}>
                                <WishProductCard wishProduct={wishProduct} />
                            </Grid>
                        ))}
                    </Grid>
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

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WishProductsListBoard));