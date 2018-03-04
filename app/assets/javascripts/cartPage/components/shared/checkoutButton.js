import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import {
    Template, TemplatePlaceholder, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { Loading } from '../../../utilities/loadingComponent/loading';
import blue from 'material-ui/colors/blue';

const styles = theme => ({
    button: {
        marginLeft: theme.spacing.unit,
    },
    highLight: {
        fontSize: "18px",
        color: blue[700],
        fontWeight: "bold"
    },
    title: {
        backgroundColor: blue[500],
        color: "#ffffff",
        textAlign: "center"
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
        // this.props.deleteItems(ids);
        this.setState({ orderDialogOpen: false });
    }


    render (){
        const { orderDialogOpen } = this.state;
        const { classes, selectedIndexes, rows, loading } = this.props;

        var selectedIds =[];
        var totalPrice = 0;
        selectedIndexes.map(function(index){
            selectedIds.push(rows[index].id)
            totalPrice += rows[index].total_price
        });
        console.log(rows)
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
                                        合计（不含运费）<span className={classes.highLight}> ¥{totalPrice} </span>
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
                            <Grid item xs={3}>
                                <div className={classes.title}>店铺宝贝</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className={classes.title}>商品属性</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div className={classes.title}>单价</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div className={classes.title}>数量</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.title}>运费</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.title}>小计</div>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CheckoutButton));