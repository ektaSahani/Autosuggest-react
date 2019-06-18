import React from 'react';
import Autosuggest from '../Autosuggest/Autosuggest';
import Suggestions from '../Suggestions/Suggestions'
import '../App/App.scss'
import Chips from '../Chips/Chips';
import { connect } from 'react-redux';
import { filterList, showList, updateCursor, setSelectedKey } from '../../actions';

export class App extends React.Component {
  state = {
    selectedSuggestion: '',
    list:[]
  };
  handleChange = (value) => {
    this.props.filterList(value);

    this.setState({
      selectedSuggestion: value
    });
    this.props.showList(true);
  };
  onSuggestionSelect = (value) => {
    this.setState({
      selectedSuggestion: value.label,
    });
    this.props.setSelectedKey(value.value);
    this.props.updateCursor(0);
    this.props.showList(false);
    this.props.filterList(value.label);
    this.setState(state=>{
      const  list = [...state.list, state.selectedSuggestion ];
      return {list};
    });

  }

  onInputFocus = () => {
    this.props.showList(true);
  }

  navigateThroughKeys = (e) => {
    const { cursor, filterList } = this.props.state;
    if (e.keyCode === 38 && cursor > 0) {
      this.props.updateCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < filterList.length - 1) {
      this.props.updateCursor(cursor + 1);
    } else if (e.keyCode === 13) {
      this.onSuggestionSelect(filterList[cursor]);
    }
    if (document.querySelector('.active')) {
      document.querySelector('.active').scrollIntoView({ block: 'center' });
    }
  }
  onChipsDelete=(i)=>
  {
    this.setState(state=>{
     const list = state.list.filter((chip,j)=>i!==j);
     return{list};
    })
  }


  render() {
    const { selectedSuggestion, list } = this.state;
    return (
      <section className='wrapper'>
        <div className='wrapper_container'>
          <h2 className='wrapper_container_heading--center'>Autosuggest</h2>
          <Chips list={list} onChipsDelete={this.onChipsDelete}></Chips> 
          <Autosuggest onHandleChange={this.handleChange} selectedSuggestion={selectedSuggestion} onFocus={this.onInputFocus} onKeyDown={this.navigateThroughKeys}></Autosuggest>
          {this.props.state && this.props.state.showList ? <Suggestions suggestionList={this.props.state.filterList} onSuggestionClick={this.onSuggestionSelect} selectedSuggestionKey={this.props.state.key} cursor={this.props.state.cursor} /> : ''}
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, { filterList, showList, updateCursor, setSelectedKey })(App);

