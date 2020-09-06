import React from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSurveys } from '../../actions';

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return map(this.props.surveys, survey => {
      return (
          <div className="card darken-1" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>
                {survey.body}
              </p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a href='/surveys'>Yes: {survey.yes}</a>
              <a href='/surveys'>No: {survey.no}</a>
              <Link to={`/surveys/${survey._id}`}>Read</Link>
            </div>
          </div>
      );
    });
  }

  render() {
    return (
      <div>
        { this.renderSurveys() }
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
