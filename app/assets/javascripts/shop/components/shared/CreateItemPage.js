import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux'
import { toggleCreateItemPage } from '../../redux/actions/rootActions'


const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 600,
        padding: '1em'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    menu: {
        width: 200,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class CreateItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        const { classes, createItemPageOpen, currentItem} = this.props;

        return (
            <div>
                <Drawer
                    anchor="right"
                    open= {createItemPageOpen}
                    onRequestClose={this.props.toggleCreateItemPage}
                >
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography type="title" color="inherit" className={classes.flex}>
                                    添加商品
                                </Typography>
                                <Button color="contrast" onClick={this.props.toggleCreateItemPage}>X</Button>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            required
                            label="名称"
                            placeholder="名称"
                            value={currentItem.name}
                            className={classes.textField}
                            margin="normal"
                            fullWidth
                            helperText="请输入产品名称"
                        />

                        <Button raised color="primary" className={classes.button} >
                            创建
                        </Button>
                        <Button raised className={classes.button} >
                            取消
                        </Button>
                    </form>
                </Drawer>
            </div>
        );
    }
}

CreateItemPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
    currentTab: state.root.currentTab,
    createItemPageOpen: state.root.createItemPageOpen,
    currentItem: state.grid.currentItem
});

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCreateItemPage: ()=> {
            dispatch(toggleCreateItemPage())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateItemPage));