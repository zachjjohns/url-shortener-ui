import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
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

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm urls={this.state.urls} addUrl={this.addUrl}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
