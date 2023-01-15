// Your program here.

ev3_speak("Hello Word!");

// Your program here.

const motorD = ev3_motorD();
const motorA = ev3_motorA();
const pause = () => ev3_pause(1000);
const speed = 90;

function straight(dist) {
    const linear_speed = (360 * 1000) / (5.6 * math_PI * speed);
    const time = linear_speed * dist;
    ev3_runForTime(motorD, time, speed);
    ev3_runForTime(motorA, time, speed);
    ev3_pause(time);
}

straight(20);

// Your program here.

function turn(angle) {
    const direction = angle > 0 ? 1 : -1;
    const wish = 2000 / angle;
    const time = angle * wish;
    
    ev3_pause(time);
    ev3_runForTime(motorD, time, -direction * speed);
    ev3_runForTime(motorA, time, direction * speed);
    ev3_pause(time);
}
// turn(1);

// Your program here.
straight(20);
pause();
turn(90);
pause();
straight(15);
pause();
turn(-90);
pause();
straight(25);