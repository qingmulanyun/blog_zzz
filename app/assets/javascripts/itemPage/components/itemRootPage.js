import React from 'react';
import { withStyles } from 'material-ui/styles';
import { fetchItem } from '../redux/actions/rootActions'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid';
import ItemDetailsCard from './itemDetailCard'
import CartItemsList from './cartItemsList'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: 280,
        width: "100%",
        border: "1px solid rgba(0,0,0,.05)"
    },

});


class ItemRootPage extends React.Component{

    componentWillMount() {
        const url = window.location.href;
        const item_id = url.split("/").slice(-1)[0]
        this.props.fetchItem(item_id)
    }
    render(){
        const {classes, currentItem, loading } = this.props;

        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6} md={6} xl={3} lg={4}>
                        <img
                            onError={ (e)=>{e.target.src="/assets/blog/profile.jpeg"}}
                            className={classes.media}
                            src={currentItem.image}
                            title={currentItem.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} xl={9} lg={8}>
                       { Object.keys(currentItem).length !== 0 && <ItemDetailsCard item={currentItem}/>}
                    </Grid>
                </Grid>
                <CartItemsList />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentItem: state.root.item,
    loading: state.root.loading
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItem: (id)=> {
            dispatch(fetchItem(id))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemRootPage));