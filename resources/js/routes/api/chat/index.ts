import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import sessions2b6d10 from './sessions'
import messages from './messages'
/**
* @see \App\Http\Controllers\Api\ChatController::sessions
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
export const sessions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sessions.url(options),
    method: 'get',
})

sessions.definition = {
    methods: ["get","head"],
    url: '/api/chat/sessions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ChatController::sessions
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
sessions.url = (options?: RouteQueryOptions) => {
    return sessions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ChatController::sessions
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
sessions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sessions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ChatController::sessions
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
sessions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sessions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ChatController::sessions
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
const sessionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: sessions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ChatController::sessions
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
sessionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: sessions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ChatController::sessions
* @see app/Http/Controllers/Api/ChatController.php:12
* @route '/api/chat/sessions'
*/
sessionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: sessions.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

sessions.form = sessionsForm

const chat = {
    sessions: Object.assign(sessions, sessions2b6d10),
    messages: Object.assign(messages, messages),
}

export default chat