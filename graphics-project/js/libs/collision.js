function isCollidingTopLeft(a,b){
    return  a.position.x1 > b.position.x1 && 
            a.position.x1 < b.position.x2 && 
            a.position.x2 > b.position.x1 && 
            a.position.x2 > b.position.x2 && 
            a.position.y1 > b.position.y1 && 
            a.position.y1 < b.position.y2 &&
            a.position.y2 > b.position.y1 &&
            a.position.y2 > b.position.y2; 
}
function isCollidingTopMiddle(a,b){
    return  a.position.x1 > b.position.x1 && 
            a.position.x1 < b.position.x2 && 
            a.position.x2 > b.position.x1 &&
            a.position.x2 < b.position.x2 &&  
            a.position.y1 > b.position.y1 &&
            a.position.y1 < b.position.y2 &&
            a.position.y2 > b.position.y1 &&
            a.position.y2 > b.position.y2;
}
function isCollidingTopRight(a,b){
    return  a.position.x1 < b.position.x1 &&
            a.position.x1 < b.position.x2 &&
            a.position.x2 > b.position.x1 &&  
            a.position.x2 < b.position.x2 && 
            a.position.y1 > b.position.y1 &&
            a.position.y1 < b.position.y2 &&
            a.position.y2 > b.position.y1 &&
            a.position.y2 > b.position.y2;
}

function isCollidingTop(a,b){
    return  isCollidingTopLeft(a,b) ||
            isCollidingTopMiddle(a,b) ||    
            isCollidingTopRight(a,b)
}

function isCollidingBottomLeft(a,b){
    return  a.position.x1 > b.position.x1 &&
            a.position.x1 < b.position.x2 &&
            a.position.x2 > b.position.x1 &&
            a.position.x2 > b.position.x2 &&
            a.position.y1 < b.position.y1 &&
            a.position.y1 < b.position.y2 &&
            a.position.y2 > b.position.y1 && 
            a.position.y2 < b.position.y2
}

function isCollidingBottomMiddle(a,b){
    return  a.position.x1 > b.position.x1 && 
            a.position.x1 < b.position.x2 && 
            a.position.x2 > b.position.x1 && 
            a.position.x2 < b.position.x2 &&
            a.position.y1 < b.position.y1 &&  
            a.position.y1 < b.position.y2 &&
            a.position.y2 > b.position.y1 &&  
            a.position.y2 < b.position.y2
}

function isCollidingBottomRight(a,b){
    return  a.position.x1 < b.position.x1 &&
            a.position.x1 < b.position.x2 &&
            a.position.x2 > b.position.x1 && 
            a.position.x2 < b.position.x2 &&
            a.position.y1 < b.position.y1 &&
            a.position.y1 < b.position.y2 &&
            a.position.y2 > b.position.y1 &&
            a.position.y2 < b.position.y2
}

function isCollidingBottom(a,b){
    return  isCollidingBottomLeft(a,b) ||
            isCollidingBottomMiddle(a,b) ||
            isCollidingBottomRight(a,b)
}

function isCollidingMiddleRight(a,b){
    return  a.position.x1 < b.position.x1 &&
            a.position.x1 < b.position.x2 &&
            a.position.x2 > b.position.x1 &&
            a.position.x2 < b.position.x2 &&
            a.position.y1 > b.position.y1 &&
            a.position.y1 < b.position.y2 &&
            a.position.position.y2 > b.position.y1 &&
            a.position.y2 < b.position.y2
}

function isCollidingRight(a,b){
    return  isCollidingMiddleRight(a,b)
}

function isCollidingMiddleLeft(a,b){
    return  a.position.x1 > b.position.x1 &&  
            a.position.x1 < b.position.x2 &&
            a.position.x2 > b.position.x1 &&
            a.position.x2 > b.position.x2 &&
            a.position.y1 > b.position.y1 &&
            a.position.y1 < b.position.y2 &&
            a.position.y2 > b.position.y1 &&  
            a.position.y2 < b.position.y2
}

function isCollidingLeft(a,b){
    return  isCollidingMiddleLeft(a,b)
}

function isCollidingTopBottom(a,b){
    return  isCollidingTop(a,b) ||
            isCollidingBottom(a,b)
}

function isCollidingRightLeft(a,b){
    return  isCollidingRight(a,b) ||
            isCollidingLeft(a,b)
}

function isColliding(a,b){
    return  isCollidingTopBottom(a,b) ||
            isCollidingRightLeft(a,b)
};