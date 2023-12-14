import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleDelete = (id) => {
    const { deleteButtonClicked } = this.props;
    deleteButtonClicked(id);
  }

  handleEdit = (item) => {
    const { editButtonClicked } = this.props;
    editButtonClicked(item);
  }


  render() {
    const { headers, keys, data, edit_item_id } = this.props;

    if (!data || data.length === 0 || !headers || headers.length === 0) {
      return <p>No data available</p>;
    }

    return (
      <table className='mb-10'>
        <thead>
          <tr>
            {headers.map(column => (
              <th key={column} style={tableHeaderStyle}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {keys.map(column => (
                <td key={column} style={tableCellStyle}>
                    {item[column]}
                </td>
              ))}
              
              {item.Active === 1 && <td className='padding-8'>
                <button onClick={() => this.handleEdit(item)} disabled={edit_item_id > 0 && edit_item_id !== item.Id}>
                  <FontAwesomeIcon icon={faEdit} style={{ color: 'blue' }} />
                </button>
              </td>}

              {item.Active === 1 && <td className='padding-8'>
                <button onClick={() => this.handleDelete(item.Id)}>
                  <FontAwesomeIcon icon={faTrashCan} style={{ color: 'red' }} />
                </button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const tableHeaderStyle = {
    borderBottom: '2px solid #ddd',
    padding: '14px',
    background: '#f2f2f2',
    textAlign: 'left',
};

const tableCellStyle = {
    borderBottom: '1px solid #ddd',
    padding: '14px',
};

export default Table;
