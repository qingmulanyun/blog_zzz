import React from 'react';
import { connect } from 'react-redux'

import {
    Template, TemplatePlaceholder, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import { deleteItems } from '../../redux/actions/gridActions'
import { Loading } from '../../../utilities/loadingComponent/loading';

class DeleteItemsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteWarningDialogOpen: false
        };
    }
    handleOpenDeleteWarningDialog = () => {
        this.setState({ deleteWarningDialogOpen: true });
    };


    handleCloseDeleteWarningDialog = () => {
        this.setState({ deleteWarningDialogOpen: false });
    };

    handleDeleteItems = (ids) => {
        this.props.deleteItems(ids);
        this.setState({ deleteWarningDialogOpen: false });
    }

    render (){
        const { deleteWarningDialogOpen } = this.state;
        const { selectedIndexes, rows, loading } = this.props;

        var selectedIds =[];
        selectedIndexes.map(function(index){
            selectedIds.push(rows[index].id)
        });

        return (
            <Plugin name="AddNewItem">
                <Template name="toolbarContent">
                    <TemplatePlaceholder />
                    <TemplateConnector>
                        {({}) => (
                            <React.Fragment>
                                <Tooltip title='删除商品' placement='bottom' enterDelay={200}>
                                    <IconButton onClick={this.handleOpenDeleteWarningDialog}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                            </React.Fragment>
                        )}
                    </TemplateConnector>
                </Template>

                <Dialog
                    fullWidth
                    open={deleteWarningDialogOpen}
                    aria-labelledby="delete-items-warning"
                >
                    <DialogTitle id="delete-items-warning">删除商品
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            确定要删除选中的 {selectedIds.length} 项商品？
                        </DialogContentText>
                    </DialogContent>
                    { loading && <Loading />}
                    <DialogActions>
                        <Button onClick={this.handleCloseDeleteWarningDialog} color="primary">
                            取消
                        </Button>
                        <Button onClick={(e) => this.handleDeleteItems(selectedIds)} color="primary">
                            确定
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
        deleteItems: (ids)=> {
            dispatch(deleteItems(ids))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItemsButton);