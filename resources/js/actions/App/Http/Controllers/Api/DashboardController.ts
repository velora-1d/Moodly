import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DashboardController::index
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DashboardController::index
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DashboardController::index
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::index
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::index
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::index
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::index
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
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
* @see \App\Http\Controllers\Api\DashboardController::storeMood
* @see app/Http/Controllers/Api/DashboardController.php:68
* @route '/api/moods'
*/
export const storeMood = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMood.url(options),
    method: 'post',
})

storeMood.definition = {
    methods: ["post"],
    url: '/api/moods',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\DashboardController::storeMood
* @see app/Http/Controllers/Api/DashboardController.php:68
* @route '/api/moods'
*/
storeMood.url = (options?: RouteQueryOptions) => {
    return storeMood.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DashboardController::storeMood
* @see app/Http/Controllers/Api/DashboardController.php:68
* @route '/api/moods'
*/
storeMood.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMood.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::storeMood
* @see app/Http/Controllers/Api/DashboardController.php:68
* @route '/api/moods'
*/
const storeMoodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeMood.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::storeMood
* @see app/Http/Controllers/Api/DashboardController.php:68
* @route '/api/moods'
*/
storeMoodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeMood.url(options),
    method: 'post',
})

storeMood.form = storeMoodForm

const DashboardController = { index, storeMood }

export default DashboardController