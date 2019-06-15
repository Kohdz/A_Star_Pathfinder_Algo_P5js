import React, { Component } from 'react';
// import logo from './logo.svg';
import p5 from 'p5';







class App extends Component {
  constructor(){
    super()
    this.renderRef = React.createRef()
    this.state = {
    
    }

  }

    componentDidMount(){
      this.sketch = new p5( p => {


        function removeFromArray(arr, elt){
          for (let i = arr.length - 1; i >= 0; i--){
            if (arr[i] === elt){
              arr.splice(i, 1);
            }
          }
        }

        function heuristic(a, b){
          //eculidean distance [how long the line is between 2 poitns]
          let d = p.dist(a.i, a.j, b.i, b.j)
          // let d = p.abs(a.i - b.i) + p.abs(a.j - b.j)
          return d;
        }


        const COLS = 50;
        const ROWS = 50;
        let start;
        let end;

        //nodes that have yet to be visited
        let openSet = [];

        //nodes that have been visited
        let closedSet = [];
        let w,h;
        let path = [];
        let grid = new Array(COLS)


        function Spot(i, j){
          this.i =  i;
          this.j = j;
          this.f = 0;
          this.g = 0;
          this.h = 0;
          this.previous = undefined;
        

          //every spot will by default not be a wall
          this.wall = false;


          //but randomly there will be walls

          if(p.random(1) < 0.3) {
            this.wall = true;
          }

          this.neighbors = [];
          
          this.show = function(col){
            p.fill(col);
            
            //display wall
            if(this.wall) {
              p.fill(0);
            }

            p.noStroke(0);
            p.rect(this.i*w, this.j*h, w-1, h-1)
          }

          this.addNeighbors = function(grid){
            let i = this.i;
            let j = this.j;

            if( i < COLS-1){
              this.neighbors.push(grid[i + 1][j]);
            }

            if (i > 0){
              this.neighbors.push(grid[i - 1][j]);
            }
            
            if( j < ROWS - 1){
              this.neighbors.push(grid[i][j + 1]);
            }

            if ( j > 0){
              this.neighbors.push(grid[i][j - 1]);
            }
          
            if (i > 0 && j > 0){
              this.neighbors.push(grid[i - 1][j - 1]);
            }
            if (i < COLS -1 && j > 0){
              this.neighbors.push(grid[i + 1][j - 1]);
            }
            if (i < 0 && j < ROWS -1){
              this.neighbors.push(grid[i - 1][j + 1]);
            }
            if (i < COLS-1 && j < ROWS -1){
              this.neighbors.push(grid[i + 1][j + 1]);
            }

          }

        }
        
        p.setup = ()  => {
          p.createCanvas(400, 400);
          console.log('A*')

          w = p.width / COLS;
          h = p.height / ROWS;

          //make a 2D array
          for(let i =0; i < COLS; i++){
            grid[i] = new Array(ROWS);
          }

          //This is where the spots are made
          for (let i =0; i < COLS; i++){
            for(let j = 0; j < ROWS; j++){
              grid[i][j] = new Spot(i, j);
            }
          }

          //this is where the negihors records are keept
          for (let i =0; i < COLS; i++){
            for(let j = 0; j < ROWS; j++){
              grid[i][j].addNeighbors(grid);
            }
          }


          start = grid[0][0];
          // end = grid[COLS -1][ROWS -1]
          end = grid[COLS -1][ROWS -1]

          //start is never a wall and end is never a wall
          start.wall = false;
          end.wall = false;

          // we start with openSet 
          openSet.push(start)

          // console.log(grid)
 
        }

              
      p.draw = () => {

        //we keep going
        if(openSet.length > 0){
          let winner = 0;

          //figure out the f
          for (let i = 0; i < openSet.length; i++){
            if(openSet[i].f < openSet[winner].f){
              winner = i;
            }
          }
          let current = openSet[winner];

          //if the end is the best, were done
          if (current === end){
          
            p.noLoop();

            console.log("Done!")
          }

          removeFromArray(openSet, current);
          
          //openSet.remove(current);
          closedSet.push(current);

          //checking neighbors
          let neighbors = current.neighbors;
          for (let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            
            //if you move to the neighbor, keep track of g, steps


            //if closedSet does not include neginhbor or wall, include it
            if(!closedSet.includes(neighbor) && !neighbor.wall){

              //keep track of what g is 
              let tempG = current.g + 1;
            
              let newPath = false;
              //have you evaluated this g before? if so then you have a better g
              if (openSet.includes(neighbor)){
                if (tempG < neighbor.g){
                  neighbor.g = tempG;
                  newPath = true;
                }

                //if it is not in the openSet, then add it
                
              } else {
                neighbor.g = tempG;
                newPath = true;
                openSet.push(neighbor)
              }

              //you guess how long it will take to get to the end
              //heuristic is the raw distance
              if (newPath){
              neighbor.h = heuristic(neighbor, end)
              //f is the score of the getting there
              neighbor.f = neighbor.g + neighbor.h
              //pervious allows you to store the path so you can trace it back
              neighbor.previous = current;
              }
            }
            
            
            }
    
      
      
    

        p.background(0);

        //visualise the grid
        for (let i = 0; i < COLS; i++){
          for(let j = 0; j < ROWS; j++){
            grid[i][j].show(p.color(255));
          }
        }

        //visualize the closedSet
        for(let i =0; i < closedSet.length; i++){
          closedSet[i].show(p.color(255, 0, 0))  
        }

        //visualize the openSet
        for(let i = 0; i < openSet.length; i ++){
          openSet[i].show(p.color(0, 255, 0)) 
        }
      
        //Find the path
        //the end before it is added to the list
        
     
        path = [];
        //if there exists a previous
        let temp = current;
        path.push(temp);
        while(temp.previous){
          path.push(temp.previous);
          temp = temp.previous;
          }

        
      }  else {
        //no solution
        console.log("no solution");
  
        p.noLoop();
        return;
      } 
      



        
        for (let i = 0; i < path.length; i++){
          path[i].show(p.color(0, 0, 255));
        }
      
      
        




    } //if len open
    
        
    }) //p5class 
  }

     //componentDidMount
  render(){
  return (
    <div className="App">
      <div className="animmation"ref={this.renderRef}></div>
    </div>
  )};
}

export default App;
