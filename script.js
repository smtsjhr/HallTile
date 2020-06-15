
const enable_interaction = true;
var get_mouse_pos = false;
var get_touch_pos = false;

var mouse_x = window.innerWidth/2;
var mouse_y = window.innerHeight/2;

var interaction_variables = [mouse_x, mouse_y];

var t = 0;
var t_rate = .006;

var s = 120;
var range = 2.5*s;

var stop_animation = false;
var fps = 60;
var fpsInterval, startTime, now, then, elapsed;


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


startAnimating(fps);


function draw() {

    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    
    ctx.fillStyle = `rgba(0,0,0,1)`;
    ctx.fillRect(0, 0, W, H);

    let rows = Math.ceil(W/s);
    let cols = Math.ceil(H/s);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x_pos = s/2 + i*s;
            let y_pos = s/2 + j*s;
            let dist = Math.sqrt((x_pos - mouse_x)**2 + (y_pos - mouse_y)**2);
            let phase = 1 + 10/range*Math.min(dist, range);
            tile(30, x_pos, y_pos, phase, t);
        }
    }
  
    t += t_rate;
    
}

function tile(squares, x_pos, y_pos, phase, t) {

    for(let j=squares; j--; ) {
        let hue = (10*t)%360;
        ctx.fillStyle= `hsla(${hue}, 100%, ${80*((j+1)%2)}%, 1)`;
        ctx.fillRect(x_pos+(z=Math.cos(t/100)*Math.cos(a=j-j%2)*(k=1.03**a)-(d=10*k*(j%2+5*Math.sin(j*t/phase)))/2),y_pos+z,1*d,d);
    }
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    if (!stop_animation) {
        animate();
    }
 }
 
 function animate(newtime) {
    
    
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
     
        draw();    
     }

    if(enable_interaction) {
        canvas.addEventListener('mousedown', e => {
            //get_mouse_pos = true;
            //getMousePosition(canvas, e)
        });
            
        canvas.addEventListener('mouseup', e => {
            //get_mouse_pos = false;
        });
        
        canvas.addEventListener('mousemove', function(e) {
            if(true) {
                getMousePosition(canvas, e)
            }
        })
        
        canvas.addEventListener('touchstart', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
            
        canvas.addEventListener('touchend', function(e) {
        
        }, false);
            
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
    }
   
 }
 
 
function getMousePosition(canvas, event) {
    interaction(canvas,event, ...interaction_variables)
}

function getTouchPosition(canvas, event) {
    var event = event.touches[0];
    interaction(canvas,event, ...interaction_variables)
}


function interaction(canvas, event, ...interaction_variables) {

    mouse_x = event.clientX
    mouse_y = event.clientY

}

