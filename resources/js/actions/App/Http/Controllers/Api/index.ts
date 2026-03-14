import DashboardController from './DashboardController'
import MissionController from './MissionController'
import LevelController from './LevelController'
import ChatController from './ChatController'

const Api = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    MissionController: Object.assign(MissionController, MissionController),
    LevelController: Object.assign(LevelController, LevelController),
    ChatController: Object.assign(ChatController, ChatController),
}

export default Api