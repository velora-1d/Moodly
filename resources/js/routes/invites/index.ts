import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\InviteController::store
* @see app/Http/Controllers/InviteController.php:11
* @route '/invites'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/invites',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InviteController::store
* @see app/Http/Controllers/InviteController.php:11
* @route '/invites'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InviteController::store
* @see app/Http/Controllers/InviteController.php:11
* @route '/invites'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InviteController::store
* @see app/Http/Controllers/InviteController.php:11
* @route '/invites'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InviteController::store
* @see app/Http/Controllers/InviteController.php:11
* @route '/invites'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const invites = {
    store: Object.assign(store, store),
}

export default invites