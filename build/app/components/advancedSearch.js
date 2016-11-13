import React from 'react';
import {Link} from 'react-router';

export default class AdvancedSearch extends React.Component {

// <Link to={"/profile/" + this.props.author._id}>
// {this.props.author.fullName}
// </Link>
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    console.log("Hi");
         return (
           <div>
           <div className="container">
               <div className="row">
                   <div className="col-md-5">
                   </div>
                   <div className="col-md-7 moveee">
                       <form className="a-search">
                             Category:
                           <select className="dropdown">
                             <option value="breakfast">Breakfast</option>
                             <option value="lunch">Lunch</option>
                             <option value="dinner">Dinner</option>
                             <option value="dessert">Dessert</option>
                           </select><br/><br/>
                           Ingredient 1: <input type="text" name="ingredient" className="ing" maxlength="25"/><br/><br/>
                           Ingredient 2: <input type="text" name="ingredient" className="ing" maxlength="25"/><br/><br/>
                           Ingredient 3: <input type="text" name="ingredient" className="ing" maxlength="25"/>
                           <span className="glyphicon glyphicon-plus-sign"></span><br/>
                           <br/>
                           <h4>Allergies:</h4>
                           <div className="col-md-12">
                               <div className="col-md-4">
                                   <input type="checkbox" name="allergies" value="Nuts"/> Nuts<br/>
                                   <input type="checkbox" name="allergies" value="Dairy"/> Dairy<br/>
                                   <input type="checkbox" name="allergies" value="Shellfish"/> Shellfish<br/>
                                   <input type="checkbox" name="allergies" value="Wheat"/> Wheat<br/>
                               </div>
                               <div className="col-md-8">
                                   <input type="checkbox" name="allergies" value="Soy"/> Soy<br/>
                                   <input type="checkbox" name="allergies" value="Fish"/> Fish<br/>

                                   <input type="checkbox" name="allergies" value="Other"/> Other
                                   <input type="text" name="ingredient" className="other" maxlength="25"/><br/><br/>
                                   <br/></div>
                           </div>
                           <h4>Dietary Restraints: </h4>
                           <div className="col-md-12">
                               <div className="col-md-4">
                                   <input type="checkbox" name="diet" value="Gluten"/> Gluten<br/>
                                   <input type="checkbox" name="diet" value="Vegetarian"/>Vegetarian<br/>
                               </div>
                               <div className="col-md-8">
                                   <input type="checkbox" name="diet" value="Vegan">Vegan<br/>
                                   <input type="checkbox" name="allergies" value="Other"/> Other
                                   <input type="text" name="ingredient" className="other" maxlength="25"/><br/><br/>
                               </div>
                           </div>
                           <input type="submit" value="Submit" className="submit" id="subm"/>
                         </form>
                   </div>

               </div>

           </div>
           </div>
         )
     }


}
