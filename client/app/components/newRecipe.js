import React from 'react';
// import { Link } from 'react-router';


export default class NewRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.data;
    this.state = {
      contents: []
    };
  }

  handlePublishClick(clickEvent) {
    clickEvent.preventDefault();
    var recipeName = document.getElementById("recipeName").value
    var description = document.getElementById("descriptionText").value
    var ingredients = document.getElementById("ingredientsText").value
    var instructions = document.getElementById("instructionsText").value
    this.state;
  }

  render() {
    return (
    <div>
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="panel panel-default">
            <div className="panel-body">
              <input type="text" className="form-control title" id="recipeName" placeholder="New Recipe"/>
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
                <textarea type="text" className="form-control" rows="2" id="descriptionText"
                    placeholder="Give a brief description"></textarea>
                <span className="description-count pull-right">Character Limit: 140<br/></span>
              </div>
              <h3 className="ingredient-title">Ingredients</h3>
              <textarea type="text" className="form-control ingredient-input" rows="8" id="ingredientsText"
                placeholder="What are the ingredients?"></textarea>
              <h3 className="instruction-title">Instructions</h3>
              <textarea type="text" className="form-control instruction-input" rows="12" id="instructionsText"
                placeholder="How do you make it?"></textarea>
            </div>
            <div className="panel-footer">
              <div className="row">
                <div className="col-md-9">
                  <button type="button" className="btn btn-default">Delete</button>
                </div>
                <div className="col-md-3">
                  <div className="pull-right">
                    <button type="button" className="btn btn-default publish-button" onClick={(e) => this.handlePublishClick(e)}>
                      Publish
                    </button>
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
