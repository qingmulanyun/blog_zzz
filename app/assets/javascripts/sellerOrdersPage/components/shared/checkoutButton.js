import React from 'react';
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";
import {
    Template, TemplatePlaceholder, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Loading } from '../../../utilities/loadingComponent/loading';
import blue from "@material-ui/core/colors/blue";
import { handleSubmitOrders } from '../../redux/actions/gridActions'

const styles = theme => ({
    button: {
        marginLeft: theme.spacing.unit,
    },
    highLight: {
        fontSize: "18px",
        color: blue[700],
        fontWeight: "bold",
        marginLeft: "0.5em"
    },
    title: {
        borderBottom: `2px solid ${blue[200]}`,
        textAlign: "center",
        color: "#6C6C6C",
        fontSize: "12px"
    },
    content: {
        textAlign: "center",
        margin: "1em",
        padding: "0.5em"
    },shopName: {
        padding: "0.5em"
    },shopContainer: {
        borderTop: `1px dotted ${blue[200]}`,
        borderBottom: `1px dotted ${blue[200]}`,
    },shopSummary: {
        marginTop: "0.5em"
    },itemContainer: {
        backgroundColor: blue[50],
        margin: "1px",
        color: "#3c3c3c"
    }
});

class CheckoutButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDialogOpen: false
        };
    }
    handleOpenOrderDialog = () => {
        this.setState({ orderDialogOpen: true });
    };


    handleCloseOrderDialog = () => {
        this.setState({ orderDialogOpen: false });
    };

    handleSubmitOrder = (ids) => {
        this.props.submitOrders(ids);
        this.setState({ orderDialogOpen: false });
    };

    groupBy = (xs, f) => {
        var obj = xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
        var result = $.map(obj, function(value, index) {
            return [value];
        });
        return result
    };

    render (){
        const { orderDialogOpen } = this.state;
        const { classes, selectedIndexes, rows, loading } = this.props;

        var selectedIds =[];
        var totalPrice = 0;
        var selectedItems = []
        selectedIndexes.map(function(index){
            selectedIds.push(rows[index].id);
            selectedItems.push(rows[index]);
            totalPrice += rows[index].total_price
        });

        var ordersList = this.groupBy(selectedItems, (cartItem) => cartItem.shop_id);

        return (
            <Plugin name="AddNewItem">
                <Template name="toolbarContent">
                    <TemplatePlaceholder />
                    <TemplateConnector>
                        {({}) => (
                            <React.Fragment>

                                <div>
                                    <Typography variant="caption">
                                        已选商品 <span className={classes.highLight}> {selectedIds.length} </span> 件
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="caption">
                                        合计（不含运费）<span className={classes.highLight}> ¥ {totalPrice.toFixed(2)} </span>
                                    </Typography>
                                </div>
                                <div>
                                    <Button
                                        variant="raised"
                                        color="primary"
                                        className={classes.button}
                                        disabled={selectedIds.length === 0}
                                        onClick={this.handleOpenOrderDialog}
                                    >
                                        结算
                                    </Button>
                                </div>

                            </React.Fragment>
                        )}
                    </TemplateConnector>
                </Template>

                <Dialog
                    maxWidth="md"
                    fullWidth
                    open={orderDialogOpen}
                    aria-labelledby="order-list"
                >
                    <DialogTitle id="order-list">确认订单信息
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={8}>
                            <Grid item xs={4}>
                                <div className={classes.title}>店铺宝贝</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.title}>单价</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div className={classes.title}>数量</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.title}>运费</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className={classes.title}>小计</div>
                            </Grid>
                        </Grid>

                        {
                            ordersList.map(function(items_per_shop, index){
                                var shopTotalPrice = 0;
                                var shopTotalTransport = 0;
                                return <div>
                                    <Typography variant="caption" gutterBottom align="left" className={classes.shopName}>
                                        {items_per_shop[0].shop_name}
                                    </Typography>
                                    <Grid container spacing={8} key={index} className={classes.shopContainer}>

                                        {
                                            items_per_shop.map(function(item, index){
                                                shopTotalPrice += item.total_price;
                                                shopTotalTransport += item.transport_cost;
                                                return <Grid container spacing={8} key={index} className={classes.itemContainer}>
                                                    <Grid item xs={4}>
                                                        <div className={classes.content}>{item.name}</div>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <div className={classes.content}>¥{item.price}</div>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <div className={classes.content}>{item.quantity}</div>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <div className={classes.content}>¥{item.transport_cost}</div>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <div className={classes.content}>¥{item.total_price + item.transport_cost}</div>
                                                    </Grid>
                                                </Grid>
                                            })
                                        }
                                    </Grid>
                                    <Typography variant="body1" gutterBottom align="right" className={classes.shopSummary}>
                                        店铺合计(含运费)  <span className={classes.highLight}>¥ { (shopTotalPrice + shopTotalTransport).toFixed(2) }</span>
                                    </Typography>
                                </div>
                            })
                        }

                    </DialogContent>
                    { loading && <Loading />}
                    <DialogActions>
                        <Button onClick={this.handleCloseOrderDialog} color="primary">
                            取消
                        </Button>
                        <Button onClick={(e) => this.handleSubmitOrder(selectedIds)} color="primary">
                            提交订单
                        </Button>
                    </DialogActions>
                </Dialog>

            </Plugin>
        );
    }
}


const mapStateToProps = (state) => ({
    selectedIndexes: state.grid.selection,
    rows: state.grid.rows,
    loading: state.root.loading
});

const mapDispatchToProps = (dispatch) => {
    return {
        submitOrders:(ids) => {
            dispatch(handleSubmitOrders(ids))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CheckoutButton));