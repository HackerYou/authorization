import React from 'react';
import CreateNote from './CreateNote'
import Note from './Note';

class ShowNotes extends React.Component {
    constructor() {
        super();
        this.state = {
            notes: [],
        };
        this.refresh = this.refresh.bind(this);
    }
    componentWillMount() {
        this.refresh();
    }

    refresh() {
        // 1. Fetch all the exist user notes by a user's ID
        fetch(`/api/notes/${this.props.user._id}`)
        .then((res) => res.json())
        .then((notes) => {
            // 2. Store them in the state
            this.setState({
                notes,
            });
        });
    }

    render() {
        const showNote = (note) => <li key={ note._id }>
            {note.title} - {note.description}
        </li>
        return (
            <div>
                <ul>
                    {this.state.notes.map(note => <Note key={ note._id } 
                                                        onDelete={ this.refresh }
                                                        {...note} />)}
                </ul>
                <CreateNote user={this.props.user} onCreate={ this.refresh } />
            </div>
        );
    }
}

export default ShowNotes;