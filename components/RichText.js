import React from "react";
import { Editor } from "@tinymce/tinymce-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(content, editor) {
    this.setState({content});
  }

  handleSubmit(event) {
    alert("Text was submitted: " + this.state.content);
    event.preventDefault();
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <Editor
          value={this.state.content}
          init={{
            height: 300,
            menubar: false
          }}
          onEditorChange={this.handleChange}
        />
        <br />
        <button>Submit</button>
      </form>
    );
  }
}

export default App;