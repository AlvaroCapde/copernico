<script lang="js">
    import {cloneDeep, get, set, uniq, remove, filter, sortBy} from 'lodash-es';
    import Paginator, {resetPaginator} from './Paginator.svelte';
    import Search from './Search.svelte';
    import Fuse from 'fuse.js';
    import {createEventDispatcher} from 'svelte';
    import HtMenu from '$lib/HtMenu/HtMenu.svelte';
    import MenuOption from '$lib/HtMenu/MenuOption.svelte';
    import {v4 as uuidv4} from 'uuid';

    const defaultMinWidth = 50;
    const defaultMaxWidth = 200;

    const dispatch = createEventDispatcher();

    export let fetchServerRows;
    export let headerOptions = {
        sticky: false,
        heightClass: 'h-[75vh]'
    };
    export let fetchServerColumnFilterOptions;
    export let columns = [];
    export let rows = [];
    export let paginated = true;
    export let itemsPerPages = [50, 100, 150];
    export let searchable = true;
    export let fuseConfig = {
        threshold: 0.2
    };
    export let onRowClick = undefined;
    export let orderPath = 'order';

    let clonedRows = [];
    let initialized = false;
    let totalRows;
    let loaderFilterVisible = false;
    let paginator = {
        startIndex: 0,
        endIndex: null,
        pageSize: itemsPerPages[0],
        itemsPerPages
    };
    let processedRows = {
        filtered: [],
        paginated: []
    };
    let fuse;
    let stickyColumnWidth;
    let stickyColumnMaxWidth;
    let hasStickyColumn;
    let searchKey = '';
    let sortColumn;
    let backEndSortOrder;

    let columnFilterArray = {};
    let columnsWithFilterApplied = {};

    const flipDurationMs = 300;

    function addIdToRows() {
        clonedRows = clonedRows.map((row) => ({
            ...row,
            id: row?.id || row?.data?.id || row?.ref?.id || uuidv4()
        }));
    }

    function initStates() {
        initColumnProperties(columns);
        initPaginator();
        addIdToRows();
        applyTransformAndSetIdsToAllRows(clonedRows);
        initPreprocessRows(clonedRows);
        initFuseSearch();
        updatePaginatedRows(paginator);
        initStickyStates(columns);
    }

    function initFuseSearch() {
        const finalConfig = cloneDeep(fuseConfig);
        if (searchable) {
            if (!finalConfig.keys) {
                let nonSearchableFields = columns
                    .filter((column) => {
                        return !!column.searchable;
                    })
                    .map((column) => column.field);
                let searchableFields = columns
                    .map((column) => column.field)
                    .filter((field) => field && !nonSearchableFields.includes(field));
                finalConfig.keys = searchableFields;
            }
        }
        fuse = new Fuse(clonedRows, finalConfig);
    }

    function initPaginator() {
        paginator.startIndex = 0;
        paginator.endIndex = paginated ? paginator.pageSize : clonedRows.length;
    }

    function initPreprocessRows(_clonedRows) {
        processedRows.filtered = searchable ? [..._clonedRows] : _clonedRows;
    }

    function applyTransformAndSetIdsToAllRows(_clonedRows) {
        let transformColumn = [];
        columns.forEach(function (column) {
            if (typeof column.transform !== 'undefined' && !!column.field) {
                transformColumn.push(column);
            }
        });
        const tempRows = _clonedRows.map(function (row) {
            let tempRow = row;
            transformColumn.forEach((column) => {
                tempRow = applyTransform(tempRow, column.field, column.transform);
            });
            return tempRow;
        });
        clonedRows = tempRows;
    }

    function initColumnProperties(columns) {
        columns.forEach((col) => {
            col['_dTProperties'] = {};
        });
    }

    function initStickyStates(columns) {
        const stickyColumn = columns.find((c) => c.sticky);
        if (!stickyColumn) {
            hasStickyColumn = false;
        } else {
            hasStickyColumn = true;
            stickyColumnWidth = stickyColumn.minWidth ? stickyColumn.minWidth : defaultMinWidth;
            stickyColumnMaxWidth = stickyColumn.maxWidth ? stickyColumn.maxWidth : defaultMaxWidth;
        }
    }

    function setThTdStickiness(column, isHeader) {
        if (column.sticky || isHeader) {
            return `
              background: ${isHeader ? '#193e52' : 'inherit'};
              text-align: center;
        	    border-left: solid 1px #DDEFEF;
              border-right: solid 1px #DDEFEF;
              left: 0;
              top: ${isHeader ? '0' : '4'};
              z-index: ${isHeader && column.sticky ? 22 : isHeader ? 20 : column.sticky ? 21 : 0};
              position: sticky;
              width: ${stickyColumnWidth}px;
              max-width: ${stickyColumnMaxWidth}px;
              height: max-content;
            `;
        }
        return '';
    }

    function setMinWidth(column) {
        return 'min-width:' + (column.minWidth || defaultMinWidth) + 'px;';
    }

    function resetSorts(excludeIndex) {
        columns.forEach((col, index) => {
            if (excludeIndex !== index && col._dTProperties?.currentSort) {
                col._dTProperties.currentSort = null;
            }
        });
    }

    function setSortIcon(column) {
        if (!column.sortable) return;
        column._dTProperties.currentSort = column._dTProperties.currentSort === 'asc' ? 'desc' : 'asc';
        backEndSortOrder = backEndSortOrder === 'asc' ? 'desc' : 'asc';
    }

    async function sortByColumn(columnIndex, column) {
        const currentSort = column._dTProperties.currentSort;
        const field = column.field;
        if (column.sortFnc) {
            processedRows.filtered = processedRows.filtered.sort((a, b) =>
                column.sortFnc(a, b, currentSort)
            );
        } else {
            if (column.type === 'number' || column.type === 'date') {
                processedRows.filtered = processedRows.filtered.sort((a, b) =>
                    sortNumeric(a, b, currentSort, field)
                );
            } else {
                processedRows.filtered = processedRows.filtered.sort((a, b) =>
                    compareStr(a, b, currentSort, field)
                );
            }
        }
    }

    function compareStr(a, b, type, field) {
        if (type === 'asc') {
            return ('' + get(b, field)).localeCompare(get(a, field));
        } else {
            return ('' + get(a, field)).localeCompare(get(b, field));
        }
    }

    function sortNumeric(a, b, type, field) {
        const firstValue = get(a, field);
        const secondValue = get(b, field);
        if (type === 'asc') {
            if (!firstValue) return 1;
            if (!secondValue) return -1;

            return secondValue - firstValue;
        } else {
            if (!secondValue) return 1;
            if (!firstValue) return -1;

            return firstValue - secondValue;
        }
    }

    function onHeaderClick(columnIndex, column) {
        dispatch('headerClick', {
            columnIndex,
            column
        });
        if (column.sortable) {
            setSortIcon(column);
            resetSorts(columnIndex);
            sortByColumn(columnIndex, column);
        }
        columns = columns;
    }

    let pos = {};
    let showMenu = {};
    let filterOptions = {};

    function onFilterClick(e, column) {
        if (!filterOptions[column.field]) filterOptions[column.field] = [];
        dispatch('filterClick', {
            column
        });
        clonedRows.forEach(function (row) {
            filterOptions[column.field].push(
                get(row, column.field, column?.defaultValue ? column.defaultValue : null)
            );
        });
        filterOptions[column.field] = uniq(filterOptions[column.field]);

        showMenu[column.field] = true;
        columns = columns;
    }

    async function paginatorChange(event) {
        const data = event.detail;
        paginator.pageSize = data.pageSize;
        paginator.startIndex = data.currentPageIndex * data.pageSize;
        paginator.endIndex = (data.currentPageIndex + 1) * data.pageSize;
    }

    function updatePaginatedRows(paginator) {
        if (paginated) {
            processedRows.paginated = processedRows.filtered.slice(
                paginator.startIndex,
                paginator.endIndex
            );
        } else {
            processedRows.paginated = [...processedRows.filtered];
        }
    }

    async function search() {
        if (searchKey === '' || !searchKey) {
            processedRows.filtered = [...clonedRows];
        } else {
            processedRows.filtered = fuse.search(searchKey);
        }
        if (paginated && typeof resetPaginator === 'function') resetPaginator();
        resetSorts();
        columns = columns;
    }

    function applyTransform(row, field, transform) {
        if (typeof transform !== 'undefined' && !!field) {
            let tempRow = row;
            let val;

            if (typeof transform === 'function') {
                val = get(tempRow, field);
                if (val != null) set(tempRow, field, transform(val));
            } else if (typeof transform === 'object' && !Array.isArray(transform)) {
                const target = transform.sourceField || field;
                val = get(tempRow, target);

                if (val != null) {
                    const path = transform.destinationField || field;
                    set(tempRow, path, transform.fnc(val));
                }
            } else {
                throw new Error('transform is configured incorrectly, please read the documentation');
            }
            return tempRow;
        }
        return row;
    }

    function closeMenu(column) {
        showMenu[column.field] = false;
    }

    async function applyColumnFilter(e, column) {
        if (!columnFilterArray[column.field]) columnFilterArray[column.field] = [];
        columnsWithFilterApplied[column.field] = column;

        if (e.target.checked) {
            columnFilterArray[column.field].push(e.target.value);
        } else {
            remove(columnFilterArray[column.field], function (c) {
                return c === e.target.value;
            });
        }
        columnFilterArray[column.field] = uniq(columnFilterArray[column.field]);
    }

    async function clearColumnFilter(columnField) {
        columnFilterArray[columnField] = [];
    }

    function handleRowsChange(_rows) {
        if (_rows) {
            clonedRows = cloneDeep(_rows);
        }
    }

    function handleClonedRowsChange(_clonedRows) {
        if (_clonedRows) {
            initStates();
        }
    }

    function getCellColor(row, column) {
        if (column.range && column.field) {
            const val = get(row, column.field, column?.defaultValue ? column.defaultValue : null);
            if (val === null) return '';
            else {
                if (!isNaN(parseFloat(val))) {
                    return val < column.range.low || val > column.range.high
                        ? 'bg-red-200'
                        : 'bg-primary-light';
                }
            }
        }
        return '';
    }

    $: {
        // can be improve feel free to try
        columns.forEach((c) => (c.sortable = true));
    }

    $: {
        handleRowsChange(rows);
    }

    $: {
        handleClonedRowsChange(clonedRows);
    }

    $: {
        if (processedRows.filtered) {
            // do not refresh on drag and drop
            updatePaginatedRows(paginator);
        }
    }

    $: {
        if (columnFilterArray && !fetchServerRows) {
            let noFiltersToApply = true;
            let results = clonedRows;
            Object.keys(columnFilterArray).forEach(function (columnName) {
                let column = columnsWithFilterApplied[columnName];
                if (columnFilterArray[column.field].length > 0) {
                    noFiltersToApply = false;
                    results = filter(results, function (row) {
                        let fieldValue = get(
                            row,
                            column.field,
                            column?.defaultValue ? column.defaultValue : null
                        );
                        return columnFilterArray[column.field].indexOf(fieldValue) > -1;
                    });
                }
            });

            if (!noFiltersToApply) {
                processedRows.filtered = results;
            }
        }
    }
