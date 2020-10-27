import React, { Component } from 'react';

import './index.module.css';

interface DataTableItem {
  [key: string]: any;
}

export interface DataTableMetaData<T> {
  value: string;
  text: string;
}

export interface DataTableProps<T> {
  items: T[];
  metaData: DataTableMetaData<T>[];
  selectedItem?: T | null;
  onRowClick?: (item: T) => void;
}

export default class DataTable<T extends DataTableItem> extends Component<DataTableProps<T>> {

  render() {
    return (
      <div className="list">
        <table>
          <thead className="list-header">
            {this.renderHeaders()}
          </thead>
          {this.renderTBody()}
        </table>
      </div>
    );
  }

  private renderTBody() {
    const { items } = this.props;
    const rows = items.map((item) => {
      return this.renderRow(item);
    });

    return (
      <tbody className="items-container">{rows}</tbody>
    );
  }

  private renderRow(item: T) {
    const { metaData, selectedItem } = this.props;
    const rowClasses = ['list-item'];
    if (selectedItem === item) {
      rowClasses.push('highlighted');
    }
    const cells = metaData.map((meta) => {
      return (
        <td key={meta.value as string}>
          {item[meta.value]}
        </td>
      );
    });

    return (
      <tr key={item.id}
        onClick={this.onTableRowClickHandler.bind(this, item)}
        className={rowClasses.join(' ')}>
        {cells}
      </tr>
    );
  }

  renderHeaders() {
    const { metaData } = this.props;
    const headerCells = metaData.map((meta) => {
      return (
        <td key={meta.value as string}>
          <a href="#null">{meta.text}</a>
        </td>
      );
    });
    return (
      <tr>{headerCells}</tr>
    );
  }

  private onTableRowClickHandler(item: T) {
    const { onRowClick } = this.props;
    if (onRowClick) {
      onRowClick(item);
    }
  }
}
