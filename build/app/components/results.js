import React from 'react';

export default class results extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  

  render() {
    return (
      <div classNameName="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="panel panel-success">
              <div className="panel-body">
                <div className="media">
                  <div className="media-left">
                    <a href="#">
                      <img className="media-object result-pic" src="img/brownie-egg.jpg" alt="brownie-egg"></img>
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">Egg Brownie</h4>
                    A brownie but in the shape of an egg. Trick your friends with this delicious treat. Only 200 calories!
                  </div>
                  <div className="media-right recipe-vote">
                    <a href="#"><span className="glyphicon glyphicon-arrow-up"></span></a>
                    <div>5129</div>
                    <a href="#"><span className="glyphicon glyphicon-arrow-down"></span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="col-md-2"></div>
      </div>
    </div>
    )
  }
}
