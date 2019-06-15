

## Pathfinding Algorthim
A* uses heristics.  Dont check every route
so you just make a guess

A* algo is a loop

f(n) = g(n) + h(n)
f(n) is a cost function
g(n) actual cost from beggining to end
h(n) how long to get to the end

idea is to treverse the tree
    - we know where the end is
    - there is no way to over guess
    
canvas is a grid of cities
A* finds path in a pixal grid


openset = [] every node that needs to be evaluated
closedset = [] every node thats been visited

ALGO:
    - finised if you arrived at end
    - or when closed set is complete