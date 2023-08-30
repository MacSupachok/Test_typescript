
// เป็นฟังก์ชันหลักที่รับพารามิเตอร์ board ซึ่งเป็นออบเจ็กต์ที่มีสองสมาชิก: ladders และ snakes โดยแต่ละสมาชิกเป็นอาร์เรย์ของคู่หมายเลข (ที่บอกถึงตำแหน่งเริ่มต้นและตำแหน่งปลาย) ของบันไดและงูตามลำดับ.
function quickestPath(board: { ladders: [number, number][]; snakes: [number, number][]; }): number[] {

  //laddersMap และ snakesMap เป็นแผนที่ (Map) ที่ใช้เก็บข้อมูลของบันไดและงูที่อ่านจาก board
  const laddersMap = new Map(board.ladders);
  const snakesMap = new Map(board.snakes);

  let shortestPath: number[] = []; // เก็บเส้นทางที่สั้นที่สุด
  let minRolls = Infinity; // เก็บจำนวนการโยนลูกเต๋าที่น้อยที่สุดที่เจอ

  // เป็นฟังก์ชัน (Depth-First Search) ที่ใช้ในการค้นหาเส้นทางที่สั้นที่สุด
  function dfs(position: number, rolls: number[], visited: Set<number>): void {

    // position: ตำแหน่งปัจจุบันในการเคลื่อนที่ในเกม
    // rolls: อาร์เรย์ที่เก็บรายการการโยนลูกเต๋าในเส้นทางปัจจุบัน
    // visited: เซ็ตที่เก็บตำแหน่งที่เคยเข้าถึง

    if (position === 100) {
      // หากเราเดินไปถึงตำแหน่ง 100
      if (rolls.length < minRolls) {
        // ถ้าจำนวนการโยนลูกเต๋าในเส้นทางนี้น้อยกว่าเส้นทางที่เคยพบ
        minRolls = rolls.length; // อัพเดทจำนวนการโยนลูกเต๋าที่น้อยที่สุด
        shortestPath = [...rolls]; // อัพเดทเส้นทางที่สั้นที่สุด
      }
      return; // หยุดการค้นหา
    }

    if (rolls.length >= minRolls) {
      return; // หยุดการค้นหาถ้าจำนวนการโยนลูกเต๋ามากกว่าเส้นทางที่เคยพบ
    }

    // for เพื่อทดลองทุกกรณีการโยนลูกเต๋าที่เป็นไปได้ (1 ถึง 6)
    for (let roll = 1; roll <= 6; roll++) {
      const newPosition = position + roll;

      //newPosition ไม่เคยถูกเข้าถึงและอยู่ในขอบเขต 1-100 ก่อนที่จะเริ่มการค้นหาในทิศทางนั้น ๆ.
      if (!visited.has(newPosition) && newPosition <= 100) {
        visited.add(newPosition);

        if (laddersMap.has(newPosition)) {
          dfs(laddersMap.get(newPosition)!, [...rolls, roll], visited);
        } else if (snakesMap.has(newPosition)) {
          dfs(snakesMap.get(newPosition)!, [...rolls, roll], visited);
        } else {
          dfs(newPosition, [...rolls, roll], visited);
        }

        visited.delete(newPosition);
      }
    }
  }

  dfs(1, [], new Set<number>());
  return shortestPath;
}


// เงื่อนไข บันได และงู
const result = quickestPath({
  ladders: [[3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93]],
  snakes: [[21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66]]
});

console.log(result); 
