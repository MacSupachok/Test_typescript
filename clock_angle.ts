function getClockAngle(time: string): number {

    // แยกชั่วโมงและนาทีจากเวลา
    const [hourStr, minuteStr] = time.split(":");
    
    // แปลงชั่วโมงและนาทีเป็นตัวเลข
    let hour = parseInt(hourStr);
    let minute = parseInt(minuteStr);
  
    // ตรวจสอบว่าชั่วโมงอยู่ในช่วง 0 - 12 หรือ 13 - 24 และปรับให้เป็นชั่วโมงในช่วง 0 - 12
    if (hour >= 12) {
      hour -= 12;
    }

    // console.log("hour = " + hour);
  
    // คำนวณองศาของเข็มชั่วโมง และองศาของเข็มนาที
    const hourAngle = (hour * 360 / 12) + (minute * 360 / 12 / 60); // test 17.30 = 150 + 15 = 165
    const minuteAngle = minute * 360 / 60; // 30 * 360 / 60 = 180

    // console.log(hourAngle);
    // console.log(minuteAngle);
  
    // คำนวณองศาที่ต่างกันระหว่างเข็มชั่วโมงและเข็มนาที
    let angle = Math.abs(hourAngle - minuteAngle); // 165 - 180 = -15 abs to 15

    //console.log(angle);
  
    // หาองศาที่น้อยที่สุดระหว่าง 2 องศา
    if (angle > 180) {
      angle = 360 - angle;
    }
  
    return angle;
  }
  
  console.log("เวลา : 09:00 = " + getClockAngle("09:00") + " องศา"); // 90
  console.log("เวลา : 17:30 = " + getClockAngle("17:30") + " องศา"); // 15
  