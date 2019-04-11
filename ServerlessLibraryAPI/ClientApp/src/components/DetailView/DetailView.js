import React, { Component } from "react";
import { connect } from "react-redux";
import { libraryService } from "../../services";
import ActionBar from "./ActionBar";
import DetailPageContent from "./DetailPageContent";
import DetailPageHeader from "./DetailPageHeader";

import { sampleActions } from "../../actions/sampleActions";

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: {}
    };
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    var currentItem;
    if (this.props.samples.length > 0) {
      currentItem = this.props.samples.filter(s => s.title === id)[0];
      this.setState({ sample: currentItem });
    } else {
      libraryService
        .getAllSamples()
        .then(samples => {
          this.props.getSamplesSuccess(samples);
          currentItem = samples.filter(s => s.title === id)[0];
          this.setState({ sample: currentItem });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <div>
        <DetailPageHeader
          title={this.state.sample.title}
          repository={this.state.sample.repository}
          totaldownloads={this.state.sample.totaldownloads}
          description={this.state.sample.description}
          numlikes={0}
        />
        <DetailPageContent
          template={this.state.sample.template}
          repository={this.state.sample.repository}
        />
        <ActionBar
          template={this.state.sample.template}
          repository={this.state.sample.repository}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  samples: state.samples
});

const mapDispatchToProps = {
  getSamplesSuccess: sampleActions.getSamplesSuccess
};

const DetailViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailView);

export default DetailViewContainer;