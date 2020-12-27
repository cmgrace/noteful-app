import React, { Component } from "react";
import NotesContext from "../NotesContext";
import "./addNote.css";
import PropTypes from "prop-types";
import config from "../config";

class addNote extends Component {
  static contextType = NotesContext;

  state = {
    noteName: "",
    noteContent: "",
    folderId: "",
    error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      name: this.state.noteName,
      content: this.state.noteContent,
      folderId: e.target["note-folder-id"].value,
      modified: new Date(),
    };

    this.setState({ error: null });

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      body: JSON.stringify(note),
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
        this.props.history.push(`/folder/${data.folderId}`);
        this.context.addNote(note);
      })
      .catch((error) => {
        this.setState({ error });
        console.error({ error });
      });
  };
  updateFolderId = (newForlderId) => {
    this.setState({ folderId: newForlderId });
  };

  updateNoteName = (newNoteName) => {
    this.setState({
      noteName: newNoteName,
    });
  };

  updateNoteContent = (newContent) => {
    this.setState({
      noteContent: newContent,
    });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { error } = this.state;
    const { folders = [] } = this.context;
    return (
      <React.Fragment>
        <h4>Add a new note</h4>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="AddNote_error" role="alert">
              {error && <p>{error.message}</p>}
            </div>
            <div>
              <label htmlFor="note_name">Name: </label>
              <input
                type="text"
                name="note_name"
                id="note_name"
                value={this.state.noteName}
                onChange={(e) => this.updateNoteName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="note_content">Content: </label>
              <textarea
                type="text"
                name="note_content"
                id="note_content"
                value={this.state.noteContent}
                onChange={(e) => this.updateNoteContent(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="folder_name_select">Folder: </label>
              <select
                id="folder_name_select"
                name="note-folder-id"
                onChange={(e) => this.updateFolderId(e.target.value)}
              >
                <option value={null}>select a folder</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button type="button" onClick={this.handleClickCancel}>
                Cancel
              </button>{" "}
              <button
                type="submit"
                disabled={
                  this.state.noteName.length === 0 ||
                  this.state.noteContent.length === 0 ||
                  this.state.folderId.length === 0
                }
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

addNote.propTypes = {
  history: PropTypes.object,
};

export default addNote;
