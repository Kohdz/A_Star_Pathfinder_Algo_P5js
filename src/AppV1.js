import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import p5 from 'p5';





class App extends Component {
  constructor(){
    super()
    this.state = {
      x: 100,
      y: 100
      }
    }

    componentDidMount(){
      this.sketch = new p5( p => {

    
        p.setup = ()  => {
          p.createCanvas(200,200)
            .parent(this.renderRef.current);
        }
      
        p.draw = () => {
          p.background(0);
          p.fill(225);
          p.rect(this.state.x, this.state.y, 50, 50)
          
          }
      
        });

    }

  render(){
    this.renderRef = React.createRef()
   
  return (
    <div className="App">
      <div ref={this.renderRef}></div>
    </div>
  );
}
}

export default App;
