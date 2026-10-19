'use strict';

/*
 * Achievements page.
 *
 * There is no backend yet, so both blocks below are PLACEHOLDERS:
 *   - ACHIEVEMENTS mirrors the Achievement table in Create_Emissions.sql
 *     (name, description, points), plus the fields the page needs to show progress.
 *   - userStats stands in for the logged-in user's real data.
 * When the database/API exists, replace userStats with a fetch for the current user
 * (Activity rows -> counts, Earns rows -> which achievements are already awarded).
 */

const ACHIEVEMENTS = [
    { id: 1, name: "First Emissions Logged", description: "Log your first emission activity.",
      icon: "\u270D\uFE0F", points: 10, stat: "activitiesLogged", target: 1 },
    { id: 2, name: "1 Week Logged", description: "Log emissions on 7 different days.",
      icon: "\uD83D\uDCC5", points: 25, stat: "daysLogged", target: 7 },
    { id: 3, name: "Register to Make Change", description: "Create your COZero account.",
      icon: "\uD83D\uDC64", points: 5, stat: "registered", target: 1 },
    { id: 4, name: "Get 100 Emission Points", description: "Reach 100 emission points.",
      icon: "\uD83D\uDCCA", points: 50, stat: "emissionPoints", target: 100 },
    { id: 5, name: "1 Month Logged", description: "Log emissions on 30 different days.",
      icon: "\uD83D\uDDD3\uFE0F", points: 100, stat: "daysLogged", target: 30 },
    { id: 6, name: "Join the Community", description: "Join the leaderboard.",
      icon: "\uD83D\uDD12", points: 15, stat: "onLeaderboard", target: 1,
      action: { label: "Sign Up To Join Leaderboard", href: "Login.html" } }
];

// Placeholder user data
const userStats = {
    activitiesLogged: 5,
    daysLogged: 21,
    registered: 1,
    emissionPoints: 90,
    onLeaderboard: 0
};

function buildCard(achievement, current, earned) {
    const item = document.createElement("li");
    item.className = "achievement_card";
    if (earned) {
        item.classList.add("earned");
    } else if (achievement.action) {
        item.classList.add("locked");
    }

    const icon = document.createElement("span");
    icon.className = "achievement_icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = achievement.icon;
    item.appendChild(icon);

    const title = document.createElement("h3");
    title.textContent = achievement.name;
    item.appendChild(title);

    const description = document.createElement("p");
    description.className = "achievement_description";
    description.textContent = achievement.description;
    item.appendChild(description);

    const points = document.createElement("p");
    points.className = "achievement_points";
    points.textContent = achievement.points + " points";
    item.appendChild(points);

    // Cards with a call-to-action show the button instead of a progress bar
    if (!earned && achievement.action) {
        const button = document.createElement("a");
        button.className = "achievement_button";
        button.href = achievement.action.href;
        button.textContent = achievement.action.label;
        item.appendChild(button);
        return item;
    }

    const bar = document.createElement("progress");
    bar.max = achievement.target;
    bar.value = Math.min(current, achievement.target);
    bar.setAttribute("aria-label", achievement.name + " progress");
    item.appendChild(bar);

    const label = document.createElement("p");
    label.className = "progress_label";
    label.textContent = earned
        ? "Completed"
        : Math.min(current, achievement.target) + " / " + achievement.target;
    item.appendChild(label);

    return item;
}

function addEmptyMessage(list, text) {
    const item = document.createElement("li");
    item.className = "empty_message";
    item.textContent = text;
    list.appendChild(item);
}

function renderAchievements() {
    const earnedList = document.getElementById("earnedList");
    const nextList = document.getElementById("nextList");
    const summary = document.getElementById("pointsSummary");

    let totalPoints = 0;
    let earnedCount = 0;

    earnedList.innerHTML = "";
    nextList.innerHTML = "";

    ACHIEVEMENTS.forEach(function (achievement) {
        const current = Number(userStats[achievement.stat]) || 0;
        const earned = current >= achievement.target;

        if (earned) {
            totalPoints += achievement.points;
            earnedCount++;
            earnedList.appendChild(buildCard(achievement, current, true));
        } else {
            nextList.appendChild(buildCard(achievement, current, false));
        }
    });

    if (earnedCount === 0) {
        addEmptyMessage(earnedList, "No achievements yet. Log an emission activity to earn your first one.");
    }
    if (earnedCount === ACHIEVEMENTS.length) {
        addEmptyMessage(nextList, "You have earned every achievement. Nice work!");
    }

    summary.textContent = earnedCount + " of " + ACHIEVEMENTS.length +
        " achievements earned | " + totalPoints + " achievement points";
}

renderAchievements();