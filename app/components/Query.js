import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../actions/actions';

class Query extends Component {
  componentDidMount() {
    this.props.dispatch(
      getGraph(`
        {
          goldberg(id: 2) {
            character, actor, role, traits
          }
        }
      `)
    );
  }

  render() {
    const {dispatch} = this.props;
    const fetchInProgress = String(this.props.store.get('fetching'));
    let queryText;
    console.log("store:", this.props.store);
    const goldberg = this.props.store.get('data').toObject();

    return (
      <div>
        <h2>Fetch in progress: {fetchInProgress}</h2>
        <p>character: { goldberg.character }</p>
        <p>actor: { goldberg.actor }</p>
        <p>role: { goldberg.role }</p>
        <p>traits: { goldberg.traits }</p>
        <textarea ref={node => {queryText = node}}></textarea>
        <button onClick={() => {
          dispatch(getGraph(queryText.value))}
        }>
          query
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    store: state
  };
};

Query = connect(mapStateToProps)(Query);
export default Query;
