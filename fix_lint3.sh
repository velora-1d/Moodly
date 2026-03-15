#!/bin/bash

# Level 1
sed -i 's/const exhaleFx = /const /g' resources/js/pages/mentoring/levels/level-1.tsx
sed -i '/const bgVariants =/d' resources/js/pages/mentoring/levels/level-1.tsx
sed -i 's/const guideScale =/const /g' resources/js/pages/mentoring/levels/level-1.tsx
sed -i 's/const guideGlow =/const /g' resources/js/pages/mentoring/levels/level-1.tsx
sed -i 's/const boatY =/const /g' resources/js/pages/mentoring/levels/level-1.tsx

# Dashboard
sed -i 's/const loading = false;//g' resources/js/pages/dashboard.tsx
sed -i 's/const dailyPct = (dailyXP \/ 100) \* 100;//g' resources/js/pages/dashboard.tsx
sed -i '/const quickActions =/d' resources/js/pages/dashboard.tsx
sed -i 's/const \[weeklyCompletedLessons, setWeeklyCompletedLessons\] = useState/const \[weeklyCompletedLessons\] = useState/g' resources/js/pages/dashboard.tsx
sed -i 's/const \[weeklyTotalLessons, setWeeklyTotalLessons\] = useState/const \[weeklyTotalLessons\] = useState/g' resources/js/pages/dashboard.tsx
sed -i 's/const addDailyXP = (amount: number) => {/const addDailyXP = (_: number) => {/g' resources/js/pages/dashboard.tsx
sed -i 's/const prevMoodHasToday =/const _prevMoodHasToday =/g' resources/js/pages/dashboard.tsx

# Mental Health Chat
sed -i 's/const setSessionCache =/const _setSessionCache =/g' resources/js/pages/mental-health-chat/index.tsx
sed -i 's/const SESSIONS_KEY =/const _SESSIONS_KEY =/g' resources/js/pages/mental-health-chat/index.tsx
sed -i 's/const CACHE_KEY =/const _CACHE_KEY =/g' resources/js/pages/mental-health-chat/index.tsx

# Missions
sed -i 's/const name = /const _name = /g' resources/js/pages/missions/index.tsx

# Profile
sed -i 's/const res = /const _res = /g' resources/js/pages/profile/index.tsx
