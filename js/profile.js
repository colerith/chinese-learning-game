// js/profile.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM 元素
    const userNameDisplay = document.getElementById('user-name');
    const studentIdCnDisplay = document.getElementById('student-id-cn');
    const studentIdEnDisplay = document.getElementById('student-id-en');
    const gamesPlayedDisplay = document.getElementById('games-played');
    const avgScoreDisplay = document.getElementById('avg-score');
    const historyBody = document.getElementById('history-body');
    const logoutBtn = document.getElementById('logout-btn');

    // 1. 认证保护：检查用户是否登录
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('请先登录！(Please log in first!)');
        window.location.href = 'login.html';
        return; // 停止执行后续代码
    }

    // 2. 填充用户信息
    userNameDisplay.textContent = user.userName;
    studentIdCnDisplay.textContent = `学号: ${user.studentId}`;
    studentIdEnDisplay.textContent = `Student ID: ${user.studentId}`;

    // 3. 实现登出功能
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            localStorage.removeItem('user');
            alert('您已成功退出登录。');
            window.location.href = 'index.html';
        }).catch((error) => {
            console.error('退出登录失败:', error);
        });
    });

    // 4. 获取并显示用户数据
    const fetchUserData = () => {
        db.collection('scores')
          .where('userId', '==', user.uid)
          .orderBy('date', 'desc')
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
                historyBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px;">暂无游戏记录，快去玩几局吧！</td></tr>';
                return;
            }

            let totalGames = snapshot.size;
            let totalScore = 0;
            let historyHtml = '';

            snapshot.forEach(doc => {
                const data = doc.data();
                totalScore += data.score;
                const date = data.date ? data.date.toDate().toLocaleDateString() : 'N/A';
                
                historyHtml += `
                    <tr>
                        <td>${data.gameType}</td>
                        <td>${data.score}</td>
                        <td>${data.time}</td>
                        <td>${date}</td>
                    </tr>
                `;
            });

            const avgScore = totalGames > 0 ? (totalScore / totalGames).toFixed(0) : 0;

            // 更新统计卡片和历史记录表格
            gamesPlayedDisplay.textContent = totalGames;
            avgScoreDisplay.textContent = avgScore;
            historyBody.innerHTML = historyHtml;

          })
          .catch(error => {
              console.error("获取用户数据失败: ", error);
              historyBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: red;">数据加载失败。</td></tr>';
          });
    };

    fetchUserData();
});