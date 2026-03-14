import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ChatController::index
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/chat/sessions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ChatController::index
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ChatController::index
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ChatController::index
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ChatController::index
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ChatController::index
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ChatController::index
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
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
* @see \App\Http\Controllers\Api\ChatController::store
* @see app/Http/Controllers/Api/ChatController.php:20
* @route '/api/chat/sessions'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/chat/sessions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ChatController::store
* @see app/Http/Controllers/Api/ChatController.php:20
* @route '/api/chat/sessions'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ChatController::store
* @see app/Http/Controllers/Api/ChatController.php:20
* @route '/api/chat/sessions'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ChatController::store
* @see app/Http/Controllers/Api/ChatController.php:20
* @route '/api/chat/sessions'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ChatController::store
* @see app/Http/Controllers/Api/ChatController.php:20
* @route '/api/chat/sessions'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\ChatController::show
* @see app/Http/Controllers/Api/ChatController.php:29
* @route '/api/chat/sessions/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/chat/sessions/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ChatController::show
* @see app/Http/Controllers/Api/ChatController.php:29
* @route '/api/chat/sessions/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ChatController::show
* @see app/Http/Controllers/Api/ChatController.php:29
* @route '/api/chat/sessions/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ChatController::show
* @see app/Http/Controllers/Api/ChatController.php:29
* @route '/api/chat/sessions/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ChatController::show
* @see app/Http/Controllers/Api/ChatController.php:29
* @route '/api/chat/sessions/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ChatController::show
* @see app/Http/Controllers/Api/ChatController.php:29
* @route '/api/chat/sessions/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ChatController::show
* @see app/Http/Controllers/Api/ChatController.php:29
* @route '/api/chat/sessions/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Api\ChatController::sendMessage
* @see app/Http/Controllers/Api/ChatController.php:37
* @route '/api/chat/sessions/{id}/messages'
*/
export const sendMessage = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendMessage.url(args, options),
    method: 'post',
})

sendMessage.definition = {
    methods: ["post"],
    url: '/api/chat/sessions/{id}/messages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ChatController::sendMessage
* @see app/Http/Controllers/Api/ChatController.php:37
* @route '/api/chat/sessions/{id}/messages'
*/
sendMessage.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return sendMessage.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ChatController::sendMessage
* @see app/Http/Controllers/Api/ChatController.php:37
* @route '/api/chat/sessions/{id}/messages'
*/
sendMessage.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendMessage.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ChatController::sendMessage
* @see app/Http/Controllers/Api/ChatController.php:37
* @route '/api/chat/sessions/{id}/messages'
*/
const sendMessageForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendMessage.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ChatController::sendMessage
* @see app/Http/Controllers/Api/ChatController.php:37
* @route '/api/chat/sessions/{id}/messages'
*/
sendMessageForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendMessage.url(args, options),
    method: 'post',
})

sendMessage.form = sendMessageForm

const ChatController = { index, store, show, sendMessage }

export default ChatController