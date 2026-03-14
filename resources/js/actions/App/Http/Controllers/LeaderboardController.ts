import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LeaderboardController::index
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/leaderboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LeaderboardController::index
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LeaderboardController::index
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LeaderboardController::index
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LeaderboardController::index
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LeaderboardController::index
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LeaderboardController::index
* @see app/Http/Controllers/LeaderboardController.php:14
* @route '/api/leaderboard'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\LeaderboardController::storeStatus
* @see app/Http/Controllers/LeaderboardController.php:36
* @route '/api/leaderboard/status'
*/
export const storeStatus = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeStatus.url(options),
    method: 'post',
})

storeStatus.definition = {
    methods: ["post"],
    url: '/api/leaderboard/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LeaderboardController::storeStatus
* @see app/Http/Controllers/LeaderboardController.php:36
* @route '/api/leaderboard/status'
*/
storeStatus.url = (options?: RouteQueryOptions) => {
    return storeStatus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LeaderboardController::storeStatus
* @see app/Http/Controllers/LeaderboardController.php:36
* @route '/api/leaderboard/status'
*/
storeStatus.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeStatus.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LeaderboardController::storeStatus
* @see app/Http/Controllers/LeaderboardController.php:36
* @route '/api/leaderboard/status'
*/
const storeStatusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeStatus.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LeaderboardController::storeStatus
* @see app/Http/Controllers/LeaderboardController.php:36
* @route '/api/leaderboard/status'
*/
storeStatusForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeStatus.url(options),
    method: 'post',
})

storeStatus.form = storeStatusForm

const LeaderboardController = { index, storeStatus }

export default LeaderboardController