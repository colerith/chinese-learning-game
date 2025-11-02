// js/script.js (诊断版本)

document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');

    if (userForm) {
        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("表单已提交。"); // 日志1：确认事件监听已触发

            const studentId = document.getElementById('studentId').value;
            const userName = document.getElementById('userName').value;

            if (!studentId || !userName) {
                alert("学号和姓名不能为空！");
                return;
            }
            
            const email = `${studentId}@student.game`; 
            const password = `${studentId}${userName}`;

            console.log(`准备使用邮箱: ${email} 尝试登录...`); // 日志2：显示将要用于登录的伪装邮箱

            // 1. 尝试登录
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // 登录成功
                    console.log("登录成功！用户UID:", userCredential.user.uid); // 日志3：登录成功
                    alert('登录成功！');
                    localStorage.setItem('user', JSON.stringify({
                        uid: userCredential.user.uid,
                        studentId: studentId,
                        userName: userName
                    }));
                    window.location.href = 'game-select.html';
                })
                .catch((error) => {
                    console.error("登录失败，错误代码:", error.code); // 日志4：登录失败
                    console.error("登录失败，错误信息:", error.message);

                    // 如果错误是“用户不存在”，则尝试注册
                    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') { // 'auth/invalid-credential' 是新版SDK中更常见的代码
                        console.log("用户不存在，准备尝试注册..."); // 日志5：准备注册

                        // 2. 尝试注册
                        auth.createUserWithEmailAndPassword(email, password)
                            .then((userCredential) => {
                                // 注册成功
                                console.log("注册成功！用户UID:", userCredential.user.uid); // 日志6：注册成功
                                
                                // 写入数据库
                                db.collection('users').doc(userCredential.user.uid).set({
                                    studentId: studentId,
                                    userName: userName,
                                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                                })
                                .then(() => {
                                    console.log("用户信息已成功写入Firestore。"); // 日志7：数据库写入成功
                                    alert('注册成功并已自动登录！');
                                    localStorage.setItem('user', JSON.stringify({
                                        uid: userCredential.user.uid,
                                        studentId: studentId,
                                        userName: userName
                                    }));
                                    window.location.href = 'game-select.html';
                                })
                                .catch((dbError) => {
                                    console.error("数据库写入失败:", dbError);
                                    alert(`注册成功，但保存用户信息失败: ${dbError.message}`);
                                });
                            })
                            .catch((regError) => {
                                // 注册失败
                                console.error("注册失败，错误代码:", regError.code); // 日志8：注册失败
                                console.error("注册失败，错误信息:", regError.message);
                                alert(`注册失败: ${regError.message}\n\n请检查浏览器控制台 (F12 -> Console) 获取详细信息。`);
                            });
                    } else {
                        // 其他登录错误
                        alert(`登录失败: ${error.message}\n\n请检查浏览器控制台 (F12 -> Console) 获取详细信息。`);
                    }
                });
        });
    }
});
