import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment'
moment.locale('ZH_CN');

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

import { createGridAction, fetchOwnItems } from '../redux/actions/gridActions';

import AddNewItem from './shared/AddNewItemButton'
import DeleteItemsButton from './shared/DeleteItemsButton'
import { FormatDateCell } from '../../utilities/tableCellComponent/formatDateCell'
import { FormatStatusCell } from '../../utilities/tableCellComponent/formatStatusCell'

const Cell = (props) => {
    if (props.column.name === 'updatedAt' || props.column.name === 'createdAt' ) {
        return <FormatDateCell {...props} />;
    }
    if (props.column.name === 'status' ) {
        return <FormatStatusCell {...props} />;
    }
    return <Table.Cell {...props} />;
};

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

                <Table
                    cellComponent={Cell}
                />

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
                <DeleteItemsButton />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerItemsBoard);