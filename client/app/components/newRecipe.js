import React from 'react';
import {postNewRecipe} from '../server';
import {hashHistory} from 'react-router';
import {hideElement, unixTimeToString} from '../util';

export default class NewRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
      pic: null,
      meal: "",
      allergies: "",
      dietary: ""
    };
  }

  handlePost(e) {
    e.preventDefault();
    var titleText = this.state.title.trim();
    var descriptionText = this.state.description.trim();
    var ingredientText = this.state.ingredients.trim().split("\n");
    var instructionText = this.state.instructions.trim().split("\n");
    var meal = this.state.meal.trim();
    var allergies = this.state.allergies.trim().split(",");
    var dietary = this.state.dietary.trim().split(",");

    if (titleText === "") {
      alert("Please give your recipe a name!");
    } else if (this.state.pic === null) {
      alert("Please add a photo!");
    } else if (descriptionText === "") {
      alert("Please give a brief description!");
    } else if (ingredientText[0] === "") {
      alert("You forgot to add the ingredient list!");
    } else if (instructionText[0] === "") {
      alert("How can we cook without instructions? Please add them!");
    } else if (meal === "" || allergies[0] === "" || dietary[0] === "") {
      alert("Uh oh you forgot to specify either the recipe's category, allergies or dietary restraints. Please add them!");
    } else {
      postNewRecipe("000000000000000000000001", titleText, ingredientText, this.state.pic, instructionText, descriptionText, allergies,
      meal, dietary, (newRecipe) => {
        hashHistory.push("/recipePage/" + newRecipe._id);
      });

      this.setState({title: "", description: "", ingredients: "",
        instructions: "", pic: null});

      }
    }

    handleDelete(e) {
      e.preventDefault();
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("ingredients").value = "";
      document.getElementById("instructions").value = "";
      document.getElementById("category").value = "";
      document.getElementById("allergies").value = "";
      document.getElementById("dietary").value = "";

      this.setState({
        title: "", description: "", ingredients: "", instructions: "", pic: null,
        meal: "", allergies: "", dietary: ""
      });
    }

    handleTitleChange(e) {
      e.preventDefault();
      this.setState({title: e.target.value});
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

    handleCategoryChange(e) {
      e.preventDefault();
      this.setState({meal: e.target.value});
    }

    handleAllergiesChange(e) {
      e.preventDefault();
      this.setState({allergies: e.target.value});
    }

    handleDietaryChange(e) {
      e.preventDefault();
      this.setState({dietary: e.target.value});
    }

    uploadImage(e) {
      e.preventDefault();
      var reader = new FileReader();
      var file = e.target.files[0];
      reader.onload = (upload) => {
        this.setState({
          pic: upload.target.result
        });
      };
      reader.readAsDataURL(file);
    }

    triggerImageUpload(e) {
      e.preventDefault();
      this.refs.file.click();
    }

    render() {
      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <input type="text" className="form-control title" id="title"
                      placeholder="New Recipe"
                      value={this.state.title}
                      onChange={(e) => this.handleTitleChange(e)}/>
                    <div className="media user-info">
                      <div className="media-left">
                        PIC
                      </div>
                      <div className="media-body"> Someone · {unixTimeToString(new Date().getTime())}</div>
                    </div>
                    <hr/>
                    <div style={{ height: 0, overflow: "hidden" }}>
                      <input ref="file" type="file" name="file" accept=".jpg,.jpeg,.png,.gif"
                        onChange={(e) => this.uploadImage(e)}/>
                    </div>
                    <a className="photo-input" onClick={(e) => this.triggerImageUpload(e)}>
                      <span className="glyphicon glyphicon-camera"></span> &nbsp;Add Photo
                      </a>
                      <div className="row">
                        <br/>
                        <div className="col-md-12">
                          <img className={hideElement(this.state.pic === null)}
                            src={this.state.pic} style={{width: "50%"}} />
                        </div>
                      </div>
                      <div className="description-input">
                        <textarea type="text" className="form-control" rows="2" id="description"
                          placeholder="Give a brief description"
                          value={this.state.description}
                          onChange={(e) => this.handleDescriptionChange(e)}></textarea>
                      </div>
                      <h3>Category</h3>
                      <input type="text" className="form-control" id="category"
                        placeholder="Choose one of the following: Breakfast, Lunch, Dinner or Dessert"
                        value={this.state.meal}
                        onChange={(e) => this.handleCategoryChange(e)} />
                      <h3>Allergies</h3>
                      <input type="text" className="form-control" id="allergies"
                        placeholder="Choose as many that apply: Nuts, Dairy, Shellfish, Wheat, Soy, Fish and Other"
                        value={this.state.allergies}
                        onChange={(e) => this.handleAllergiesChange(e)} />
                      <h3>Dietary Restraints</h3>
                      <input type="text" className="form-control" id="dietary"
                        placeholder="Choose as many that apply: Gluten, Vegetarian, Vegan, and Other"
                        value={this.state.dietary}
                        onChange={(e) => this.handleDietaryChange(e)} />
                      <h3 className="ingredient-title">Ingredients</h3>
                      <textarea type="text" className="form-control ingredient-input" id="ingredients"
                        rows="8" placeholder="What are the ingredients?"
                        value={this.state.ingredients}
                        onChange={(e) => this.handleIngredientsChange(e)}></textarea>
                      <h3 className="instruction-title">Instructions</h3>
                      <textarea type="text" className="form-control instruction-input" id="instructions"
                        rows="12" placeholder="How do you make it?"
                        value={this.state.instructions}
                        onChange={(e) => this.handleInstructionsChange(e)}></textarea>
                    </div>
                    <div className="panel-footer">
                      <div className="row">
                        <div className="col-md-9">
                          <button type="button"
                            className="btn btn-default"
                            onClick={(e) => this.handleDelete(e)}>Delete</button>
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
