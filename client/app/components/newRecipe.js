import React from 'react';
import {postNewRecipe} from '../server';
import {hashHistory} from 'react-router';

export default class NewRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        title: "",
        //photo: "", TODO
        description: "",
        ingredients: "",
        instructions: ""
    };
  }

  handlePost(e) {
    e.preventDefault();
    var titleText = this.state.title.trim();
    var descriptionText = this.state.description.trim();
    var ingredientText = this.state.ingredients.trim().split("\n");
    var instructionText = this.state.instructions.trim().split("\n");

    if (titleText !== "" && descriptionText !== "" && ingredientText !== ""
        && instructionText !== "") {

      var allergies = ["None"]; //TODO
      var meal = "None"; //TODO
      var pic = "None";
      var dietary = ["None"];

      postNewRecipe("000000000000000000000001", titleText, ingredientText, pic, instructionText, descriptionText, allergies,
        meal, dietary, (newRecipe) => {
        hashHistory.push("/recipePage/" + newRecipe._id);
      });

      this.setState({title: ""});
      this.setState({description: ""});
      this.setState({ingredients: ""});
      this.setState({instructions: ""});

    }
  }

  handleTitleChange(e) {
    e.preventDefault();
    this.setState({title: e.target.value});
    // console.log("in handleTitleChange", e.target.value);

  }

  handleDescriptionChange(e) {
    e.preventDefault();
    this.setState({description: e.target.value});
  }

  handleIngredientsChange(e) {
    e.preventDefault();
    this.setState({ingredients: e.target.value});
  }

  handleInstructionsChange(e) {
    e.preventDefault();
    this.setState({instructions: e.target.value});
  }

  render() {
    return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-body">
                <input type="text" className="form-control title"
                  placeholder="New Recipe"
                  value={this.state.title}
                  onChange={(e) => this.handleTitleChange(e)}/>
                <div className="media user-info">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body"> You · Wednesday, October 5, 2016</div>
                </div>
                <hr/>
                <a className="photo-input" href="#">
                  <span className="glyphicon glyphicon-camera"></span> &nbsp;Add Photo
                </a>
                <div className="description-input">
                  <textarea type="text" className="form-control" rows="2"
                      placeholder="Give a brief description"
                      value={this.state.description}
                      onChange={(e) => this.handleDescriptionChange(e)}></textarea>
                  <span className="description-count pull-right">Character Limit: 140<br/></span>
                </div>
                <h3 className="ingredient-title">Ingredients</h3>
                <textarea type="text" className="form-control ingredient-input" rows="8"
                  placeholder="What are the ingredients?"
                  value={this.state.ingredients}
                  onChange={(e) => this.handleIngredientsChange(e)}></textarea>
                <h3 className="instruction-title">Instructions</h3>
                <textarea type="text" className="form-control instruction-input" rows="12"
                  placeholder="How do you make it?"
                  value={this.state.instructions}
                  onChange={(e) => this.handleInstructionsChange(e)}></textarea>
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-md-9">
                    <button type="button" className="btn btn-default">Delete</button>
                  </div>
                  <div className="col-md-3">
                    <div className="pull-right">
                      <button type="button"
                        className="btn btn-default publish-button"
                        onClick={(e) => this.handlePost(e)}>Publish</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}
