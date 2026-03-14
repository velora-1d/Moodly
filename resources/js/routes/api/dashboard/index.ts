import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DashboardController::data
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/api/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DashboardController::data
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DashboardController::data
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::data
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::data
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
const dataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::data
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
dataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\DashboardController::data
* @see app/Http/Controllers/Api/DashboardController.php:11
* @route '/api/dashboard'
*/
dataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: data.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

data.form = dataForm

const dashboard = {
    data: Object.assign(data, data),
}

export default dashboard