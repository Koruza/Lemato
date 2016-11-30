import React from 'react';
import AdvQuery from './advQuery';

export default class AdvancedSearch extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
         return (
           <div>
           <div className="container">
               <div className="row">
                 <div className="col-md-1">
                 </div>
                   <div className="col-md-7 moveee">
                     <AdvQuery searchTerm={this.props.searchTerm} />
                   </div>
                   <div className="col-md-4">
                   </div>

               </div>

           </div>

           </div>
         )
     }

}
