import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MentalHealthChatController::chat
* @see app/Http/Controllers/MentalHealthChatController.php:76
* @route '/api/mental-health-chat'
*/
export const chat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: chat.url(options),
    method: 'post',
})

chat.definition = {
    methods: ["post"],
    url: '/api/mental-health-chat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MentalHealthChatController::chat
* @see app/Http/Controllers/MentalHealthChatController.php:76
* @route '/api/mental-health-chat'
*/
chat.url = (options?: RouteQueryOptions) => {
    return chat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MentalHealthChatController::chat
* @see app/Http/Controllers/MentalHealthChatController.php:76
* @route '/api/mental-health-chat'
*/
chat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: chat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MentalHealthChatController::chat
* @see app/Http/Controllers/MentalHealthChatController.php:76
* @route '/api/mental-health-chat'
*/
const chatForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: chat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MentalHealthChatController::chat
* @see app/Http/Controllers/MentalHealthChatController.php:76
* @route '/api/mental-health-chat'
*/
chatForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: chat.url(options),
    method: 'post',
})

chat.form = chatForm

const MentalHealthChatController = { chat }

export default MentalHealthChatController