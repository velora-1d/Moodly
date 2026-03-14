import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\FriendController::pending
* @see app/Http/Controllers/FriendController.php:13
* @route '/friends/pending'
*/
export const pending = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})

pending.definition = {
    methods: ["get","head"],
    url: '/friends/pending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FriendController::pending
* @see app/Http/Controllers/FriendController.php:13
* @route '/friends/pending'
*/
pending.url = (options?: RouteQueryOptions) => {
    return pending.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FriendController::pending
* @see app/Http/Controllers/FriendController.php:13
* @route '/friends/pending'
*/
pending.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FriendController::pending
* @see app/Http/Controllers/FriendController.php:13
* @route '/friends/pending'
*/
pending.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pending.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FriendController::pending
* @see app/Http/Controllers/FriendController.php:13
* @route '/friends/pending'
*/
const pendingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pending.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FriendController::pending
* @see app/Http/Controllers/FriendController.php:13
* @route '/friends/pending'
*/
pendingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pending.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FriendController::pending
* @see app/Http/Controllers/FriendController.php:13
* @route '/friends/pending'
*/
pendingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pending.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pending.form = pendingForm

/**
* @see \App\Http\Controllers\FriendController::store
* @see app/Http/Controllers/FriendController.php:40
* @route '/friends'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/friends',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FriendController::store
* @see app/Http/Controllers/FriendController.php:40
* @route '/friends'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FriendController::store
* @see app/Http/Controllers/FriendController.php:40
* @route '/friends'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\FriendController::store
* @see app/Http/Controllers/FriendController.php:40
* @route '/friends'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\FriendController::store
* @see app/Http/Controllers/FriendController.php:40
* @route '/friends'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\FriendController::accept
* @see app/Http/Controllers/FriendController.php:102
* @route '/friends/{id}/accept'
*/
export const accept = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: accept.url(args, options),
    method: 'patch',
})

accept.definition = {
    methods: ["patch"],
    url: '/friends/{id}/accept',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\FriendController::accept
* @see app/Http/Controllers/FriendController.php:102
* @route '/friends/{id}/accept'
*/
accept.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return accept.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FriendController::accept
* @see app/Http/Controllers/FriendController.php:102
* @route '/friends/{id}/accept'
*/
accept.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: accept.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\FriendController::accept
* @see app/Http/Controllers/FriendController.php:102
* @route '/friends/{id}/accept'
*/
const acceptForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: accept.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\FriendController::accept
* @see app/Http/Controllers/FriendController.php:102
* @route '/friends/{id}/accept'
*/
acceptForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: accept.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

accept.form = acceptForm

/**
* @see \App\Http\Controllers\FriendController::reject
* @see app/Http/Controllers/FriendController.php:114
* @route '/friends/{id}/reject'
*/
export const reject = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

reject.definition = {
    methods: ["patch"],
    url: '/friends/{id}/reject',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\FriendController::reject
* @see app/Http/Controllers/FriendController.php:114
* @route '/friends/{id}/reject'
*/
reject.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return reject.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FriendController::reject
* @see app/Http/Controllers/FriendController.php:114
* @route '/friends/{id}/reject'
*/
reject.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\FriendController::reject
* @see app/Http/Controllers/FriendController.php:114
* @route '/friends/{id}/reject'
*/
const rejectForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\FriendController::reject
* @see app/Http/Controllers/FriendController.php:114
* @route '/friends/{id}/reject'
*/
rejectForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

reject.form = rejectForm

const friends = {
    pending: Object.assign(pending, pending),
    store: Object.assign(store, store),
    accept: Object.assign(accept, accept),
    reject: Object.assign(reject, reject),
}

export default friends