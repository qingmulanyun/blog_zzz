import React from 'react';
import { withStyles } from 'material-ui/styles';
import { fetchAllItems } from '../redux/actions/rootActions'
import { connect } from 'react-redux'
import  ItemsListBoard  from './itemsListBoard'
import StarItemsListBoard from './starItemsListBoard'
import AdsListBoard from './adsListBoard'
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
        backgroundColor: theme.palette.background.paper,
    },
    rightBtn: {
        float: 'right',
        padding: 0,
    },
    title: {
        display: 'inline-block',
        paddingLeft: 20
    },
    titleContainer: {
        flex: 1,
        height: 36,
        lineHeight: '36px'
    }

});


class homePageBoard extends React.Component{

    componentWillMount() {
        this.props.fetchAllItems();
    }
    render(){
        const {classes, currentTab} = this.props;

        return(
            <div>
                <AdsListBoard />
                <StarItemsListBoard />
                <ItemsListBoard />
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
        fetchAllItems: ()=> {
            dispatch(fetchAllItems())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(homePageBoard));