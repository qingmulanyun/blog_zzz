import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux'
import ItemCard from './itemCard'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '100px !important',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "100%"
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
});

class ItemsListBoard extends React.Component{

    render(){
        const {classes, allItems} = this.props;

        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {allItems.map((item, index )=> (
                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={index}>
                        <ItemCard item={item} />
                    </Grid>
                    ))}
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemsListBoard));