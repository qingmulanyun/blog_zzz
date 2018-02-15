import React from 'react';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
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
                <GridList cellHeight={180} cols={4} className={classes.gridList} spacing={10}>
                    {allItems.map((item, index )=> (
                        <GridListTile key={index}>
                            <img src={item.image} alt={item.name} onError={ (e)=>{e.target.src="/assets/blog/profile.jpeg"}} />
                            <GridListTileBar
                                title={item.name}
                                subtitle={<span>价格: {item.price}</span>}
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    allItems: state.root.items,
    loading: state.root.loading
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemsListBoard));