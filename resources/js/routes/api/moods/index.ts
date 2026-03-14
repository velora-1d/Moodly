import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DashboardController::store
* @see app/Http/Controllers/Api/DashboardController.php:68
* @route '/api/moods'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/moods',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\DashboardController::store
* @see app/Http/Controllers/Api/DashboardController.php:68
* @route '/api/moods'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DashboardController::store
* @see app/Http/Controllers/Api/DashboardController.php:68
* @route '/api/moods'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::store
* @see app/Http/Controllers/Api/DashboardController.php:68
* @route '/api/moods'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::store
* @see app/Http/Controllers/Api/DashboardController.php:68
* @route '/api/moods'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const moods = {
    store: Object.assign(store, store),
}

export default moods