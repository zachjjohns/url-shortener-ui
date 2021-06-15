import React, { Component } from 'react';
import './App.css';
import { deleteUrl, getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount = async() => {
    try {
      const fetchedUrls = await getUrls();
      this.setState({ urls: fetchedUrls.urls })
    } catch (e) {
      this.setState({ error: "Uh oh, could not get URL data." })
    }
  }

  addUrl = (newUrl) => {
    postUrl(newUrl);
    this.setState({ urls: [...this.state.urls, newUrl] })
  }
  
  removeUrl = (event, id) => {
    event.preventDefault();
    deleteUrl(id);
    const filteredUrls = this.state.urls.filter(url => url.id !== id)
    this.setState({ urls: filteredUrls })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm urls={this.state.urls} addUrl={this.addUrl}/>
        </header>
        <h2 className="error">{this.state.error}</h2>
        <UrlContainer urls={this.state.urls} removeUrl={this.removeUrl}/>
      </main>
    );
  }
}

export default App;
