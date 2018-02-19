import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';

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

$('.carousel.carousel-slider').carousel({fullWidth: true});

class AdsListBoard extends React.Component{
    render(){
        const { classes, allItems } = this.props;

        return (
        <div className="carousel carousel-slider center" data-indicators="true">
            <div className="carousel-fixed-item center">

            </div>
            <div className="carousel-item red white-text" href="#one!">
                <h2>First Panel</h2>
                <p className="white-text">This is your first panel</p>
            </div>
            <div className="carousel-item amber white-text" href="#two!">
                <h2>Second Panel</h2>
                <p className="white-text">This is your second panel</p>
            </div>
            <div className="carousel-item green white-text" href="#three!">
                <h2>Third Panel</h2>
                <p className="white-text">This is your third panel</p>
            </div>
            <div className="carousel-item blue white-text" href="#four!">
                <h2>Fourth Panel</h2>
                <p className="white-text">This is your fourth panel</p>
            </div>
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

AdsListBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdsListBoard));