import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MoodController::index
* @see app/Http/Controllers/MoodController.php:15
* @route '/moods'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/moods',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MoodController::index
* @see app/Http/Controllers/MoodController.php:15
* @route '/moods'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MoodController::index
* @see app/Http/Controllers/MoodController.php:15
* @route '/moods'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MoodController::index
* @see app/Http/Controllers/MoodController.php:15
* @route '/moods'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MoodController::index
* @see app/Http/Controllers/MoodController.php:15
* @route '/moods'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MoodController::index
* @see app/Http/Controllers/MoodController.php:15
* @route '/moods'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MoodController::index
* @see app/Http/Controllers/MoodController.php:15
* @route '/moods'
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
* @see \App\Http\Controllers\MoodController::store
* @see app/Http/Controllers/MoodController.php:47
* @route '/moods'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/moods',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MoodController::store
* @see app/Http/Controllers/MoodController.php:47
* @route '/moods'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MoodController::store
* @see app/Http/Controllers/MoodController.php:47
* @route '/moods'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MoodController::store
* @see app/Http/Controllers/MoodController.php:47
* @route '/moods'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MoodController::store
* @see app/Http/Controllers/MoodController.php:47
* @route '/moods'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const MoodController = { index, store }

export default MoodController