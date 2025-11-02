// js/firebase-init.js

// ▼▼▼ 在这里粘贴你从Firebase官网复制的配置信息 ▼▼▼
const firebaseConfig = {
  apiKey: "AIzaSyBSWjQ-6EBh4jiIqAP1R3EsfGVtZyJ80ug",
  authDomain: "chinese-learning-game.firebaseapp.com",
  projectId: "chinese-learning-game",
  storageBucket: "chinese-learning-game.firebasestorage.app",
  messagingSenderId: "469409253035",
  appId: "1:469409253035:web:626f5ddf41ce62406dd9ee",
  measurementId: "G-V8DXNJDR41"
};
// ▲▲▲ 粘贴结束 ▲▲▲

// 初始化 Firebase 服务并设为全局变量
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();