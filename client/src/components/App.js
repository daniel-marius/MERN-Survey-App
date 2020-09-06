import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import SurveyShow from './surveys/SurveyShow';

class App extends React.Component {
  componentDidMount() {
    // Once the actions are wired up with connect, we can access with props the methods defined as actions
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={ Landing } />
          <Route exact path="/surveys" component={ Dashboard } />
          <Route exacy path="/surveys/new" component={ SurveyNew } />
          <Route path="/surveys/:_id" component={ SurveyShow } />
        </div>
      </BrowserRouter>
    );
  };
}

export default connect(null, actions)(App);
