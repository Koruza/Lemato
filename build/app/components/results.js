import React from 'react';

export default class results extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.data
  }

  render() {
    var data = this.state

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
                    <h4 className="media-heading">{data.name}</h4>
                    {data.description}
                  </div>
                  <div className="media-right recipe-vote">
                    <a href="#"><span className="glyphicon glyphicon-arrow-up"></span></a>
                    <div>{data.chefPoints}</div>
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
