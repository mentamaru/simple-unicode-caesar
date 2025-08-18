

"use client";
import { useState } from "react";
import { xorEncryptDecrypt } from "../utils/xorEncryptDecrypt";

export default function Home() {
  const [key, setKey] = useState("");
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  // XOR暗号化・複合化関数をutilsからインポート

  // テキストを処理
  const processText = () => {
    if (!inputText) {
      setErrorMessage("テキストを入力してください");
      return;
    }
    if (!key) {
      setErrorMessage("鍵文字を入力してください");
      return;
    }
    setErrorMessage(""); // Clear error before processing
    const processedText = xorEncryptDecrypt(inputText, key);
    setResultText(processedText);
  };

  // 結果をクリップボードにコピー
  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultText).then(
      () => {
        setCopyMessage("結果をクリップボードにコピーしました！");
        setTimeout(() => setCopyMessage(""), 2000);
      },
      (err) => {
        setCopyMessage("コピーに失敗しました: " + err);
        setTimeout(() => setCopyMessage(""), 3000);
      }
    );
  };

  const swapTextAndResult = () => {
    const temp = inputText;
    setInputText(resultText);
    setResultText(temp);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6f8fa",
      fontFamily: "'Inter', 'Noto Sans JP', Arial, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        background: "#fff",
        borderRadius: "18px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        padding: "32px 20px",
        margin: "32px 0"
      }}>
        <h1 style={{
          fontSize: "1.7rem",
          fontWeight: 700,
          marginBottom: "10px",
          textAlign: "center",
          color: "#2563eb",
          letterSpacing: "-0.02em"
        }}>
          文字コード シーザー暗号生成ツール <span style={{ fontSize: "1rem", fontWeight: 400, color: "#64748b" }}>(XORベース)</span>
        </h1>
        <div style={{
          textAlign: "center",
          color: "#64748b",
          fontSize: "0.98rem",
          marginBottom: "22px"
        }}>
          入力したテキストと鍵文字を使って、文字コードを鍵文字をXOR演算で暗号化・複合化ができるツールです。<br />
        </div>
        {errorMessage && (
          <div style={{
            color: "#ef4444",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "7px",
            padding: "10px",
            marginBottom: "18px",
            textAlign: "center",
            fontWeight: 500
          }}>
            {errorMessage}
          </div>
        )}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="key-input" style={{ fontWeight: 500, display: "block", marginBottom: "6px", color: "#334155" }}>
            鍵文字（最大1000文字）
          </label>
          <textarea
            id="key-input"
            maxLength={1000}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            rows={2}
            style={{
              padding: "9px",
              width: "100%",
              borderRadius: "7px",
              border: "1px solid #e2e8f0",
              fontSize: "1rem",
              boxSizing: "border-box",
              resize: "none",
              minHeight: "40px",
              background: "#f8fafc"
            }}
            placeholder="ここに鍵文字列を入力してください"
          />
          <button
            onClick={() => setKey("")}
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "8px 0",
              backgroundColor: "#f3f4f6",
              color: "#334155",
              border: "1px solid #e2e8f0",
              borderRadius: "7px",
              fontWeight: 500,
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s"
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
          >
            クリア
          </button>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="text-input" style={{ fontWeight: 500, display: "block", marginBottom: "6px", color: "#334155" }}>
            テキスト（最大1000文字）
          </label>
          <textarea
            id="text-input"
            maxLength={1000}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
            style={{
              padding: "9px",
              width: "100%",
              borderRadius: "7px",
              border: "1px solid #e2e8f0",
              fontSize: "1rem",
              boxSizing: "border-box",
              resize: "vertical",
              minHeight: "70px",
              background: "#f8fafc"
            }}
            placeholder="ここに暗号化・複合化したいテキストを入力してください"
          />
          <button
            onClick={() => setInputText("")}
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "8px 0",
              backgroundColor: "#f3f4f6",
              color: "#334155",
              border: "1px solid #e2e8f0",
              borderRadius: "7px",
              fontWeight: 500,
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s"
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
          >
            クリア
          </button>
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={processText}
            style={{
              flex: 1,
              padding: "11px 0",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "7px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(37,99,235,0.07)",
              letterSpacing: "0.01em"
            }}
          >
            実行
          </button>
          <button
            onClick={swapTextAndResult}
            style={{
              flex: 1,
              padding: "11px 0",
              backgroundColor: "#64748b",
              color: "#fff",
              border: "none",
              borderRadius: "7px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(100,116,139,0.07)",
              letterSpacing: "0.01em"
            }}
          >
            テキストと結果を入れ替え
          </button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="result-textarea" style={{ fontWeight: 500, display: "block", marginBottom: "6px", color: "#334155" }}>
            結果
          </label>
          <textarea
            id="result-textarea"
            value={resultText}
            readOnly
            rows={5}
            style={{
              padding: "9px",
              width: "100%",
              borderRadius: "7px",
              border: "1px solid #e2e8f0",
              fontSize: "1rem",
              backgroundColor: "#f8fafc",
              boxSizing: "border-box",
              resize: "vertical",
              minHeight: "70px"
            }}
            placeholder="ここに結果が表示されます"
          />
        </div>
        <button
          onClick={copyToClipboard}
        >
        </button>
        {copyMessage && (
          <div style={{
            color: "#16a34a",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "7px",
            padding: "10px",
            marginBottom: "8px",
            textAlign: "center",
            fontWeight: 500,
            transition: "opacity 0.3s"
          }}>
            {copyMessage}
          </div>
        )}
        <button
          onClick={copyToClipboard}
          style={{
            width: "100%",
            padding: "11px 0",
            backgroundColor: "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: "7px",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            marginTop: "6px",
            boxShadow: "0 1px 4px rgba(34,197,94,0.07)",
            letterSpacing: "0.01em"
          }}
        >
          結果をクリップボードにコピー
        </button>
      </div>
    </div>
  );
}
