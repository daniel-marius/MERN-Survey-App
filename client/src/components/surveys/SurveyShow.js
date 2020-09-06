import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSurvey } from '../../actions';

class SurveyShow extends React.Component {
  componentDidMount() {
    this.props.fetchSurvey(this.props.match.params._id);
  }

  renderImage() {
    const { imageUrl } = this.props.survey;
    if (imageUrl) {
      return (
        <img
          alt={ imageUrl }
          src={ `https://s3-eu-west-1.amazonaws.com/s3_bucket_name/${imageUrl}` }
        />
      );
    }
  }

  render() {
    if (!this.props.survey) {
      return '';
    }

    const { title, body } = this.props.survey;

    return (
      <div style={{ textAlign: 'center' }}>
        <h3>{ title }</h3>
        <p>{ body }</p>
        { this.renderImage() }
        <br />
        <Link to="/surveys">Back to Surveys</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }, ownProps) => {
  return { survey: surveys[ownProps.match.params._id] };
};

export default connect(mapStateToProps, { fetchSurvey })(SurveyShow);
