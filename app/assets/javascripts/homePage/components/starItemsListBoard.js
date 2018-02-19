import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';
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
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

$(document).ready(function(){
    $('.carousel').carousel();
});

class StarItemsListBoard extends React.Component{
    render(){
        const { classes, allItems } = this.props;

        return (
            <div className="carousel">
                <a className="carousel-item" href="#one!"><img src="assets/blog/profile.jpeg" /></a>
                <a className="carousel-item" href="#two!"><img src="assets/blog/profile.jpeg" /></a>
                <a className="carousel-item" href="#three!"><img src="assets/blog/profile.jpeg"/></a>
                <a className="carousel-item" href="#four!"><img src="assets/blog/profile.jpeg"/></a>
                <a className="carousel-item" href="#five!"><img src="assets/blog/profile.jpeg"/></a>
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

StarItemsListBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StarItemsListBoard));