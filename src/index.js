import React from "react";
import ReactDOM from "react-dom";

import { headers, data } from "./data.js";

import "./styles.css";

class Excel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: headers,
      data: data,
      sortby: null,
      desc: true,
      edit: null
    };
    this._sort = this._sort.bind(this);
    this._showEditor = this._showEditor.bind(this);
    this._save = this._save.bind(this);
  }
  _save(e) {
    e.preventDefault();
    const input = e.target.firstChild;
    let data = Array.from(this.state.data);
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({ data, edit: null });
  }
  _showEditor(e) {
    const edit = {
      row: parseInt(e.target.dataset.row, 10),
      cell: e.target.cellIndex
    };
    this.setState({ edit: edit });
  }
  _sort(e) {
    const column = e.target.cellIndex;
    const desc = this.state.sortby === column && !this.state.desc;
    let dataNew = Array.from(this.state.data);
    dataNew.sort((a, b) => {
      return desc
        ? a[column] > b[column]
          ? 1
          : -1
        : a[column] < b[column]
          ? 1
          : -1;
    });
    this.setState({
      data: dataNew,
      sortby: column,
      desc: desc
    });
  }
  render() {
    const { _sort, _showEditor, _save } = this;
    const { headers, data, sortby, desc, edit } = this.state;
    return (
      <table>
        <thead onClick={_sort}>
          <tr>
            {headers.map((title, idx) => {
              if (sortby === idx) {
                title += desc ? "\u2191" : "\u2193";
              }
              return <th key={idx}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody onDoubleClick={_showEditor}>
          {data.map((row, rowid) => (
            <tr key={rowid}>
              {row.map((cell, id) => {
                if (edit && edit.row === rowid && edit.cell === id) {
                  return (
                    <form onSubmit={_save}>
                      <input type="text" defaultValue={cell} />
                    </form>
                  );
                }
                return (
                  <td key={id} data-row={rowid}>
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

class App extends React.Component {
  render() {
    return <Excel />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
