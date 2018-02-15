import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  { TableCell } from 'material-ui/Table';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import EmailIcon from 'material-ui-icons/Email';
import SmsIcon from 'material-ui-icons/Sms';
import LetterIcon from 'material-ui-icons/InsertDriveFile';
import CallIcon from 'material-ui-icons/Call'
import moment from 'moment'

import {
    SortingState, SelectionState, FilteringState, PagingState, GroupingState, RowDetailState,
    IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow, TableRowDetail, ColumnChooser, TableColumnVisibility,
    GroupingPanel, PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';

import { Loading } from '../../utilities/loadingComponent/loading';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Fade from 'material-ui/transitions/Fade';
import { createGridAction, fetchOwnItems } from '../redux/actions/gridActions';
import Button from 'material-ui/Button';
import AddNewItem from './shared/AddNewItemButton'


class SellerItemsBoard extends React.Component {

    componentDidMount() {
        this.props.fetchOwnItems();
    }

    render (){
        const {rows,
            columns,
            sorting,
            onSortingChange,
            selection,
            onSelectionChange,
            expandedRows,
            onExpandedRowsChange,
            grouping,
            onGroupingChange,
            expandedGroups,
            onExpandedGroupsChange,
            filters,
            onFiltersChange,
            currentPage,
            onCurrentPageChange,
            pageSize,
            onPageSizeChange,
            allowedPageSizes,
            columnOrder,
            onColumnOrderChange,
            columnWidths,
            onColumnWidthsChange,
            loading,
            snackBar,
            openCreateNewItemPage,
            editTemplate,
            closeSnackBar
            } = this.props;

        return(
        <div>
            <Grid
                rows={rows}
                columns={columns}
            >
                <FilteringState
                    filters={filters}
                    onFiltersChange={onFiltersChange}
                />
                <SortingState
                    sorting={sorting}
                    onSortingChange={onSortingChange}
                />
                <GroupingState
                    grouping={grouping}
                    onGroupingChange={onGroupingChange}
                    expandedGroups={expandedGroups}
                    onExpandedGroupsChange={onExpandedGroupsChange}
                />
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={onCurrentPageChange}
                    pageSize={pageSize}
                    onPageSizeChange={onPageSizeChange}
                />
                <RowDetailState
                    expandedRows={expandedRows}
                    onExpandedRowsChange={onExpandedRowsChange}
                />
                <SelectionState
                    selection={selection}
                    onSelectionChange={onSelectionChange}
                />

                <IntegratedFiltering />
                <IntegratedSorting />

                <IntegratedPaging />
                <IntegratedSelection />

                <DragDropProvider />

                <Table />

                <TableColumnReordering
                    order={columnOrder}
                    onOrderChange={onColumnOrderChange}
                />

                <TableColumnResizing
                    columnWidths={columnWidths}
                    onColumnWidthsChange={onColumnWidthsChange}
                />

                <TableHeaderRow showSortingControls />

                <TableSelection showSelectAll />
                <TableColumnVisibility
                />
                <Toolbar />
                <ColumnChooser />
                <AddNewItem />
                <PagingPanel
                    pageSizes={allowedPageSizes}
                />
            </Grid>
            {loading && <Loading />}
        </div>
        );
    }
}

SellerItemsBoard.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    // detailColumns: PropTypes.array.isRequired,
    sorting: PropTypes.array.isRequired,
    onSortingChange: PropTypes.func.isRequired,
    selection: PropTypes.array.isRequired,
    onSelectionChange: PropTypes.func.isRequired,
    expandedRows: PropTypes.array.isRequired,
    onExpandedRowsChange: PropTypes.func.isRequired,
    grouping: PropTypes.array.isRequired,
    onGroupingChange: PropTypes.func.isRequired,
    expandedGroups: PropTypes.array.isRequired,
    onExpandedGroupsChange: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    onCurrentPageChange: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    columnOrder: PropTypes.array.isRequired,
    onColumnOrderChange: PropTypes.func.isRequired,
    columnWidths: PropTypes.array.isRequired,
    onColumnWidthsChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.grid;

const mapDispatchToProps = dispatch => ({
    onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
    onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
    onExpandedRowsChange: expandedRows => dispatch(createGridAction('expandedRows', expandedRows)),
    onGroupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
    onExpandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
    onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
    onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
    onPageSizeChange: pageSize => dispatch(createGridAction('pageSize', pageSize)),
    onColumnOrderChange: order => dispatch(createGridAction('columnOrder', order)),
    onColumnWidthsChange: widths => dispatch(createGridAction('columnWidths', widths)),
    fetchOwnItems: () => dispatch(fetchOwnItems()),
    openCreateNewItemPage: () => {console.log('test')}
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerItemsBoard);