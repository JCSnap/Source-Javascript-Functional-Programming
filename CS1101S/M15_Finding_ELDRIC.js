while (ev3_touchSensorPressed(ev3_touchSensor4())) { 
    display(ev3_ambientLightIntensity(ev3_colorSensor()));
    ev3_pause(1000);
}

const left_wheel = ev3_motorA(); 
const right_wheel = ev3_motorD(); 
const colorSensor = ev3_colorSensor();
const pause = ev3_pause(1000);
 
function travel_front(d){ 
    const degree = 360 * d / 5.5 / math_PI; 
    const time = 1000 * degree/180; 
    ev3_runForTime(left_wheel, time, 180); 
    ev3_runForTime(right_wheel, time, 180); 
    ev3_pause(time); 
}

let have_path = ev3_ambientLightIntensity(colorSensor);

while (have_path < 10) { 
    have_path = ev3_ambientLightIntensity(colorSensor);
    travel_front(1);
    ev3_pause(10);
}

const left_wheel = ev3_motorA(); 
const right_wheel = ev3_motorD(); 
const colorSensor = ev3_colorSensor();
const pause = ev3_pause(1000);
 
function travel_front(d){ 
    const degree = 360 * d / 5.5 / math_PI; 
    const time = 1000 * degree/90; 
    ev3_runForTime(left_wheel, time, 90); 
    ev3_runForTime(right_wheel, time, 90); 
    ev3_pause(time + 10); 
}

function turn(angle){
    const d = 12.6;
    const direction = angle > 0 ? 1 : -1;  
    const distance = d / 2 * angle / 180 * math_PI;  
    const speed = 150;
    const time = math_abs(19000 * distance / speed); 
    ev3_pause(time);
    ev3_runForTime(right_wheel, time, -direction * speed);  
    ev3_runForTime(left_wheel, time, direction * speed);  
    ev3_pause(time);  
} 


let have_path = ev3_ambientLightIntensity(colorSensor);
display(have_path);

const breakpoint_intensity = 11;

while (have_path < breakpoint_intensity){
    have_path = ev3_ambientLightIntensity(colorSensor);
    travel_front(1);
    let degree_turned = 0;
    if (have_path >= breakpoint_intensity){
        let check_right = true;
        while (have_path >= breakpoint_intensity){
            if (check_right){
                turn(15);
                degree_turned = degree_turned + 15;
            } else {
                turn(-15);
                degree_turned = degree_turned - 15;
            }
            have_path = ev3_ambientLightIntensity(colorSensor);
            display(have_path);
            if (degree_turned === 90 && have_path >= breakpoint_intensity) {
                check_right = false;
                degree_turned = 0;
                turn (-90);
            } else if (degree_turned === -90){
                turn(90);
                break;
            }
        }
    }
    if (degree_turned === -90){
        break; 
    }
}