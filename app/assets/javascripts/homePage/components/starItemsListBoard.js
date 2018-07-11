import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import { connect } from 'react-redux'


const styles = theme => ({
    root: {
        marginTop: '2em'
    }
});


class StarItemsListBoard extends React.Component{

    componentDidMount(prevProps, prevState){
        $('#starred-items-container').carousel();
    }

    render(){
        const { classes, starredItems } = this.props;

        return (
            <div className={classes.root}>
                <h5 className="header center-align">本月明星产品</h5>
                <div className="carousel" id="starred-items-container">
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