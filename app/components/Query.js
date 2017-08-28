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
      `, "FETCH_GOLDBERG")
    );
  }

  render() {
    const {dispatch} = this.props;
    if (this.props.goldbergs === null) return <div>Loading..</div>;

    console.log("goldbergs fetched:", this.props.goldbergs);
    const goldberg = this.props.goldbergs[this.props.goldbergs.length-1]

    let queryText;
    return (
      <div>
        <h2>Last fetched:</h2>
        <p>character: { goldberg.character }</p>
        <p>actor: { goldberg.actor }</p>
        <p>role: { goldberg.role }</p>
        <p>traits: { goldberg.traits }</p>
        <textarea ref={node => {queryText = node}}
          defaultValue={'{goldberg(id: 1) { character, actor, role, traits }}'}>
        </textarea>
        <button onClick={() => {
          dispatch(getGraph(queryText.value, "FETCH_GOLDBERG"))}
        }>
          query
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({goldbergs}) => {
  return {goldbergs};
};

Query = connect(mapStateToProps)(Query);
export default Query;
