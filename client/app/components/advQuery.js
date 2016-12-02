import React from 'react';

export default class AdvQuery extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSearchButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.button === 0) {
      var ingre = ["ingredient1","ingredient2","ingredient3"];
      var ingred =[];
      for (var i=0;i<ingre.length;i++){
        if (document.getElementById("formy").elements.namedItem(ingre[i]).value != null){
          ingred.push(document.getElementById("formy").elements.namedItem(ingre[i]).value);
        }
      }
      var allerg =[];
      var aller = ["allergies1","allergies2","allergies3","allergies4","allergies5","allergies6","allergies7","allergies8"];
      for (i=0;i<aller.length-1;i++){
        if (document.getElementById("formy").elements.namedItem(aller[i]).checked){
          if (i === 6)
            allerg.push(document.getElementById("formy").elements.namedItem(aller[i+1]).value);
          else
          allerg.push(document.getElementById("formy").elements.namedItem(aller[i]).value);
        }
      }

      var diety =[];
      var diet = ["diet1","diet2","diet3","diet4","diet5"];
      for (i=0;i<diet.length-1;i++){
        if (document.getElementById("formy").elements.namedItem(diet[i]).checked){
          if (i===3)
            diety.push(document.getElementById("formy").elements.namedItem(diet[i+1]).value);
          else
            diety.push(document.getElementById("formy").elements.namedItem(diet[i]).value);
        }
      }

      var a = document.getElementById("opt");
      var m = a.options[a.selectedIndex].value;

      var searchObj = {
          "meal":m,
          "ingredient": ingred,
          "allergies": allerg,
          "dietary": diety
        };
      this.search(searchObj);
    }
  }

  search(obj) {
    var trimmedTerm = obj;
    if (trimmedTerm !== "") {
      // Navigate to /search?q=[trimmedTerm]
      this.context.router.push({ pathname: "/results", query: { q: trimmedTerm } });
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.searchTerm !== null) {
      // Keep searchTerm in-sync with component changes.
      this.setState({
        searchTerm: newProps.searchTerm
      });
    }
  }

  render() {
    // HTML forms are special: Hitting 'enter' in an input box in a form
    // submits the form to the server with a POST command and refreshes
    // the page as a default action. The onSubmit handler below prevents that
    // from happening.
    return (
      <form onSubmit={(evt) => evt.preventDefault()} className="a-search" id="formy">
            Category:
          <select className="dropdown" id="opt">
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select><br/><br/>
         Ingredient 1: <input type="text" name="ingredient1" className="ing" maxLength="25"/><br/><br/>
         Ingredient 2: <input type="text" name="ingredient2" className="ing" maxLength="25"/><br/><br/>
         Ingredient 3: <input type="text" name="ingredient3" className="ing" maxLength="25"/>
          <br/>
          <h4>Allergies:</h4>
          <div className="col-md-12">
              <div className="col-md-4">
                  <input type="checkbox" name="allergies1" value="Nuts"/> Nuts<br/>
                  <input type="checkbox" name="allergies2" value="Dairy"/> Dairy<br/>
                  <input type="checkbox" name="allergies3" value="Shellfish"/> Shellfish<br/>
                  <input type="checkbox" name="allergies4" value="Wheat"/> Wheat<br/>
              </div>
              <div className="col-md-8">
                  <input type="checkbox" name="allergies5" value="Soy"/> Soy<br/>
                  <input type="checkbox" name="allergies6" value="Fish"/> Fish<br/>

                  <input type="checkbox" name="allergies7" value="Other"/> Other
                  <input type="text" name="allergies8" className="other" maxLength="25"/><br/><br/>
                  <br/></div>
          </div>
          <h4>Dietary Restraints: </h4>
          <div className="col-md-12">
              <div className="col-md-4">
                  <input type="checkbox" name="diet1" value="Gluten"/> Gluten<br/>
                  <input type="checkbox" name="diet2" value="Vegetarian"/>Vegetarian<br/>
              </div>
              <div className="col-md-8">
                  <input type="checkbox" name="diet3" value="Vegan"/>Vegan<br/>
                  <input type="checkbox" name="diet4" value="Other"/> Other
                  <input type="text" name="diet5" className="other" maxLength="25"/><br/><br/>
              </div>
          </div>
          <button type="button" className="btn btn-default" onClick={(e) => this.handleSearchButtonClick(e)}>
            Submit
          </button>
        </form>
    );
  }
}

// Tell React-Router that SearchBar needs to use the router dynamically.
AdvQuery.contextTypes = {
  router: React.PropTypes.object.isRequired
};
