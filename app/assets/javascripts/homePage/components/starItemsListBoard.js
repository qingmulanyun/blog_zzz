import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
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


class StarItemsListBoard extends React.Component{
    componentDidMount(prevProps, prevState){
        $('.carousel').carousel();
    }

    render(){
        const { classes, starredItems } = this.props;

        return (
            <div>
                <div className="carousel">
                    {
                        starredItems.map(function(item,index){
                            return <a className="carousel-item" key={index} href={`/items/${item.id}`} target="_blank"><img src={item.image} onError={ (e)=>{e.target.src="/assets/blog/profile.jpeg"}} /></a>
                        })
                    }
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

StarItemsListBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StarItemsListBoard));