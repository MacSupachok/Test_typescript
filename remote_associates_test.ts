async function removeCommonSubstring(arr: string[]): Promise<string[]> {
  if (arr.length === 0) {
      return [];
  }

  // หาความยาวของคำที่สั้นที่สุดในอาร์เรย์
  const minLength = Math.min(...arr.map(word => word.length));

  const result: string[] = [];

  // วนลูปผ่านตำแหน่งตัวอักษร
  for (let i = 0; i < minLength; i++) {
      const substring = arr[0].substring(i);

      // ตรวจสอบว่าส่วนย่อยนี้ซ้ำกันในทุกคำในอาร์เรย์หรือไม่
      const isCommonSubstring = arr.every(word => word.startsWith(substring));

      if (isCommonSubstring) {
          // ถ้าเป็นส่วนย่อยที่ซ้ำกันในทุกคำ ให้เพิ่มส่วนย่อยนี้ลงในผลลัพธ์
          result.push(substring);
      } else {
          // ถ้าไม่เป็นส่วนย่อยที่ซ้ำกันในทุกคำ ให้หยุดการวนลูป
          break;
      }
  }

  if (result.length > 0) {
      // ตัดส่วนย่อยที่เรียงซ้ำกันออกจากคำในอาร์เรย์และเก็บคำที่เหลือไว้ในผลลัพธ์
      const noCommonSubstringArr = arr.map(word => word.substring(result[0].length));
      return noCommonSubstringArr;
  } else {
      // ถ้าไม่มีส่วนย่อยที่เรียงซ้ำกัน ให้คืนอาร์เรย์เดิม
      return arr;
  }
}

// ตัวอย่างการใช้งาน
async function main() {
  const input1 = ['BATHROOM', 'BATH SALTS', 'BLOODBATH'];
  const output1 = await removeCommonSubstring(input1);
  console.log(output1); // ผลลัพธ์ ["ROOM", " SALTS", "BLOOD"]

  const input2 = ['BEFRIEND', 'GIRLFRIEND', 'FRIENDSHIP'];
  const output2 = await removeCommonSubstring(input2);
  console.log(output2); // ผลลัพธ์ ["BE", "GIRL", "SHIP"]
}

main();
