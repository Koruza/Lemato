import React from 'react';
import {postNewRecipe} from '../server';
import {hashHistory} from 'react-router';
import {hideElement, unixTimeToString} from '../util';

export default class NewRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        title: "",
        //photo: "", TODO
        description: "",
        ingredients: "",
        instructions: "",
        pic: null
    };
  }

  handlePost(e) {
    e.preventDefault();
    var titleText = this.state.title.trim();
    var descriptionText = this.state.description.trim();
    var ingredientText = this.state.ingredients.trim().split("\n");
    var instructionText = this.state.instructions.trim().split("\n");

    if (titleText === "") {
      alert("Please give your recipe a name");
    } else if (this.state.pic === null) {
      alert("Please add a photo");
    } else if (descriptionText === "") {
      alert("Please give a brief description");
    } else if (ingredientText[0] === "") {
      alert("You forgot to add the ingredient list");
    } else if (instructionText[0] === "") {
      alert("How can we cook without instructions? Please add them!");

    } else {
      var allergies = ["None"]; //TODO
      var meal = "None"; //TODO
      // var pic = "None";
      var dietary = ["None"];

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

    this.setState({
      title: "", description: "", ingredients: "", instructions: "", pic: null
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
