import React, { Component } from 'react';
import { postUrl } from '../../apiCalls';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.title || !this.state.urlToShorten) {
      this.setState({ inputError: "Please fill both inputs!" })
      return
    }
    const newUrl = {
      short_url: `http://localhost:3001/useshorturl/${this.props.urls.length+1}`,
      long_url: this.state.urlToShorten,
      ...this.state
    }
    this.props.addUrl(newUrl);
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: '', inputError: ''});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
        />

        <button onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
        <h2>{this.state.inputError}</h2>
      </form>
    )
  }
}

export default UrlForm;
