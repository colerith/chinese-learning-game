// document.addEventListener('DOMContentLoaded', () => {
//     const authStatusLink = document.getElementById('auth-status-link');

//     auth.onAuthStateChanged(user => {
//         if (user) {
//             // 用户已登录
//             const localUser = JSON.parse(localStorage.getItem('user'));
//             const userName = localUser ? localUser.userName : 'Profile';
            
//             // 检查当前页面是否在 games/ 目录下，以确定正确的跳转路径
//             const profilePath = window.location.pathname.includes('/games/') ? '../profile.html' : 'profile.html';

//             if (authStatusLink) {
//                 authStatusLink.innerHTML = `
//                     <a href="${profilePath}" class="btn btn-secondary bilingual">
//                         <span class="chinese">${userName}</span>
//                         <span class="english">Profile</span>
//                     </a>
//                 `;
//             }
//         } else {
//             // 用户未登录
//             // 检查当前页面是否在 games/ 目录下
//             const loginPath = window.location.pathname.includes('/games/') ? '../login.html' : 'login.html';

//             if (authStatusLink) {
//                 authStatusLink.innerHTML = `
//                     <a href="${loginPath}" class="btn btn-secondary bilingual">
//                         <span class="chinese">登录/注册</span>
//                         <span class="english">Login/Register</span>
//                     </a>
//                 `;
//             }
//         }
//     });
// });