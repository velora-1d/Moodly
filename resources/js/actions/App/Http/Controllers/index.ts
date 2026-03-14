import Auth from './Auth'
import AchievementsController from './AchievementsController'
import LeaderboardController from './LeaderboardController'
import MoodController from './MoodController'
import FriendController from './FriendController'
import MentalHealthChatController from './MentalHealthChatController'
import InviteController from './InviteController'
import Api from './Api'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    AchievementsController: Object.assign(AchievementsController, AchievementsController),
    LeaderboardController: Object.assign(LeaderboardController, LeaderboardController),
    MoodController: Object.assign(MoodController, MoodController),
    FriendController: Object.assign(FriendController, FriendController),
    MentalHealthChatController: Object.assign(MentalHealthChatController, MentalHealthChatController),
    InviteController: Object.assign(InviteController, InviteController),
    Api: Object.assign(Api, Api),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers