import React from 'react';
// import {Link} from 'react-router';
import {pullData} from '../server';

export default class AdvancedSearch extends React.Component {

// <Link to={"/profile/" + this.props.author._id}>
// {this.props.author.fullName}
// </Link>
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  handleSubmitClick(clickEvent) {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      if (clickEvent.button === 0) {
        // var x = document.getElementsByTagName('input');
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
            allerg.push(document.getElementById("formy").elements.namedItem(aller[i]).value);
          }
        }

        var diety =[];
        var diet = ["diet1","diet2","diet3","diet4","diet5"];
        for (i=0;i<diet.length;i++){
          if (document.getElementById("formy").elements.namedItem(diet[i]).checked){
            diety.push(document.getElementById("formy").elements.namedItem(diet[i]).value);
          }
        }


        var searchObj = {
            "ingredient": ingred,
            "alergies": allerg,
            "dieraryRestrcition": diety
          };
          pullData(searchObj);
      }
  }

  render() {
         return (
           <div>
           <div className="container">
               <div className="row">
                   <div className="col-md-5">
                   </div>
                   <div className="col-md-7 moveee">
                       <form className="a-search" id="formy">
                             Category:
                           <select className="dropdown">
                             <option value="breakfast">Breakfast</option>
                             <option value="lunch">Lunch</option>
                             <option value="dinner">Dinner</option>
                             <option value="dessert">Dessert</option>
                           </select><br/><br/>
                         Ingredient 1: <input type="text" name="ingredient1" className="ing" maxLength="25"/><br/><br/>
                       Ingredient 2: <input type="text" name="ingredient2" className="ing" maxLength="25"/><br/><br/>
                     Ingredient 3: <input type="text" name="ingredient3" className="ing" maxLength="25"/>
                           <span className="glyphicon glyphicon-plus-sign"></span><br/>
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
                           <input type="submit" value="Submit" className="submit" id="subm" onClick={(e) => this.handleSubmitClick(e)}/>
                         </form>
                   </div>

               </div>

           </div>
           </div>
         )
     }


}
