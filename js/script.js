// 用户信息存储与登录逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 登录表单提交
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const studentId = document.getElementById('studentId').value;
            const userName = document.getElementById('userName').value;
            
            // 存储用户信息
            const user = {
                id: studentId,
                name: userName,
                loginTime: new Date().toLocaleString()
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // 检查是否已有该用户，无则添加到用户列表
            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (!users.some(u => u.id === studentId)) {
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            // 跳转至游戏选择页
            window.location.href = 'game-select.html';
        });
    }

    // 生成二维码（模拟）
    function generateQrCode() {
        // 实际项目中可使用qrCode.js生成真实二维码
        const qrImg = document.querySelector('img[alt="游戏加入二维码"]');
        if (qrImg) {
            qrImg.src = 'assets/qrcode.png'; // 占位图
        }
    }
    generateQrCode();
});

// 成绩记录函数
function recordScore(gameType, score, time) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('请先登录！');
        window.location.href = 'login.html';
        return;
    }

    // 构造成绩数据
    const scoreData = {
        userId: currentUser.id,
        userName: currentUser.name,
        gameType: gameType,
        score: score,
        time: time,
        date: new Date().toLocaleString()
    };

    // 存储成绩
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(scoreData);
    localStorage.setItem('scores', JSON.stringify(scores));

    // 更新用户总得分
    updateTotalScore(currentUser.id, score);
}

// 更新用户总得分
function updateTotalScore(userId, addScore) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex].totalScore = (users[userIndex].totalScore || 0) + addScore;
        localStorage.setItem('users', JSON.stringify(users));
    }
}