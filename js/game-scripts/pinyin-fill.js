document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const characterDisplay = document.getElementById('character-display');
    const optionsContainer = document.getElementById('options-container');
    const scoreDisplay = document.getElementById('current-score');
    const questionCounterDisplay = document.getElementById('question-counter');
    const timeDisplay = document.getElementById('game-time');
    const progressBar = document.getElementById('progress-bar');
    const feedbackDisplay = document.getElementById('feedback');
    const restartBtn = document.getElementById('restart-btn');

    // --- Game Data ---
    const questionBank = [
        { character: '你好', correct: 'ní hǎo', options: ['nǐ hǎo', 'ní hǎo', 'nǐ hao', 'nǐ hāo'] },
        { character: '老师', correct: 'lǎo shī', options: ['lǎo shī', 'lāo shī', 'lǎo sī', 'lǎo shí'] },
        { character: '汉语', correct: 'Hànyǔ', options: ['Hànyǔ', 'Hànyu', 'Hányǔ', 'Hànyù'] },
        { character: '再见', correct: 'zàijiàn', options: ['zàijiàn', 'zàijian', 'zāijiàn', 'zàijiān'] },
        { character: '谢谢', correct: 'xièxie', options: ['xièxie', 'xiēxie', 'xièxiè', 'xìexie'] },
        { character: '不客气', correct: 'bú kèqi', options: ['bú kèqi', 'bù kèqi', 'bú kēqi', 'bú kèqì'] },
        { character: '对不起', correct: 'duìbuqǐ', options: ['duìbuqǐ', 'duìbùqǐ', 'duibuqǐ', 'duìbuqi'] },
        { character: '没关系', correct: 'méi guānxi', options: ['méi guānxi', 'méi guānxì', 'mèi guānxi', 'méi guànxi'] },
        { character: '学校', correct: 'xuéxiào', options: ['xuéxiào', 'xuéxiāo', 'xúexiào', 'xuéxiǎo'] },
        { character: '银行', correct: 'yínháng', options: ['yínháng', 'yīnháng', 'yínhāng', 'yínháng'] },
        { character: '邮局', correct: 'yóujú', options: ['yóujú', 'yóuju', 'yōujú', 'yóujú'] },
        { character: '明天', correct: 'míngtiān', options: ['míngtiān', 'míngtiān', 'míngtian', 'mīngtiān'] },
        { character: '今天', correct: 'jīntiān', options: ['jīntiān', 'jīntiān', 'jìntiān', 'jīntian'] },
        { character: '工作', correct: 'gōngzuò', options: ['gōngzuò', 'gōngzuō', 'gōngzuò', 'gōngzhuò'] },
        { character: '身体', correct: 'shēntǐ', options: ['shēntǐ', 'shēntī', 'shentǐ', 'shēntǐ'] },
        { character: '忙', correct: 'máng', options: ['máng', 'māng', 'mǎng', 'máng'] },
        { character: '难', correct: 'nán', options: ['nán', 'nǎn', 'lán', 'nàn'] },
        { character: '爸爸', correct: 'bàba', options: ['bàba', 'bābā', 'bǎba', 'bàbà'] },
        { character: '妈妈', correct: 'māma', options: ['māma', 'māmā', 'mǎma', 'màmā'] },
        { character: '哥哥', correct: 'gēge', options: ['gēge', 'gēgē', 'gěge', 'gège'] },
        { character: '弟弟', correct: 'dìdi', options: ['dìdi', 'dìdì', 'didi', 'dīdi'] },
        { character: '妹妹', correct: 'mèimei', options: ['mèimei', 'mèimèi', 'meimei', 'mèimeī'] },
        { character: '学', correct: 'xué', options: ['xué', 'xúe', 'xuē', 'xuě'] },
        { character: '去', correct: 'qù', options: ['qù', 'qū', 'qǔ', 'qù'] },
        { character: '喝', correct: 'hē', options: ['hē', 'hé', 'hè', 'hē'] },
        { character: '茶', correct: 'chá', options: ['chá', 'chǎ', 'chà', 'cá'] },
        { character: '钱', correct: 'qián', options: ['qián', 'qiǎn', 'qiàn', 'qiān'] },
        { character: '请', correct: 'qǐng', options: ['qǐng', 'qīng', 'qìng', 'qǐng'] },
        { character: '坐', correct: 'zuò', options: ['zuò', 'zuō', 'zuǒ', 'zhuò'] },
        { character: '进', correct: 'jìn', options: ['jìn', 'jīn', 'jǐn', 'jìng'] },
        { character: '早上', correct: 'zǎoshang', options: ['zǎoshang', 'zǎoshāng', 'zǎoshan', 'zǎoshǎng'] },
        { character: '下午', correct: 'xiàwǔ', options: ['xiàwǔ', 'xiàwú', 'xiàwū', 'xiàwǔ'] },
        { character: '晚上', correct: 'wǎnshang', options: ['wǎnshang', 'wǎnshāng', 'wǎnshǎng', 'wǎnshàng'] },
        { character: '同学', correct: 'tóngxué', options: ['tóngxué', 'tóngxuè', 'tōngxué', 'tóngxúe'] },
        { character: '我', correct: 'wǒ', options: ['wǒ', 'wó', 'wò', 'wō'] },
        { character: '你', correct: 'nǐ', options: ['nǐ', 'nī', 'nì', 'ní'] },
        { character: '他', correct: 'tā', options: ['tā', 'tǎ', 'tà', 'tá'] },
        { character: '她', correct: 'tā', options: ['tā', 'tǎ', 'tà', 'tá'] },
        { character: '很', correct: 'hěn', options: ['hěn', 'hēn', 'hèn', 'hén'] },
        { character: '白', correct: 'bái', options: ['bái', 'bǎi', 'bēi', 'bāi'] },
        { character: '大', correct: 'dà', options: ['dà', 'dǎ', 'dā', 'dá'] },
        { character: '不', correct: 'bù', options: ['bù', 'bú', 'bǔ', 'bū'] },
        { character: '星期', correct: 'xīngqī', options: ['xīngqī', 'xīngqí', 'xīngqi', 'xīngqì'] },
        { character: '几', correct: 'jǐ', options: ['jǐ', 'jī', 'jí', 'jì'] },
        { character: '哪儿', correct: 'nǎr', options: ['nǎr', 'nār', 'nàr', 'nǎer'] },
        { character: '那儿', correct: 'nàr', options: ['nàr', 'nār', 'nǎr', 'nàer'] },
        { character: '寄信', correct: 'jì xìn', options: ['jì xìn', 'jì xīn', 'jī xìn', 'jì xìn'] },
        { character: '取钱', correct: 'qǔ qián', options: ['qǔ qián', 'qū qián', 'qǔ qiān', 'qǔ qiǎn'] },
        { character: '您', correct: 'nín', options: ['nín', 'nǐn', 'nìn', 'níng'] },
        { character: '名字', correct: 'míngzi', options: ['míngzi', 'míngzī', 'míngzì', 'mīngzi'] },
    ];

    // --- Game State ---
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let secondsElapsed = 0;

    // --- Functions ---
    function startGame() {
        // Reset state
        score = 0;
        currentQuestionIndex = 0;
        secondsElapsed = 0;
        feedbackDisplay.innerHTML = '<p>请做出你的选择！</p>';
        restartBtn.style.display = 'none';

        // Select 10 random questions
        currentQuestions = [...questionBank].sort(() => 0.5 - Math.random()).slice(0, 10);

        // Start UI updates
        updateScore();
        startTimer();
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < currentQuestions.length) {
            const question = currentQuestions[currentQuestionIndex];
            characterDisplay.textContent = question.character;
            optionsContainer.innerHTML = '';

            // Shuffle options to randomize their position
            const shuffledOptions = [...question.options].sort(() => 0.5 - Math.random());

            shuffledOptions.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('option-btn');
                button.addEventListener('click', () => handleOptionClick(button, option, question.correct));
                optionsContainer.appendChild(button);
            });

            updateProgress();
        } else {
            endGame();
        }
    }

    function handleOptionClick(button, selectedOption, correctOption) {
        // Disable all buttons after an answer is chosen
        document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

        if (selectedOption === correctOption) {
            score += 10;
            button.classList.add('correct');
            feedbackDisplay.innerHTML = '<p style="color: #38a169;">正确！(Correct!)</p>';
        } else {
            button.classList.add('incorrect');
            feedbackDisplay.innerHTML = `<p style="color: #c53030;">错误。正确答案是: ${correctOption}</p><p style="color: #c53030;">(Incorrect. The correct answer is: ${correctOption})</p>`;
            // Highlight the correct answer
            document.querySelectorAll('.option-btn').forEach(btn => {
                if (btn.textContent === correctOption) {
                    btn.classList.add('correct');
                }
            });
        }
        updateScore();
        
        // Move to the next question after a short delay
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 1500);
    }

    function updateScore() {
        scoreDisplay.textContent = score;
    }

    function updateProgress() {
        questionCounterDisplay.textContent = `${currentQuestionIndex + 1} / ${currentQuestions.length}`;
        progressBar.style.width = `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`;
    }

    function startTimer() {
        clearInterval(timer); // Clear any existing timer
        timer = setInterval(() => {
            secondsElapsed++;
            timeDisplay.textContent = `${secondsElapsed}s`;
        }, 1000);
    }

    function endGame() {
        clearInterval(timer);
        characterDisplay.textContent = '游戏结束！';
        optionsContainer.innerHTML = '';
        feedbackDisplay.innerHTML = `<h3><span class="chinese">你的最终得分是：</span><span class="english">Your final score is:</span> ${score}</h3>`;
        restartBtn.style.display = 'block';
    }

    // --- Event Listeners ---
    restartBtn.addEventListener('click', startGame);

    // --- Initial Game Start ---
    startGame();
});