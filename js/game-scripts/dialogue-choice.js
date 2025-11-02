document.addEventListener('DOMContentLoaded', () => {
    // --- DOM 元素 ---
    const questionDisplay = document.getElementById('dialogue-question');
    const optionsContainer = document.getElementById('options-container');
    const scoreDisplay = document.getElementById('current-score');
    const questionCounterDisplay = document.getElementById('question-counter');
    const timeDisplay = document.getElementById('game-time');
    const progressBar = document.getElementById('progress-bar');
    const feedbackDisplay = document.getElementById('feedback');
    const restartBtn = document.getElementById('restart-btn');

    // --- 扩充后的丰富对话题库 (总计45题) ---
    const questionBank = [
        // --- 原始25题 ---
        {
            question: "A: 你好！",
            correctAnswer: "B: 你好！",
            options: ["B: 你好！", "B: 再见。", "B: 谢谢。"]
        },
        {
            question: "A: 对不起。",
            correctAnswer: "B: 没关系。",
            options: ["B: 没关系。", "B: 谢谢你。", "B: 不客气。"]
        },
        {
            question: "A: 苹果一斤多少钱？",
            correctAnswer: "B: 六块。",
            options: ["B: 六块。", "B: 太贵了。", "B: 五个苹果。"]
        },
        {
            question: "A: 你要几个苹果？ (量词考察)",
            correctAnswer: "B: 我要三个。",
            options: ["B: 我要三个。", "B: 我要三斤。", "B: 我要三辆。"]
        },
        {
            question: "A: 你家有几口人？ (量词考察)",
            correctAnswer: "B: 我家有四口人。",
            options: ["B: 我家有四口人。", "B: 我家有四个人。", "B: 我家在北京。"]
        },
        {
            question: "A: 这位是王老师。",
            correctAnswer: "B: 王老师，您好！",
            options: ["B: 王老师，您好！", "B: 他是王老师。", "B: 我不认识他。"]
        },
        {
            question: "A: 你去哪儿？",
            correctAnswer: "B: 我去银行取钱。",
            options: ["B: 我去银行取钱。", "B: 我是学生。", "B: 今天星期三。"]
        },
        {
            question: "A: 你的汉语老师是哪国人？",
            correctAnswer: "B: 他是中国人。",
            options: ["B: 他是中国人。", "B: 他是汉语老师。", "B: 他是男的。"]
        },
        {
            question: "A: 请问，这是你的书吗？ (量词考察)",
            correctAnswer: "B: 对，这是我的一本书。",
            options: ["B: 对，这是我的一本书。", "B: 对，这是我的一个书。", "B: 这本书很好。"]
        },
        {
            question: "A: 你喝茶还是喝咖啡？",
            correctAnswer: "B: 我喝茶，谢谢。",
            options: ["B: 我喝茶，谢谢。", "B: 是的，我喝。", "B: 我不忙。"]
        },
        {
            question: "A: 你的车是什么颜色的？",
            correctAnswer: "B: 我的车是蓝色的。",
            options: ["B: 我的车是蓝色的。", "B: 我的车很新。", "B: 这是一辆车。"]
        },
        {
            question: "A: 今天星期几？",
            correctAnswer: "B: 今天星期五。",
            options: ["B: 今天星期五。", "B: 今天很忙。", "B: 明天见。"]
        },
        {
            question: "A: 你会说汉语吗？",
            correctAnswer: "B: 我会说一点儿。",
            options: ["B: 我会说一点儿。", "B: 汉语不太难。", "B: 我是学生。"]
        },
        {
            question: "A: 你学习什么？",
            correctAnswer: "B: 我学习汉语。",
            options: ["B: 我学习汉语。", "B: 我学习很好。", "B: 我在北京学习。"]
        },
        {
            question: "A: 认识你很高兴。",
            correctAnswer: "B: 认识你我也很高兴。",
            options: ["B: 认识你我也很高兴。", "B: 不客气。", "B: 没关系。"]
        },
        {
            question: "A: 王老师在吗？",
            correctAnswer: "B: 他不在，他在家呢。",
            options: ["B: 他不在，他在家呢。", "B: 是，他是王老师。", "B: 王老师很好。"]
        },
        {
            question: "A: 你要买几本书？ (量词考察)",
            correctAnswer: "B: 我买两本书。",
            options: ["B: 我买两本书。", "B: 我买两个书。", "B: 我买两件书。"]
        },
        {
            question: "A: 先生，您换什么钱？",
            correctAnswer: "B: 我换人民币。",
            options: ["B: 我换人民币。", "B: 我换一百。", "B: 我去银行。"]
        },
        {
            question: "A: 那辆自行车是你的吗？ (量词考察)",
            correctAnswer: "B: 不是，那辆是老师的。",
            options: ["B: 不是，那辆是老师的。", "B: 不是，那个是老师的。", "B: 我的车是新的。"]
        },
        {
            question: "A: 你的同学是哪国人？",
            correctAnswer: "B: 他是美国人。",
            options: ["B: 他是美国人。", "B: 他是留学生。", "B: 他是我的同学。"]
        },
        {
            question: "A: 你妈妈做什么工作？",
            correctAnswer: "B: 她是医生。",
            options: ["B: 她是医生。", "B: 她在医院。", "B: 她工作很忙。"]
        },
        {
            question: "A: 食堂在哪儿？",
            correctAnswer: "B: 在那儿，教学楼的旁边。",
            options: ["B: 在那儿，教学楼的旁边。", "B: 我们去食堂吃饭。", "B: 食堂的饭很好吃。"]
        },
        {
            question: "A: 你觉得语法难吗？",
            correctAnswer: "B: 我觉得语法不太难，听和说比较容易。",
            options: ["B: 我觉得语法不太难，听和说比较容易。", "B: 我不学习语法。", "B: 是的，我喜欢语法。"]
        },
        {
            question: "A: 这件衣服多少钱？ (量词考察)",
            correctAnswer: "B: 八十块。",
            options: ["B: 八十块。", "B: 这件衣服很好看。", "B: 我要买一件。"]
        },
        {
            question: "A: 谢谢你！",
            correctAnswer: "B: 不客气。",
            options: ["B: 不客气。", "B: 对不起。", "B: 你好。"]
        },
        // --- 新增20题 ---
        {
            question: "A: 你的箱子重不重？",
            correctAnswer: "B: 我的很重，这个黑的很重。",
            options: ["B: 我的很重，这个黑的很重。", "B: 我的箱子是新的。", "B: 我没有箱子。"]
        },
        {
            question: "A: 这是谁的照片？ (量词考察)",
            correctAnswer: "B: 这是我的一张照片。",
            options: ["B: 这是我的一张照片。", "B: 这是我的一个照片。", "B: 这是我的一本照片。"]
        },
        {
            question: "A: 橘子怎么卖？",
            correctAnswer: "B: 八块钱一斤。",
            options: ["B: 八块钱一斤。", "B: 橘子很好吃。", "B: 这是橘子。"]
        },
        {
            question: "A: 你是老师吗？",
            correctAnswer: "B: 我不是老师，我是学生。",
            options: ["B: 我不是老师，我是学生。", "B: 是，我是老师。", "B: 你是老师。"]
        },
        {
            question: "A: 最近工作忙不忙？",
            correctAnswer: "B: 不太忙，您呢？",
            options: ["B: 不太忙，您呢？", "B: 我工作很好。", "B: 我是经理。"]
        },
        {
            question: "A: 你要一杯茶，还是要一杯咖啡？ (量词考察)",
            correctAnswer: "B: 来一杯茶吧！",
            options: ["B: 来一杯茶吧！", "B: 来一瓶茶吧！", "B: 是的，我要。"]
        },
        {
            question: "A: 请问，您贵姓？",
            correctAnswer: "B: 我姓张。",
            options: ["B: 我姓张。", "B: 我叫张东。", "B: 我是中国人。"]
        },
        {
            question: "A: 你是哪国人？",
            correctAnswer: "B: 我是法国人。",
            options: ["B: 我是法国人。", "B: 我说法语。", "B: 我住在法国。"]
        },
        {
            question: "A: 这是什么药？",
            correctAnswer: "B: 这是中药。",
            options: ["B: 这是中药。", "B: 这是我的药。", "B: 这药很贵。"]
        },
        {
            question: "A: 你的自行车是新的还是旧的？",
            correctAnswer: "B: 是新的。",
            options: ["B: 是新的。", "B: 是蓝色的。", "B: 是一辆自行车。"]
        },
        {
            question: "A: 你有没有兄弟姐妹？",
            correctAnswer: "B: 我没有姐姐，只有两个弟弟。",
            options: ["B: 我没有姐姐，只有两个弟弟。", "B: 是的，我有。", "B: 他们是学生。"]
        },
        {
            question: "A: 你们公司有多少员工？",
            correctAnswer: "B: 大概有一百多个员工。",
            options: ["B: 大概有一百多个员工。", "B: 我们公司很大。", "B: 他们都是中国人。"]
        },
        {
            question: "A: 我可以看一下你的词典吗？ (量词考察)",
            correctAnswer: "B: 当然可以，这本词典你拿去看吧。",
            options: ["B: 当然可以，这本词典你拿去看吧。", "B: 当然可以，这个词典你拿去看吧。", "B: 这是一本词典。"]
        },
        {
            question: "A: 明天你去不去图书馆？",
            correctAnswer: "B: 我不去，我要去银行。",
            options: ["B: 我不去，我要去银行。", "B: 明天是星期六。", "B: 图书馆有很多书。"]
        },
        {
            question: "A: 你爸爸在哪儿工作？",
            correctAnswer: "B: 他在一家外贸公司工作。",
            options: ["B: 他在一家外贸公司工作。", "B: 他是经理。", "B: 他工作不忙。"]
        },
        {
            question: "A: 你的手机号码是多少？",
            correctAnswer: "B: 对不起，我不知道。",
            options: ["B: 对不起，我不知道。", "B: 我的手机是新的。", "B: 这是我的手机。"]
        },
        {
            question: "A: 你要几碗米饭？ (量词考察)",
            correctAnswer: "B: 我要一碗米饭。",
            options: ["B: 我要一碗米饭。", "B: 我要一个米饭。", "B: 我要吃米饭。"]
        },
        {
            question: "A: 那个箱子里是什么？",
            correctAnswer: "B: 都是一些日用品。",
            options: ["B: 都是一些日用品。", "B: 那个箱子很重。", "B: 那个箱子是黑色的。"]
        },
        {
            question: "A: 你好久不见，最近怎么样？",
            correctAnswer: "B: 马马虎虎。",
            options: ["B: 马马虎虎。", "B: 我很忙。", "B: 我是经理。"]
        },
        {
            question: "A: 这位小姐是你的朋友吗？ (量词考察)",
            correctAnswer: "B: 是的，她是我的一位朋友。",
            options: ["B: 是的，她是我的一位朋友。", "B: 是的，她是我的一张朋友。", "B: 是的，她是我的一件朋友。"]
        }
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

        // 随机抽取10道题
        currentQuestions = [...questionBank].sort(() => 0.5 - Math.random()).slice(0, 10);

        updateScore();
        startTimer();
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < currentQuestions.length) {
            const q = currentQuestions[currentQuestionIndex];
            questionDisplay.textContent = q.question;
            optionsContainer.innerHTML = '';

            // 随机排列选项
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
            feedbackDisplay.innerHTML = `<p style="color: #c53030;">回答错误。正确答案是：${correctOption}</p>`;
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
        }, 2000); // 延长等待时间，让学生看清正确答案
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