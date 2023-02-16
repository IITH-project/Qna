import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios  from "axios";

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

  handleSubmit=async (event)=> {
    event.preventDefault();
    const {data}=await axios.post('/api/createanswer',{
      id:this.props.id,
      post:this.state.content
    })
    this.props.setData([...this.props.Alldata,data[0]])
    this.state.content=""
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