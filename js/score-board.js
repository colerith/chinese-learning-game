// js/score-board.js
document.addEventListener('DOMContentLoaded', () => {
    const rankingBody = document.getElementById('ranking-body');
    const filterTabs = document.getElementById('filter-tabs');

    const renderScores = (docs) => {
        rankingBody.innerHTML = ''; // 清空现有内容
        if (docs.length === 0) {
            rankingBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">暂无记录 (No records yet)</td></tr>';
            return;
        }

        docs.forEach((doc, index) => {
            const data = doc.data();
            const rank = index + 1;
            const date = data.date ? data.date.toDate().toLocaleDateString() : 'N/A';
            
            let rankCellContent;
            switch (rank) {
                case 1:
                    rankCellContent = '<td class="rank-cell rank-gold"><i class="fas fa-trophy"></i></td>';
                    break;
                case 2:
                    rankCellContent = '<td class="rank-cell rank-silver"><i class="fas fa-trophy"></i></td>';
                    break;
                case 3:
                    rankCellContent = '<td class="rank-cell rank-bronze"><i class="fas fa-trophy"></i></td>';
                    break;
                default:
                    rankCellContent = `<td class="rank-cell">${rank}</td>`;
            }

            const row = `
                <tr>
                    ${rankCellContent}
                    <td>${data.userName || '匿名玩家'}</td>
                    <td>${data.gameType}</td>
                    <td class="score-cell">${data.score}</td>
                    <td>${date}</td>
                </tr>
            `;
            rankingBody.innerHTML += row;
        });
    };

    const fetchScores = (gameTypeFilter = null) => {
        let query = db.collection('scores').orderBy('score', 'desc').orderBy('date', 'desc');

        if (gameTypeFilter && gameTypeFilter !== 'all') {
            query = query.where('gameType', '==', gameTypeFilter);
        }

        query.limit(20).get()
            .then(snapshot => {
                renderScores(snapshot.docs);
            })
            .catch(error => {
                console.error("获取排行榜数据失败: ", error);
                rankingBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: red;">加载失败，请检查网络连接。</td></tr>';
            });
    };

    filterTabs.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        // 更新按钮样式
        filterTabs.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-secondary');
        });
        target.classList.add('btn-primary');
        target.classList.remove('btn-secondary');

        // 获取筛选类型并重新加载数据
        const filter = target.dataset.filter;
        fetchScores(filter);
    });

    // 页面加载时，默认获取总排行
    fetchScores('all');
});