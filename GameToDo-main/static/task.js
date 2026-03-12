document.addEventListener("DOMContentLoaded", function() {
    const tasks = document.querySelectorAll(".task");

  // 現在の日付（時刻を切り捨て）
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時刻を 00:00:00.000 に設定

    tasks.forEach(function(task) {
        const limitDate = new Date(task.getAttribute("data-limit"));
        limitDate.setHours(0, 0, 0, 0); // 時刻を 00:00:00.000 に設定

        // 日付の差を計算
        const timeDiff = limitDate - today;
        const threeDaysInMs = 3 * 24 * 60 * 60 * 1000; // 3日分をミリ秒で計算

        // 期限切れの場合
        if (timeDiff < 0) {
            task.classList.add("due-past");
        }
        // 期限が当日〜3日前の場合
        else if (timeDiff >= 0 && timeDiff <= threeDaysInMs) {
            task.classList.add("due-soon");
        }
    });
});

