

/*
class Search extends Component{
  constructor (props){
    super (props);
    this.state= {
    'dietaryRestrictions':{

      'Vegan' : false ,
      'Vegetarian': false,
      'Kosher': false,
      'Halaal': false,
      'Pescatarian': false,
      'Dairy': false,
      'Egg': false,
      'Gluten': false,
      'Peanut': false,
      'Sesame': false,
      'Seafood': false,
      'Shellfish': false,
      'Soy': false,
      'Sulfite': false,
      'Tree Nuts': false,
      'Wheat': false,
   },
  }
}
    

render(){
  return(
    <form onSubmit={this.onFormSubmit.bind(this)}>
      {this.renderDietaryRestrictions()}
      <input type="submit" value ="Save Dietary Restrictons"/>
    </form>

  )
  }
renderDietaryRestrictions(){
  const restrictions=['Vegan', 'Vegetarian','Kosher','Halaal','Pescatarian','Dairy','Egg','Gluten','Peanut','Sesame','Seafood',
  'Shellfish','Soy','Sulfite','Tree Nuts','Wheat'];
  return restrictions.map((restrictions,i) =>{
    return(
      <label key={i}>
        {restrictions}
        <input
        type="checkox"
        name = {restrictions}
        onChange= {this.onRestrictions.bind(this)}
        value ={this.state.dietaryRestrictions[restrictions]}
        />
        </label>

    )} 
   )}
  onRestrictions(e){
    const val=e.target.checked;
    const name=e.target.name;
    let updatedRestrictions= Object.assign({}, this.state.restrictions,{[name]: val})
    this.setState({
      'restrictions': updatedRestrictions
    })
  }
  onFormSubmit(e){e.preventDefault()
  return(this.state.dietaryRestrictions);
    }
  }; */
import { Component } from 'react';
import { render } from 'react-dom';
import Checkbox  from './Checkbox';
import ReactDOM from "react-dom";
import React from 'react';


const checkboxes = [
  {
    name: 'Vegan',
    key: 'checkBox1',
    label: 'Check Box 1',
  },
  {
    name: 'Vegetarian',
    key: 'checkBox2',
    label: 'Check Box 2',
  },
  {
    name: 'Kosher',
    key: 'checkBox3',
    label: 'Check Box 3',
  },
  {
    name: 'Halaal',
    key: 'checkBox4',
    label: 'Check Box 4',
  },
  {
    name: 'Pescatarian',
    key: 'checkBox1',
    label: 'Check Box 1',
  },
  {
    name: 'Dairy',
    key: 'checkBox2',
    label: 'Check Box 2',
  },
  {
    name: 'Egg',
    key: 'checkBox3',
    label: 'Check Box 3',
  },
  {
    name: 'Gluten',
    key: 'checkBox4',
    label: 'Check Box 4',
  },
  {
    name: 'Peanut',
    key: 'checkBox1',
    label: 'Check Box 1',
  },
  {
    name: 'Sesame',
    key: 'checkBox2',
    label: 'Check Box 2',
  },
  {
    name: 'Seafood',
    key: 'checkBox3',
    label: 'Check Box 3',
  },
  {
    name: 'Shellfish',
    key: 'checkBox4',
    label: 'Check Box 4',
  },
  {
    name: 'Soy',
    key: 'checkBox4',
    label: 'Check Box 4',
  },
  
  {
    name: 'Sulfite',
    key: 'checkBox4',
    label: 'Check Box 4',
  },
  {
    name: 'Tree Nuts',
    key: 'checkBox4',
    label: 'Check Box 4',
  },
  {
    name: 'Wheat',
    key: 'checkBox4',
    label: 'Check Box 4',
  },
  
  
];

//function Search(props) {
 // render() {
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showActionFilterList: false,
      checkedItems: new Map(),
    }

    this.handleChange = this.handleChange.bind(this);
  }

  showList = () => this.setState(prevState => ({
        showActionFilterList: !prevState.showActionFilterList
    }));  

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

 render() {
    return (
      <>

        {
          checkboxes.map(item => (
            <label key={item.key}>
              {item.name}
              <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
            </label>
          ))
        }
      </>
    );
  }
}

export default Search;