// XOR暗号化・複合化関数
export function xorEncryptDecrypt(text: string, key: string): string {
  if (!key) return "";
  let result = "";
  const keyLength = key.length;
  for (let i = 0; i < text.length; i++) {

    // 日本語の文字コードに対応するため、UTF-16を使用
    // 暗号化する平文の文字コードを1文字分取得
    const textCharCode = text.charCodeAt(i);

    // 鍵文字の長さに応じて、鍵文字の文字コードを取得
    // 鍵文字が短い場合は、繰り返し使用する
    // 例: 鍵文字が "abc" の場合、i=0なら 'a', i=1なら 'b', i=2なら 'c', i=3なら 'a' となる
    const keyCharCode = key.charCodeAt(i % keyLength);

    // 平文を鍵文字とXORビット演算し、暗号化する
    const xorCharCode = textCharCode ^ keyCharCode;

    // XOR演算の結果を文字コードに変換し、結果に追加
    result += String.fromCharCode(xorCharCode);
  }
  return result;
}
