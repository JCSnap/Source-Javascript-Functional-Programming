// Your program here.
const sensor = ev3_ultrasonicSensor(); 
const left_wheel = ev3_motorA(); 
const right_wheel = ev3_motorD(); 
 
function travel_front(d){ 
    const degree = 360 * d / 5.5 / math_PI; 
    const time = 1000 * degree/180; 
    ev3_runForTime(left_wheel, time, 180); 
    ev3_runForTime(right_wheel, time, 180); 
    ev3_pause(time); 
} 
 
let current_distance = ev3_ultrasonicSensorDistance(sensor); 
let stop = 200; 
while (current_distance >= stop) { 
    current_distance = ev3_ultrasonicSensorDistance(sensor); 
    display(current_distance); 
    travel_front(5); 
    ev3_pause(10); 
}

// Your program here.
const sensor = ev3_ultrasonicSensor(); 
const left_wheel = ev3_motorA(); 
const right_wheel = ev3_motorD(); 
 
function travel_front(d){ 
    const degree = 360 * d / 5.5 / math_PI; 
    const time = 1000 * degree/180; 
    ev3_runForTime(left_wheel, time, 180); 
    ev3_runForTime(right_wheel, time, 180); 
    ev3_pause(time); 
} 
 
function travel_back(d){ 
    const degree = 360 * d / 5.5 / math_PI; 
    const time = 1000 * degree/180; 
    ev3_runForTime(left_wheel, time, -180); 
    ev3_runForTime(right_wheel, time, -180); 
    ev3_pause(time); 
} 
 
let current_distance = ev3_ultrasonicSensorDistance(sensor); 
let stop = 200; 
while (current_distance >= stop) { 
    current_distance = ev3_ultrasonicSensorDistance(sensor); 
    travel_front(5); 
    ev3_pause(10); 
} 

travel_back(30);

// Your program here.
const sensor = ev3_ultrasonicSensor();   
const left_wheel = ev3_motorA();   
const right_wheel = ev3_motorD();   
   
function travel_front(d){   
    const degree = 360 * d / 5.5 / math_PI;   
    const time = 1000 * degree/180;   
    ev3_runForTime(left_wheel, time, 180);   
    ev3_runForTime(right_wheel, time, 180);   
    ev3_pause(time);   
}   
 
const speed = 90;  
  
function turn(angle){  
    const direction = angle > 0 ? 1 : -1;  
    const wish = 2000 / angle;  
    const time = angle * wish;  
      
    ev3_pause(time);  
    ev3_runForTime(right_wheel, time, -direction * speed);  
    ev3_runForTime(left_wheel, time, direction * speed);  
    ev3_pause(time);  
}  
 
//code 
let current_distance = ev3_ultrasonicSensorDistance(sensor);   
let stop = 200;   
while (current_distance >= stop) {   
    current_distance = ev3_ultrasonicSensorDistance(sensor);   
    display(current_distance);   
    travel_front(5);   
    ev3_pause(10);   
}  
if (math_random() < 0.5) { 
    turn(90); 
    travel_front(40); 
    turn(-90); 
    travel_front(30); 
} else { 
    turn(-90); 
    travel_front(40); 
    turn(90); 
    travel_front(30); 
}