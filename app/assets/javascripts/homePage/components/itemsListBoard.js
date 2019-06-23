import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import ItemCard from './itemCard'
import Typography from '@material-ui/core/Typography';
import { handleSearchKeywordsChange } from '../redux/actions/rootActions'
import { Loading } from '../../utilities/loadingComponent/loading'

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
    searchLable: {
        margin: "unset !important"
    },
    errorTips: {
        display: "block",
        marginLeft:  theme.spacing.unit
    }
});

class ItemsListBoard extends React.Component{

    // handleSearchItems = keyWords => {
    //     this.props.searchKeywordsChange(keyWords);
    // };
    componentDidMount(prevProps, prevState){
        window.addEventListener('scroll', this.handleOnScroll);
    }

    componentWillUnmount(prevProps, prevState){
        window.removeEventListener('scroll', this.handleOnScroll);
    }

    handleOnScroll = () => {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom) {
            // this.querySearchResult();
            console.log('reached bottom')
        }
    };

    querySearchResult = () => {
        if (this.state.requestSent) {
            return;
        }

        // enumerate a slow query
        setTimeout(this.doQuery, 2000);

        this.setState({requestSent: true});
    };


    doQuery = () => {
        $.ajax({
            url: "#",
            data: null,
            method: "GET",
            success: function(data) {
                var fakeData = this.createFakeData(this.state.data.length, 20);
                var newData = this.state.data.concat(fakeData);
                this.setState({data: newData, requestSent: false});
            }.bind(this),
            error: function(jqXHR, textStatus, errorThrown) {
                this.setState({requestSent: false});
            }.bind(this)
        });
    };

    render(){
        const {classes, allItems, loading} = this.props;

        return(
            <div className={classes.root} id="items-list-container">
                {loading && <Loading />}
                <Grid container spacing={24} className={classes.container}>
                    {allItems.length ==0 && !loading && <Typography  variant="caption" gutterBottom align="center" className={classes.errorTips}>
                        抱歉，没有您要搜索的商品
                    </Typography>}
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
        searchKeywordsChange: (keyWords)=> {
            dispatch(handleSearchKeywordsChange(keyWords))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemsListBoard));