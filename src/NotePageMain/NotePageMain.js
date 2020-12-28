import React from "react";
import Note from "../Note/Note";
import "./NotePageMain.css";
import { findNote } from "../notes-helpers";
import NotesContext from "../NotesContext";
import PropTypes from "prop-types";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

export default class NotePageMain extends React.Component {
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
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: "" };
    return (
      <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <ErrorBoundary>
          <div className="NotePageMain__content">
            {note.content.split(/\n \r|\n/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </ErrorBoundary>
      </section>
    );
  }
}

NotePageMain.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};
