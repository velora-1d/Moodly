import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\LeaderboardController::status
* @see app/Http/Controllers/LeaderboardController.php:36
* @route '/api/leaderboard/status'
*/
export const status = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(options),
    method: 'post',
})

status.definition = {
    methods: ["post"],
    url: '/api/leaderboard/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LeaderboardController::status
* @see app/Http/Controllers/LeaderboardController.php:36
* @route '/api/leaderboard/status'
*/
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LeaderboardController::status
* @see app/Http/Controllers/LeaderboardController.php:36
* @route '/api/leaderboard/status'
*/
status.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LeaderboardController::status
* @see app/Http/Controllers/LeaderboardController.php:36
* @route '/api/leaderboard/status'
*/
const statusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LeaderboardController::status
* @see app/Http/Controllers/LeaderboardController.php:36
* @route '/api/leaderboard/status'
*/
statusForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(options),
    method: 'post',
})

status.form = statusForm

const leaderboard = {
    status: Object.assign(status, status),
}

export default leaderboard