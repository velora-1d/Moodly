import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import leaderboard2351c2 from './leaderboard'
import dashboard from './dashboard'
import moods from './moods'
import missions from './missions'
import levels from './levels'
import chat from './chat'
/**
* @see \App\Http\Controllers\LeaderboardController::leaderboard
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
export const leaderboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaderboard.url(options),
    method: 'get',
})

leaderboard.definition = {
    methods: ["get","head"],
    url: '/api/leaderboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LeaderboardController::leaderboard
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
leaderboard.url = (options?: RouteQueryOptions) => {
    return leaderboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LeaderboardController::leaderboard
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
leaderboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaderboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LeaderboardController::leaderboard
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
leaderboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leaderboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LeaderboardController::leaderboard
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
const leaderboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: leaderboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LeaderboardController::leaderboard
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
leaderboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: leaderboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LeaderboardController::leaderboard
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
leaderboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: leaderboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

leaderboard.form = leaderboardForm

/**
* @see \App\Http\Controllers\MentalHealthChatController::mentalHealthChat
* @see app/Http/Controllers/MentalHealthChatController.php:76
* @route '/api/mental-health-chat'
*/
export const mentalHealthChat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mentalHealthChat.url(options),
    method: 'post',
})

mentalHealthChat.definition = {
    methods: ["post"],
    url: '/api/mental-health-chat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MentalHealthChatController::mentalHealthChat
* @see app/Http/Controllers/MentalHealthChatController.php:76
* @route '/api/mental-health-chat'
*/
mentalHealthChat.url = (options?: RouteQueryOptions) => {
    return mentalHealthChat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MentalHealthChatController::mentalHealthChat
* @see app/Http/Controllers/MentalHealthChatController.php:76
* @route '/api/mental-health-chat'
*/
mentalHealthChat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mentalHealthChat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MentalHealthChatController::mentalHealthChat
* @see app/Http/Controllers/MentalHealthChatController.php:76
* @route '/api/mental-health-chat'
*/
const mentalHealthChatForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: mentalHealthChat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MentalHealthChatController::mentalHealthChat
* @see app/Http/Controllers/MentalHealthChatController.php:76
* @route '/api/mental-health-chat'
*/
mentalHealthChatForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: mentalHealthChat.url(options),
    method: 'post',
})

mentalHealthChat.form = mentalHealthChatForm

const api = {
    leaderboard: Object.assign(leaderboard, leaderboard2351c2),
    mentalHealthChat: Object.assign(mentalHealthChat, mentalHealthChat),
    dashboard: Object.assign(dashboard, dashboard),
    moods: Object.assign(moods, moods),
    missions: Object.assign(missions, missions),
    levels: Object.assign(levels, levels),
    chat: Object.assign(chat, chat),
}

export default api