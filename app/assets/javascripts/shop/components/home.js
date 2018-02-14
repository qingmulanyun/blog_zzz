import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { connect } from 'react-redux'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';

const theme = createMuiTheme({
    palette: {
        primary: blue
    },
});

function TabContainer(props) {
    return <div>{props.children}</div>;
}

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


class ShopHomeBoard extends React.Component{

    render(){
        const { classes } = this.props;

        return(
            <MuiThemeProvider theme={theme}>
                <div>
                    <Button variant="raised" color="primary">
                        添加商品
                        <AddIcon />
                    </Button>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    currentTab: state.root.currentTab
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopHomeBoard));