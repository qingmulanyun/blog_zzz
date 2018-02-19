import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux'
import { toggleCreateItemPage } from '../../redux/actions/rootActions'
import { handleInputChange, submitNewItemForm } from '../../redux/actions/gridActions'

var files;

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

    handleUploadImage = (e) =>{
        this.props.handleInputChange('image', e.target.value);
        files = e.target.files;
    };

    handleSubmitNewItemForm = (e) =>{
        var data = new FormData();
        if( undefined !== files){
            data.append('image', files[0]);
        }
        const currentItem = this.props.currentItem;
        data.append('name', currentItem.name);
        data.append('original_price', currentItem.original_price);
        data.append('sale_price', currentItem.sale_price);
        data.append('transport_cost', currentItem.transport_cost);
        data.append('commission', currentItem.commission);
        data.append('weight', currentItem.weight);
        data.append('price', currentItem.price);
        data.append('description', currentItem.description);
        this.props.submitNewItemForm(data);
    };

    render() {
        const { classes, createItemPageOpen, currentItem, handleInputChange} = this.props;

        var transport_cost_helper_info = '';
        var price_helper_info = '';

        if(currentItem.weight.length > 0){
            const transport_cost_tip = Math.ceil((currentItem.weight * 5.5 / 1000) + 3)
            transport_cost_helper_info = `建议运费：${transport_cost_tip} 澳元`
        }

        if(currentItem.sale_price.length > 0 && currentItem.commission.length > 0 ){
            const price_tip = Math.ceil((currentItem.sale_price * (1 + currentItem.commission/100)))
            price_helper_info = `建议售价：${price_tip} 澳元`
        }

        return (
            <div>
                <Drawer
                    anchor="right"
                    open= {createItemPageOpen}
                    onClose={this.props.toggleCreateItemPage}
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
                            multiline
                            required
                            label="名称"
                            value={currentItem.name}
                            className={classes.textField}
                            margin="normal"
                            fullWidth
                            onChange={(e)=> handleInputChange('name', e.target.value)}
                        />

                        <TextField
                            required
                            label="原价（澳元）"
                            type="number" step="0.01"
                            value={currentItem.original_price}
                            className={classes.textField}
                            onChange={(e)=> handleInputChange('original_price', e.target.value)}
                            margin="normal"
                            helperText="货源店产品原价"
                        />

                        <TextField
                            required
                            label="折后价（澳元）"
                            type="number" step="0.01"
                            value={currentItem.sale_price}
                            className={classes.textField}
                            onChange={(e)=> handleInputChange('sale_price', e.target.value)}
                            margin="normal"
                            helperText="货源店进货折扣价"
                        />

                        <TextField
                            required
                            label="提成"
                            type="number" step="0.01"
                            value={currentItem.commission}
                            className={classes.textField}
                            onChange={(e)=> handleInputChange('commission', e.target.value)}
                            margin="normal"
                            helperText="20，即为20%的利润提成"
                        />

                        <TextField
                            required
                            label="售价（澳元）"
                            type="number"
                            step="0.01"
                            value={currentItem.price}
                            className={classes.textField}
                            margin="normal"
                            onChange={(e)=> handleInputChange('price', e.target.value)}
                            helperText={`建议售价：${price_helper_info}`}
                        />

                        <TextField
                            required
                            label="重量"
                            type="number" step="0.01"
                            value={currentItem.weight}
                            className={classes.textField}
                            onChange={(e)=> handleInputChange('weight', e.target.value)}
                            margin="normal"
                            helperText="单位： 克"
                        />

                        <TextField
                            required
                            label="运费（澳元）"
                            type="number" step="0.01"
                            value={currentItem.transport_cost}
                            className={classes.textField}
                            onChange={(e)=> handleInputChange('transport_cost', e.target.value)}
                            margin="normal"
                            helperText={`5.5澳元/kg ${transport_cost_helper_info}`}
                        />


                        <TextField
                            multiline
                            required
                            label="简介"
                            value={currentItem.description}
                            className={classes.textField}
                            margin="normal"
                            onChange={(e)=> handleInputChange('description', e.target.value)}
                            fullWidth
                            helperText="产品功能，适用人群"
                        />

                        <TextField
                            required
                            label="图片"
                            type="file"
                            value={currentItem.image}
                            className={classes.textField}
                            onChange={(e)=> this.handleUploadImage(e)}
                            margin="normal"
                            fullWidth
                            helperText="请上传图片"
                        />

                        <Button variant="raised" color="primary" className={classes.button} onClick={(e)=>this.handleSubmitNewItemForm(e)}>
                            添加
                        </Button>
                        <Button variant="raised" className={classes.button} onClick={this.props.toggleCreateItemPage}>
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
        },
        handleInputChange: (name, value)=> {
            dispatch(handleInputChange(name, value))
        },
        submitNewItemForm: (data)=> {
            dispatch(submitNewItemForm(data))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateItemPage));