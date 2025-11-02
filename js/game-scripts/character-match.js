// 基于《汉语教程》1-15课的100个汉字/词语配对题库
const lessonVocabData = [
  // 第一课-第三课基础词汇
  { char: "你", meaning: "you (singular)" },
  { char: "好", meaning: "good; fine" },
  { char: "你好", meaning: "Hello! How are you?" },
  { char: "一", meaning: "one" },
  { char: "五", meaning: "five" },
  { char: "八", meaning: "eight" },
  { char: "大", meaning: "big" },
  { char: "不", meaning: "not" },
  { char: "口", meaning: "mouth; a measure word" },
  { char: "白", meaning: "white" },
  { char: "女", meaning: "female" },
  { char: "马", meaning: "horse" },
  { char: "妈妈", meaning: "mum" },
  { char: "爸爸", meaning: "dad" },
  { char: "哥哥", meaning: "elder brother" },
  { char: "弟弟", meaning: "younger brother" },
  { char: "妹妹", meaning: "younger sister" },
  { char: "老师", meaning: "teacher" },
  { char: "学生", meaning: "student" },
  
  // 第四课-第六课日常词汇
  { char: "今天", meaning: "today" },
  { char: "昨天", meaning: "yesterday" },
  { char: "明天", meaning: "tomorrow" },
  { char: "星期一", meaning: "Monday" },
  { char: "星期二", meaning: "Tuesday" },
  { char: "星期三", meaning: "Wednesday" },
  { char: "星期四", meaning: "Thursday" },
  { char: "星期五", meaning: "Friday" },
  { char: "星期六", meaning: "Saturday" },
  { char: "星期天", meaning: "Sunday" },
  { char: "学校", meaning: "school" },
  { char: "图书馆", meaning: "library" },
  { char: "办公室", meaning: "office" },
  { char: "银行", meaning: "bank" },
  { char: "邮局", meaning: "post office" },
  { char: "天安门", meaning: "Tian'anmen" },
  { char: "回家", meaning: "to go back home" },
  { char: "去学校", meaning: "to go to school" },
  { char: "打电话", meaning: "to make a call" },
  { char: "寄信", meaning: "to post a letter" },
  { char: "取钱", meaning: "to draw money" },
  
  // 第七课-第九课生活词汇
  { char: "中午", meaning: "noon" },
  { char: "吃饭", meaning: "to eat a meal" },
  { char: "米饭", meaning: "cooked rice" },
  { char: "馒头", meaning: "steamed bun" },
  { char: "包子", meaning: "steamed stuffed bun" },
  { char: "饺子", meaning: "dumpling" },
  { char: "面条儿", meaning: "noodles" },
  { char: "鸡蛋", meaning: "egg" },
  { char: "鸡蛋汤", meaning: "egg soup" },
  { char: "啤酒", meaning: "beer" },
  { char: "茶", meaning: "tea" },
  { char: "咖啡", meaning: "coffee" },
  { char: "牛奶", meaning: "milk" },
  { char: "酸奶", meaning: "yogurt" },
  { char: "食堂", meaning: "dining hall" },
  { char: "水果", meaning: "fruit" },
  { char: "苹果", meaning: "apple" },
  { char: "橘子", meaning: "tangerine" },
  { char: "香蕉", meaning: "banana" },
  { char: "葡萄", meaning: "grape" },
  { char: "西瓜", meaning: "watermelon" },
  
  // 第十课-第十二课交际词汇
  { char: "请问", meaning: "excuse me" },
  { char: "贵姓", meaning: "your family name" },
  { char: "名字", meaning: "name" },
  { char: "哪国人", meaning: "which country are you from" },
  { char: "中国人", meaning: "Chinese person" },
  { char: "美国人", meaning: "American person" },
  { char: "韩国人", meaning: "Korean person" },
  { char: "日本人", meaning: "Japanese person" },
  { char: "英国人", meaning: "British person" },
  { char: "德国人", meaning: "German person" },
  { char: "认识", meaning: "to know" },
  { char: "高兴", meaning: "glad; happy" },
  { char: "认识你很高兴", meaning: "Nice to meet you" },
  { char: "谢谢", meaning: "to thank" },
  { char: "不客气", meaning: "you're welcome" },
  { char: "对不起", meaning: "I'm sorry" },
  { char: "没关系", meaning: "it doesn't matter" },
  { char: "电话", meaning: "telephone" },
  { char: "电话号码", meaning: "phone number" },
  { char: "手机", meaning: "mobile phone" },
  
  // 第十三课-第十五课拓展词汇
  { char: "语言", meaning: "language" },
  { char: "汉语", meaning: "Chinese (language)" },
  { char: "英语", meaning: "English (language)" },
  { char: "法语", meaning: "French (language)" },
  { char: "日语", meaning: "Japanese (language)" },
  { char: "韩国语", meaning: "Korean (language)" },
  { char: "语法", meaning: "grammar" },
  { char: "发音", meaning: "pronunciation" },
  { char: "汉字", meaning: "Chinese characters" },
  { char: "读书", meaning: "to read a book" },
  { char: "写字", meaning: "to write characters" },
  { char: "说话", meaning: "to speak; to talk" },
  { char: "听力", meaning: "listening comprehension" },
  { char: "留学生", meaning: "international student" },
  { char: "同学", meaning: "classmate" },
  { char: "同屋", meaning: "roommate" },
  { char: "教授", meaning: "professor" },
  { char: "经理", meaning: "manager" },
  { char: "医生", meaning: "doctor" },
  { char: "护士", meaning: "nurse" }
  // 共100个词汇
];

// 游戏全局变量
let gameData = [];          // 存储当前游戏的40个元素（20对）
let selectedCards = [];     // 存储选中的卡片
let matchedPairs = 0;       // 已匹配的对数
let score = 0;              // 当前得分
let gameTime = 0;           // 游戏时间
let timerInterval = null;   // 计时器
let isProcessing = false;   // 是否正在处理匹配
let hintCount = 3;          // 提示次数

// 初始化游戏
function initGame() {
    // 重置游戏状态
    resetGameState();
    
    // 从100个词汇中随机选择20对
    const shuffledVocab = [...lessonVocabData].sort(() => Math.random() - 0.5).slice(0, 20);
    
    // 构建游戏数据：每个词汇包含汉字和释义两个卡片
    shuffledVocab.forEach(item => {
        gameData.push({
            id: `char-${item.char}`,
            content: item.char,
            type: 'character',
            pairId: `mean-${item.char}`
        });
        gameData.push({
            id: `mean-${item.char}`,
            content: item.meaning,
            type: 'meaning',
            pairId: `char-${item.char}`
        });
    });
    
    // 打乱游戏卡片顺序
    gameData.sort(() => Math.random() - 0.5);
    
    // 渲染游戏面板（修复错位问题）
    renderGameBoard();
    
    // 开始计时
    startTimer();
}

// 重置游戏状态
function resetGameState() {
    gameData = [];
    selectedCards = [];
    matchedPairs = 0;
    score = 0;
    gameTime = 0;
    isProcessing = false;
    hintCount = 3;
    
    // 清空游戏面板
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    
    // 重置UI显示
    document.getElementById('current-score').textContent = '0';
    document.getElementById('completed-count').textContent = '0';
    document.getElementById('game-time').textContent = '0';
    document.getElementById('progress-bar').style.width = '0%';
    updateFeedback(
        "点击选择一个汉字/词语，再点击对应的英文释义进行配对",
        "Click to select a Chinese character/word, then click its corresponding English meaning to match them"
    );
    
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('hint-btn').style.display = 'block';
    
    // 清除计时器
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

// 渲染游戏面板（修复错位问题）
function renderGameBoard() {
    const gameBoard = document.getElementById('game-board');
    // 确保游戏面板为空
    gameBoard.innerHTML = '';
    
    gameData.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.id = card.id;
        cardElement.textContent = card.content;
        cardElement.dataset.type = card.type;
        cardElement.dataset.pairId = card.pairId;
        
        // 添加点击事件
        cardElement.addEventListener('click', () => handleCardClick(cardElement));
        
        gameBoard.appendChild(cardElement);
    });
}