</script>

<div class="w-full">
    {#if searchable}
        <div class="h-12">
            <div>
                <Search on:search={search} bind:searchKey/>
            </div>
        </div>
    {/if}

    <div class="inline-block min-w-full py-2 align-middle">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table
                    class="min-w-full divide-y divide-gray-300"
            >
                <thead class="bg-gray-50">
                <tr>
                    {#each columns as column, columnIndex}
                        <th
                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                            <div
                                    class="{column.filter ? 'w-10/12' : ''} inline-block"
                                    on:click={() => onHeaderClick(columnIndex, column)}
                            >
                                {#if column.headerComponent}
                                    <div class="inline-block">
                                        <svelte:component
                                                this={column.headerComponent}
                                                {column}
                                                {columnIndex}
                                                on:headerCustomHandler
                                        />
                                    </div>
                                {:else}
                                    {column.label}
                                {/if}

                                {#if get(column, '_dTProperties.currentSort') === 'asc'}
                                    &ShortUpArrow;
                                {/if}
                                {#if get(column, '_dTProperties.currentSort') === 'desc'}
                                    &ShortDownArrow;
                                {/if}
                            </div>
                            {#if column.filter}
                                <div class="w-1/12 inline-block" on:click={(e) => onFilterClick(e, column)}>
                    <span
                            class="material-icons show-filter {columnFilterArray[column.field]?.length > 0
                        ? 'text-blue-700'
                        : ''} ">filter_alt</span
                    >
                                </div>
                                {#if showMenu && showMenu[column.field]}
                                    <HtMenu
                                            {...pos[column.field]}
                                            on:click={() => closeMenu(column)}
                                            on:clickoutside={() => closeMenu(column)}
                                    >
                                        {#if loaderFilterVisible}
                                            <MenuOption>Loading...</MenuOption>
                                        {:else if filterOptions[column.field]}
                                            <a
                                                    class="button-icon mb-sm"
                                                    on:click={() => {
                            clearColumnFilter(column.field);
                          }}>Clear All</a
                                            >
                                            {#each filterOptions[column.field] as filterText}
                                                <MenuOption>
                                                    <input
                                                            checked={!!(
                                columnFilterArray[column.field] &&
                                columnFilterArray[column.field].indexOf(filterText) > -1
                              )}
                                                            on:click={(e) => applyColumnFilter(e, column)}
                                                            type="checkbox"
                                                            value={filterText}
                                                    />
                                                    {filterText}
                                                </MenuOption>
                                            {/each}
                                        {/if}
                                    </HtMenu>
                                {/if}
                            {/if}
                        </th>
                    {/each}
                </tr>
                </thead>
                <tbody
                        class="divide-y divide-gray-200 bg-white"
                >
                {#each processedRows.paginated as row, rowIndex (row.id)}
                    <tr
                            on:click={() => onRowClick && onRowClick(row)}
                            class=""
                    >
                        {#each columns as column, columnIndex}
                            <td
                                    class="{column.class} whitespace-nowrap px-3 py-4 text-sm text-gray-500
                         text-{column.align || 'left'}
                         {getCellColor(row, column)}"
                                    style="{setMinWidth(column)}{setThTdStickiness(column)}"
                                    on:click={() => column.onClick && column.onClick(row, column)}
                            >
                                {#if column.component}
                                    <svelte:component
                                            this={column.component}
                                            on:customEvent
                                            {rows}
                                            {row}
                                            {column}
                                            {rowIndex}
                                            {columnIndex}
                                    />
                                {:else}
                                    {@html get(
                                        row,
                                        column.field,
                                        column?.defaultValue ? column.defaultValue : null
                                    )}
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>
    {#if paginated}
        <Paginator
                on:paginatorChange={paginatorChange}
                {itemsPerPages}
                totalItems={fetchServerRows ? totalRows : processedRows.filtered.length}
        />
    {/if}
</div>
