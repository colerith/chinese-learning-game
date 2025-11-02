document.addEventListener('DOMContentLoaded', () => {
    // --- DOM 元素 ---
    const questionDisplay = document.getElementById('grammar-question');
    const optionsContainer = document.getElementById('options-container');
    const scoreDisplay = document.getElementById('current-score');
    const questionCounterDisplay = document.getElementById('question-counter');
    const timeDisplay = document.getElementById('game-time');
    const progressBar = document.getElementById('progress-bar');
    const feedbackDisplay = document.getElementById('feedback');
    const restartBtn = document.getElementById('restart-btn');

    // --- 语法题库 (50题) ---
    const questionBank = [
        // 助词 "的", "吗", "呢", "了", "吧"
        { question: "这是我 [ ] 妈妈。", correctAnswer: "的", options: ["的", "吗", "呢"] },
        { question: "你是学生 [ ]？", correctAnswer: "吗", options: ["吗", "呢", "吧"] },
        { question: "我很好，你 [ ]？", correctAnswer: "呢", options: ["呢", "吗", "的"] },
        { question: "太贵 [ ]，便宜点儿吧。", correctAnswer: "了", options: ["了", "吗", "的"] },
        { question: "我们走 [ ]！", correctAnswer: "吧", options: ["吧", "吗", "呢"] },

        // 副词 "很", "太", "不", "也", "都"
        { question: "今天天气 [ ] 好。", correctAnswer: "很", options: ["很", "太", "都"] },
        { question: "这个苹果 [ ] 大了！", correctAnswer: "太", options: ["太", "很", "也"] },
        { question: "我 [ ] 是老师，我是学生。", correctAnswer: "不", options: ["不", "没", "都"] },
        { question: "他是留学生，我 [ ] 是留学生。", correctAnswer: "也", options: ["也", "都", "很"] },
        { question: "我们 [ ] 是中国人。", correctAnswer: "都", options: ["都", "也", "很"] },

        // 量词 (重点考察)
        { question: "我买一 [ ] 苹果。", correctAnswer: "斤", options: ["斤", "本", "件"] },
        { question: "他家有五 [ ] 人。", correctAnswer: "口", options: ["口", "个", "张"] },
        { question: "这是一 [ ] 汉语书。", correctAnswer: "本", options: ["本", "辆", "杯"] },
        { question: "那是一 [ ] 新车。", correctAnswer: "辆", options: ["辆", "件", "张"] },
        { question: "老师，我问您一 [ ] 问题。", correctAnswer: "个", options: ["个", "位", "本"] },
        { question: "这 [ ] 老师姓王。", correctAnswer: "位", options: ["位", "个", "名"] },
        { question: "我有一 [ ] 衣服是红色的。", correctAnswer: "件", options: ["件", "张", "辆"] },
        { question: "请给我一 [ ] 纸。", correctAnswer: "张", options: ["张", "本", "斤"] },
        { question: "我要喝一 [ ] 咖啡。", correctAnswer: "杯", options: ["杯", "碗", "口"] },
        { question: "食堂里，他吃了一 [ ] 米饭。", correctAnswer: "碗", options: ["碗", "杯", "斤"] },

        // 疑问代词 "谁", "什么", "哪儿", "几", "多少"
        { question: "[ ] 是你的老师？", correctAnswer: "谁", options: ["谁", "什么", "哪儿"] },
        { question: "你叫 [ ] 名字？", correctAnswer: "什么", options: ["什么", "谁", "几"] },
        { question: "你在 [ ] 学习汉语？", correctAnswer: "哪儿", options: ["哪儿", "什么", "谁"] },
        { question: "今天星期 [ ]？", correctAnswer: "几", options: ["几", "多少", "什么"] },
        { question: "你们公司有 [ ] 员工？", correctAnswer: "多少", options: ["多少", "几", "哪儿"] },

        // 动词/介词 "是", "在", "有", "去", "叫"
        { question: "我 [ ] 中国人。", correctAnswer: "是", options: ["是", "在", "有"] },
        { question: "我的书 [ ] 桌子上。", correctAnswer: "在", options: ["在", "是", "有"] },
        { question: "你 [ ] 哥哥吗？", correctAnswer: "有", options: ["有", "是", "在"] },
        { question: "我明天 [ ] 北京。", correctAnswer: "去", options: ["去", "在", "是"] },
        { question: "我 [ ] 玛丽。", correctAnswer: "叫", options: ["叫", "姓", "是"] },

        // 综合与易混淆
        { question: "你吃饭了 [ ]？", correctAnswer: "吗", options: ["吗", "没有", "不"] },
        { question: "你吃饭了 [ ]？", correctAnswer: "没有", options: ["没有", "不", "吗"] },
        { question: "你 [ ] 英国人还是美国人？", correctAnswer: "是", options: ["是", "在", "有"] },
        { question: "我没有自行车，他 [ ] 没有。", correctAnswer: "也", options: ["也", "都", "和"] },
        { question: "苹果和香蕉，我 [ ] 喜欢吃。", correctAnswer: "都", options: ["都", "也", "还"] },
        { question: "你的车是新的 [ ] 旧的？", correctAnswer: "还是", options: ["还是", "或者", "和"] },
        { question: "图书馆里 [ ] 人。", correctAnswer: "没有", options: ["没有", "不有", "不是"] },
        { question: "我 [ ] 学习汉语，[ ] 学习英语。", correctAnswer: "不但...而且...", options: ["不但...而且...", "因为...所以...", "虽然...但是..."] }, // 假设已学
        { question: "他 [ ] 家看书呢。", correctAnswer: "在", options: ["在", "去", "是"] },
        { question: "我认识 [ ] 位老师。", correctAnswer: "这", options: ["这", "那", "哪"] },
        
        // 更多量词练习
        { question: "我买了一 [ ] 笔。", correctAnswer: "支", options: ["支", "张", "本"] },
        { question: "那 [ ] 医院很大。", correctAnswer: "家", options: ["家", "个", "所"] },
        { question: "我有一 [ ] 雨伞。", correctAnswer: "把", options: ["把", "件", "支"] },
        { question: "他有两个 [ ]。", correctAnswer: "弟弟", options: ["弟弟", "口人", "朋友们"] },
        { question: "我要两 [ ] 馒头。", correctAnswer: "个", options: ["个", "碗", "斤"] },
        { question: "一共有二十 [ ] 钱。", correctAnswer: "块", options: ["块", "元", "人民币"] }, // “块”更口语化
        { question: "他不 [ ] 忙，我也不 [ ] 忙。", correctAnswer: "太", options: ["太", "很", "都"] },
        { question: "你 [ ] 谁啊？", correctAnswer: "找", options: ["找", "是", "看"] },
        { question: "我 [ ] 朋友一起去商店。", correctAnswer: "和", options: ["和", "也", "都"] },
        { question: "我们班 [ ] 二十多个学生。", correctAnswer: "有", options: ["有", "是", "在"] }
    ];

    // --- 游戏状态 ---
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let secondsElapsed = 0;

    // --- 函数 ---
    function startGame() {
        score = 0;
        currentQuestionIndex = 0;
        secondsElapsed = 0;
        feedbackDisplay.innerHTML = '<p>请做出你的选择！</p>';
        restartBtn.style.display = 'none';

        currentQuestions = [...questionBank].sort(() => 0.5 - Math.random()).slice(0, 10);

        updateScore();
        startTimer();
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < currentQuestions.length) {
            const q = currentQuestions[currentQuestionIndex];
            questionDisplay.innerHTML = q.question.replace('[ ]', '<span style="color: #4299e1; font-weight: bold;">[ ___ ]</span>');
            optionsContainer.innerHTML = '';

            const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());

            shuffledOptions.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('option-btn');
                button.addEventListener('click', () => handleOptionClick(button, option, q.correctAnswer));
                optionsContainer.appendChild(button);
            });
            updateProgress();
        } else {
            endGame();
        }
    }

    function handleOptionClick(button, selectedOption, correctOption) {
        document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

        if (selectedOption === correctOption) {
            score += 10;
            button.classList.add('correct');
            feedbackDisplay.innerHTML = '<p style="color: #38a169;">回答正确！</p>';
        } else {
            button.classList.add('incorrect');
            feedbackDisplay.innerHTML = `<p style="color: #c53030;">回答错误。正确答案是：<strong style="font-size: 1.2em;">${correctOption}</strong></p>`;
            document.querySelectorAll('.option-btn').forEach(btn => {
                if (btn.textContent === correctOption) {
                    btn.classList.add('correct');
                }
            });
        }
        updateScore();
        
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 2000);
    }

    function updateScore() {
        scoreDisplay.textContent = score;
    }

    function updateProgress() {
        questionCounterDisplay.textContent = `${currentQuestionIndex + 1} / ${currentQuestions.length}`;
        progressBar.style.width = `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`;
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            secondsElapsed++;
            timeDisplay.textContent = `${secondsElapsed}s`;
        }, 1000);
    }

    function endGame() {
        clearInterval(timer);
        questionDisplay.textContent = '游戏结束！ (Game Over!)';
        optionsContainer.innerHTML = '';
        feedbackDisplay.innerHTML = `<h3><span class="chinese">你的最终得分是：</span><span class="english">Your final score is:</span> ${score}</h3>`;
        restartBtn.style.display = 'block';
    }

    // --- 事件监听 ---
    restartBtn.addEventListener('click', startGame);

    // --- 游戏初始化 ---
    startGame();
});