// 处理卡片点击
function handleCardClick(card) {
    // 如果正在处理匹配或卡片已匹配，则忽略点击
    if (isProcessing || card.classList.contains('matched') || selectedCards.includes(card)) {
        return;
    }
    
    // 如果已经选择了两个卡片，则重置选择
    if (selectedCards.length === 2) {
        resetCardSelection();
    }
    
    // 选中当前卡片
    card.classList.add('selected');
    selectedCards.push(card);
    
    // 如果选中了两个卡片，检查是否匹配
    if (selectedCards.length === 2) {
        checkMatch();
    }
}

// 检查两个选中的卡片是否匹配
function checkMatch() {
    isProcessing = true;
    const [card1, card2] = selectedCards;
    
    // 检查是否是一对匹配（一个汉字和一个对应的释义）
    if (card1.dataset.pairId === card2.id && 
        card1.dataset.type !== card2.dataset.type) {
        
        // 匹配成功
        setTimeout(() => {
            // 添加匹配成功样式
            card1.classList.remove('selected');
            card2.classList.remove('selected');
            card1.classList.add('matched');
            card2.classList.add('matched');
            
            // 绘制连接线
            drawConnectionLine(card1, card2);
            
            // 更新游戏状态
            matchedPairs++;
            score += 10; // 每对10分，20对共200分
            
            // 更新UI
            document.getElementById('current-score').textContent = score;
            document.getElementById('completed-count').textContent = matchedPairs;
            document.getElementById('progress-bar').style.width = `${(matchedPairs / 20) * 100}%`;
            
            // 显示成功反馈
            updateFeedback(
                `正确！"${card1.textContent}" 匹配 "${card2.textContent}"`,
                `Correct! "${card1.textContent}" matches "${card2.textContent}"`
            );
            
            // 清空选择
            selectedCards = [];
            isProcessing = false;
            
            // 检查游戏是否结束
            checkGameCompletion();
        }, 500);
    } else {
        // 匹配失败
        setTimeout(() => {
            // 移除选中样式
            card1.classList.remove('selected');
            card2.classList.remove('selected');
            
            // 显示失败反馈
            updateFeedback(
                "匹配错误，请重新尝试",
                "Incorrect match, please try again"
            );
            
            // 清空选择
            selectedCards = [];
            isProcessing = false;
        }, 800);
    }
}

// 绘制连接线
function drawConnectionLine(card1, card2) {
    // 获取两个卡片的位置信息
    const rect1 = card1.getBoundingClientRect();
    const rect2 = card2.getBoundingClientRect();
    const boardRect = document.getElementById('game-board').getBoundingClientRect();
    
    // 计算相对位置（修复连线错位）
    const x1 = rect1.left + rect1.width / 2 - boardRect.left;
    const y1 = rect1.top + rect1.height / 2 - boardRect.top;
    const x2 = rect2.left + rect2.width / 2 - boardRect.left;
    const y2 = rect2.top + rect2.height / 2 - boardRect.top;
    
    // 计算线的长度和角度
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    // 创建线元素
    const line = document.createElement('div');
    line.className = 'connection-line';
    line.style.width = `${length}px`;
    line.style.height = '4px';
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    // 添加到游戏面板
    document.getElementById('game-board').appendChild(line);
    
    // 300毫秒后淡出线条
    setTimeout(() => {
        line.style.opacity = '0';
        line.style.transition = 'opacity 0.5s ease';
        
        // 完全淡出后移除线条
        setTimeout(() => {
            line.remove();
        }, 500);
    }, 300);
}

// 重置卡片选择状态
function resetCardSelection() {
    selectedCards.forEach(card => {
        card.classList.remove('selected');
    });
    selectedCards = [];
}

// 开始计时器
function startTimer() {
    timerInterval = setInterval(() => {
        gameTime++;
        document.getElementById('game-time').textContent = gameTime;
    }, 1000);
}

// 检查游戏是否完成
function checkGameCompletion() {
    if (matchedPairs === 20) {
        clearInterval(timerInterval);
        
        // 显示完成信息
        const accuracy = 100;
        let feedbackZh, feedbackEn;
        
        if (accuracy === 100) {
            feedbackZh = `恭喜！全部匹配完成！得分${score}/200，用时${gameTime}秒，正确率100%！`;
            feedbackEn = `Congratulations! All pairs matched! Score ${score}/200, Time ${gameTime} seconds, Accuracy 100%!`;
        }
        
        updateFeedback(feedbackZh, feedbackEn);
        document.getElementById('restart-btn').style.display = 'block';
        document.getElementById('hint-btn').style.display = 'none';
        
        // 记录成绩
        recordScore('汉字连连看', score, gameTime);
    }
}

// 更新反馈信息（中英对照）
function updateFeedback(chineseText, englishText) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerHTML = `
        <div class="bilingual">
            <p class="chinese">${chineseText}</p>
            <p class="english">${englishText}</p>
        </div>
    `;
    
    // 根据不同类型的反馈设置不同背景色
    if (chineseText.includes('正确') || chineseText.includes('恭喜')) {
        feedbackElement.style.backgroundColor = '#f0fff4';
        feedbackElement.style.borderLeftColor = '#52c41a';
    } else if (chineseText.includes('错误')) {
        feedbackElement.style.backgroundColor = '#fff1f0';
        feedbackElement.style.borderLeftColor = '#e53e3e';
    } else {
        feedbackElement.style.backgroundColor = '#f0f9ff';
        feedbackElement.style.borderLeftColor = '#2b6cb0';
    }
}

// 提示功能
function showHint() {
    if (hintCount <= 0) {
        updateFeedback(
            "抱歉，您的提示次数已用完",
            "Sorry, you have used up all your hints"
        );
        return;
    }
    
    // 找到一对未匹配的卡片
    const unmatchedCards = document.querySelectorAll('.card:not(.matched)');
    if (unmatchedCards.length < 2) return;
    
    // 随机选择一对未匹配的卡片
    let pairFound = false;
    let i = 0;
    
    while (!pairFound && i < unmatchedCards.length) {
        const card = unmatchedCards[i];
        const pairCard = document.getElementById(card.dataset.pairId);
        
        if (pairCard && !pairCard.classList.contains('matched')) {
            // 高亮提示这对卡片
            card.style.boxShadow = '0 0 0 2px #faad14, 0 0 10px #faad14';
            pairCard.style.boxShadow = '0 0 0 2px #faad14, 0 0 10px #faad14';
            
            // 3秒后取消高亮
            setTimeout(() => {
                card.style.boxShadow = '';
                pairCard.style.boxShadow = '';
            }, 3000);
            
            pairFound = true;
            hintCount--;
            updateFeedback(
                `提示：这两个卡片可能匹配（剩余提示：${hintCount}次）`,
                `Hint: These two cards may match (Remaining hints: ${hintCount})`
            );
        }
        
        i++;
    }
}

// 事件监听
document.getElementById('restart-btn').addEventListener('click', initGame);
document.getElementById('hint-btn').addEventListener('click', showHint);

// 页面加载时初始化游戏
window.addEventListener('DOMContentLoaded', () => {
    // 检查用户是否已登录
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('请先登录后再开始游戏！\nPlease log in to start the game!');
        window.location.href = '../login.html';
        return;
    }
    
    // 初始化游戏
    initGame();
});