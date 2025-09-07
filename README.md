# simple-unicode-caesar

## 1. 概要

このプロジェクトは、文字コード（UTF-16）と鍵文字列のXOR演算を利用した、単純な単一換字式暗号（教育用）のサンプルウェブアプリです。鍵文字列を繰り返し使い、各文字の文字コードを鍵文字の文字コードとXORして暗号化／復号を行います。

特徴:
- アルゴリズム（規則）: 鍵の文字列長ごとに平文を区切り、対応する鍵文字の文字コードと平文文字コードを XOR する
- 鍵: 任意の文字列（短ければ繰り返し使用される）
- 実装言語: TypeScript / Next.js

**注意**: 本リポジトリの実装は教育・学習目的のサンプルです。実運用や機密情報の保護には絶対に使用しないでください。反復鍵を用いたXORは解析が容易であり、安全性を提供しません。

![アプリイメージ](./img/image.png)

## 2. Getting Started

アプリの起動方法:

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。`app/page.tsx` を編集すると、ページが自動で更新されます。


## 3. 実装と暗号化例

以下は暗号化／復号で使う関数です（`src/utils/xorEncryptDecrypt.ts` に実装しています）。

```typescript
// XOR暗号化・複合化関数
export function xorEncryptDecrypt(text: string, key: string): string {
	if (!key) return "";
	let result = "";
	const keyLength = key.length;
	for (let i = 0; i < text.length; i++) {
		// UTF-16 の文字コードを使用
		const textCharCode = text.charCodeAt(i);
		const keyCharCode = key.charCodeAt(i % keyLength);
		const xorCharCode = textCharCode ^ keyCharCode;
		result += String.fromCharCode(xorCharCode);
	}
	return result;
}
```

この関数は同じ `key` を用いてもう一度実行すると復号（元に戻す）ことができます。

---

### 3.1. 実行例

以下は本リポジトリのサンプル画面で出力される例の一部です。表示は環境やフォントにより変化します。

#### 3.1.1. 例 1 — 宮沢賢治（詩の一節）を暗号化

平文:
```
雨ニモマケズ
風ニモマケズ
```

鍵:
```
銀河鉄道の夜
```

暗号（例）:
```
Ѩ屸ꊦꂍß榦銊ꊏꂱ°榭ꈺ
```

鍵文字列の繰り返しに従って各文字がXOR演算されるため、出力は一見意味を持たない文字列になります。同じ鍵で復号すると元に戻ります。

#### 3.1.2. 例 2 — 反復鍵XORの脆弱性を確認

平文:
```
AAAAAAAAAAA
```

鍵:
```
abracadabra
```

暗号（例）:
```
 #3 " % #3 
```

鍵が繰り返し利用され、平文に偏りがある場合、頻度解析や既知平文攻撃で解析が容易になります。これが単一換字式暗号（および反復鍵XOR）が実運用に向かない理由の一つです。

