import React from 'react';
import Sortable from 'react-anything-sortable';

import WorkbenchItem from './WorkbenchItem.jsx';
import ObserveModelMixin from './../ObserveModelMixin';

import Styles from './workbench-list.scss';
import '!!style-loader!css-loader?sourceMap!react-anything-sortable/sortable.css';
import '!!style-loader!css-loader?sourceMap!./sortable.css';

const WorkbenchList = React.createClass({
    mixins: [ObserveModelMixin],

    propTypes: {
        terria: React.PropTypes.object.isRequired,
        viewState: React.PropTypes.object.isRequired
    },

    onSort(sortedArray, currentDraggingSortData, currentDraggingIndex) {
        let draggedItemIndex = this.props.terria.nowViewing.items.indexOf(currentDraggingSortData);
        const addAtIndex = currentDraggingIndex;

        while (draggedItemIndex < addAtIndex) {
            this.props.terria.nowViewing.lower(currentDraggingSortData);
            ++draggedItemIndex;
        }

        while (draggedItemIndex > addAtIndex) {
            this.props.terria.nowViewing.raise(currentDraggingSortData);
            --draggedItemIndex;
        }
    },

    render() {
        return (
            <ul className={Styles.workbenchContent}>
                <Sortable onSort={this.onSort} direction="vertical" dynamic={true}>
                    <For each="item" of={this.props.terria.nowViewing.items}>
                        <WorkbenchItem item={item}
                                       sortData={item}
                                       key={item.uniqueId}
                                       viewState={this.props.viewState}
                        />
                    </For>
                </Sortable>
            </ul>
        );
    }
});

module.exports = WorkbenchList;
