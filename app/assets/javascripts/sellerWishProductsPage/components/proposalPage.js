import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { toggleProposalPage } from '../redux/actions/rootActions'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    title: {
        marginBottom: 1,
        fontSize: 16,
    },
    pos: {
        color: theme.palette.text.secondary,
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
    button: {
        margin: theme.spacing.unit,
    },
    image: {
        width: "95%",
        margin: theme.spacing.unit,
        height: "95%"
    }
});

const imageInputProps = {
    accept: "image/*",
};

class ProposalPage extends React.Component{

    handleUploadImage = (e) =>{
        // this.props.handleInputChange('image', e.target.value);
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#wish_product_proposal_image_preview').attr('src', e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);

        files = e.target.files;
    };

    render(){
        const { classes, proposalPageOpen, toggleProposalPage } = this.props;

        return(
                <div>
                    <Drawer
                        anchor="right"
                        open={proposalPageOpen}
                        onClose={(e)=> toggleProposalPage(false)}
                    >
                        <div>
                            <form className={classes.container} autoComplete="off">
                                <TextField
                                    multiline
                                    required
                                    label="名称"
                                    className={classes.textField}
                                    margin="normal"
                                    fullWidth
                                />

                                <TextField
                                    required
                                    label="原价（澳元）"
                                    type="number" step="0.01"

                                    className={classes.textField}
                                    // onChange={(e)=> handleInputChange('original_price', e.target.value)}
                                    margin="normal"
                                    helperText="货源店产品原价"
                                />

                                <TextField
                                    required
                                    label="折后价（澳元）"
                                    type="number" step="0.01"
                                    // value={currentItem.sale_price}
                                    className={classes.textField}
                                    // onChange={(e)=> handleInputChange('sale_price', e.target.value)}
                                    margin="normal"
                                    helperText="货源店进货折扣价"
                                />

                                <TextField
                                    required
                                    label="提成"
                                    type="number" step="0.01"
                                    // value={currentItem.commission}
                                    className={classes.textField}
                                    // onChange={(e)=> handleInputChange('commission', e.target.value)}
                                    margin="normal"
                                    helperText="20，即为20%的利润提成"
                                />

                                <TextField
                                    required
                                    label="售价（澳元）"
                                    type="number"
                                    step="0.01"
                                    // value={currentItem.price}
                                    className={classes.textField}
                                    margin="normal"
                                    // onChange={(e)=> handleInputChange('price', e.target.value)}
                                    // helperText={`建议售价：${price_helper_info}`}
                                />

                                <TextField
                                    required
                                    label="重量"
                                    type="number" step="0.01"
                                    // value={currentItem.weight}
                                    className={classes.textField}
                                    // onChange={(e)=> handleInputChange('weight', e.target.value)}
                                    margin="normal"
                                    helperText="单位： 克"
                                />

                                <TextField
                                    required
                                    label="运费（澳元）"
                                    type="number" step="0.01"
                                    // value={currentItem.transport_cost}
                                    className={classes.textField}
                                    // onChange={(e)=> handleInputChange('transport_cost', e.target.value)}
                                    margin="normal"
                                    // helperText={`5.5澳元/kg ${transport_cost_helper_info}`}
                                />


                                <TextField
                                    multiline
                                    required
                                    label="简介"
                                    // value={currentItem.description}
                                    className={classes.textField}
                                    margin="normal"
                                    // onChange={(e)=> handleInputChange('description', e.target.value)}
                                    fullWidth
                                    helperText="产品功能，适用人群"
                                />

                                <TextField
                                    required
                                    label="图片"
                                    type="file"
                                    // value={currentItem.image}
                                    className={classes.textField}
                                    onChange={(e)=> this.handleUploadImage(e)}
                                    margin="normal"
                                    fullWidth
                                    helperText="请上传图片"
                                    inputProps={imageInputProps}
                                />
                                <img className={classes.image} id="wish_product_proposal_image_preview" src="/assets/default-img.gif" alt="产品图片预览" />
                                <Button variant="raised" color="primary" className={classes.button} >
                                    添加
                                </Button>
                                <Button variant="raised" className={classes.button} onClick={(e)=> toggleProposalPage(false)}>
                                    取消
                                </Button>
                            </form>
                        </div>
                    </Drawer>
                </div>

        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.root.loading,
    proposalPageOpen: state.root.proposalPageOpen
});

const mapDispatchToProps = (dispatch) => {
    return {
        toggleProposalPage: (boolean) => {
            dispatch(toggleProposalPage(boolean))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProposalPage));