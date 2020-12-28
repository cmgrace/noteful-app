import React, { Component } from "react";
import NotesContext from "../NotesContext";
import "./addFolder.css";
import PropTypes from "prop-types";
import config from "../config";

class addFolder extends Component {
  static contextType = NotesContext;

  state = {
    folderName: "",
    error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const folder = { name: this.state.folderName };
    this.setState({ error: null });

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      body: JSON.stringify(folder),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((error) => {
            throw error;
          });
        return res.json();
      })
      .then((data) => {
        this.context.addFolder(data);
        this.props.history.push(`/`);
      })
      .catch((error) => {
        this.setState({ error });
        console.error({ error });
      });
  };
  updateFolderName = (newFolderName) => {
    this.setState({ folderName: newFolderName });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { error } = this.state;
    return (
      <React.Fragment>
        <h4>Add a new folder to your note</h4>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="AddFolder_error" role="alert">
              {error && <p>{error.message}</p>}
            </div>
            <div>
              <label htmlFor="name">Folder name: </label>
              <input
                type="text"
                name="name"
                id="name"
                value={this.state.folderName}
                onChange={(e) => this.updateFolderName(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="button" onClick={this.handleClickCancel}>
                Cancel
              </button>{" "}
              <button
                type="submit"
                disabled={this.state.folderName.length === 0}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

addFolder.propTypes = {
  history: PropTypes.object,
};

export default addFolder;
