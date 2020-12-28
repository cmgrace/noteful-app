import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import "./NoteListMain.css";
import { getNotesForFolder } from "../notes-helpers";
import NotesContext from "../NotesContext";
import PropTypes from "prop-types";

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = NotesContext;

  handleDeleteNote = (noteId) => {
    this.props.history.push(`/`);
  };

  render() {
    const { notes = [] } = this.context;
    const { folderId } = this.props.match.params;
    const notesForFolder = getNotesForFolder(notes, folderId);
    //console.log(notesForFolder);
    return (
      <section className="NoteListMain">
        <ul>
          {notesForFolder.map((note) => (
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                onDeleteNote={this.handleDeleteNote}
              />
            </li>
          ))}
        </ul>
        <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    );
  }
}

NoteListMain.defaultProps = {
  notes: [],
};

NoteListMain.prototype = {
  match: PropTypes.object.isRequired,
};
