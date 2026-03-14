import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
* @route '/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
* @route '/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
* @route '/login'
*/
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
* @route '/login'
*/
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
* @route '/login'
*/
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
* @route '/login'
*/
loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
* @route '/login'
*/
loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

login.form = loginForm

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:64
* @route '/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:64
* @route '/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:64
* @route '/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:64
* @route '/logout'
*/
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
* @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:64
* @route '/logout'
*/
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

logout.form = logoutForm

/**
* @see routes/web.php:7
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:7
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see routes/web.php:7
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:7
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see routes/web.php:7
* @route '/'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:7
* @route '/'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:7
* @route '/'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

/**
* @see routes/web.php:12
* @route '/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:12
* @route '/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see routes/web.php:12
* @route '/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:12
* @route '/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see routes/web.php:12
* @route '/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:12
* @route '/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:12
* @route '/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see routes/web.php:16
* @route '/missions'
*/
export const missions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: missions.url(options),
    method: 'get',
})

missions.definition = {
    methods: ["get","head"],
    url: '/missions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:16
* @route '/missions'
*/
missions.url = (options?: RouteQueryOptions) => {
    return missions.definition.url + queryParams(options)
}

/**
* @see routes/web.php:16
* @route '/missions'
*/
missions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: missions.url(options),
    method: 'get',
})

/**
* @see routes/web.php:16
* @route '/missions'
*/
missions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: missions.url(options),
    method: 'head',
})

/**
* @see routes/web.php:16
* @route '/missions'
*/
const missionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: missions.url(options),
    method: 'get',
})

/**
* @see routes/web.php:16
* @route '/missions'
*/
missionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: missions.url(options),
    method: 'get',
})

/**
* @see routes/web.php:16
* @route '/missions'
*/
missionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: missions.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

missions.form = missionsForm

/**
* @see routes/web.php:20
* @route '/mentoring'
*/
export const mentoring = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mentoring.url(options),
    method: 'get',
})

mentoring.definition = {
    methods: ["get","head"],
    url: '/mentoring',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:20
* @route '/mentoring'
*/
mentoring.url = (options?: RouteQueryOptions) => {
    return mentoring.definition.url + queryParams(options)
}

/**
* @see routes/web.php:20
* @route '/mentoring'
*/
mentoring.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mentoring.url(options),
    method: 'get',
})

/**
* @see routes/web.php:20
* @route '/mentoring'
*/
mentoring.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mentoring.url(options),
    method: 'head',
})

/**
* @see routes/web.php:20
* @route '/mentoring'
*/
const mentoringForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: mentoring.url(options),
    method: 'get',
})

/**
* @see routes/web.php:20
* @route '/mentoring'
*/
mentoringForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: mentoring.url(options),
    method: 'get',
})

/**
* @see routes/web.php:20
* @route '/mentoring'
*/
mentoringForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: mentoring.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

mentoring.form = mentoringForm

/**
* @see routes/web.php:25
* @route '/profile'
*/
export const profile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})

profile.definition = {
    methods: ["get","head"],
    url: '/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:25
* @route '/profile'
*/
profile.url = (options?: RouteQueryOptions) => {
    return profile.definition.url + queryParams(options)
}

/**
* @see routes/web.php:25
* @route '/profile'
*/
profile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})

/**
* @see routes/web.php:25
* @route '/profile'
*/
profile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profile.url(options),
    method: 'head',
})

/**
* @see routes/web.php:25
* @route '/profile'
*/
const profileForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: profile.url(options),
    method: 'get',
})

/**
* @see routes/web.php:25
* @route '/profile'
*/
profileForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: profile.url(options),
    method: 'get',
})

/**
* @see routes/web.php:25
* @route '/profile'
*/
profileForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: profile.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

profile.form = profileForm

/**
* @see routes/web.php:88
* @route '/shop'
*/
export const shop = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shop.url(options),
    method: 'get',
})

shop.definition = {
    methods: ["get","head"],
    url: '/shop',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:88
* @route '/shop'
*/
shop.url = (options?: RouteQueryOptions) => {
    return shop.definition.url + queryParams(options)
}

/**
* @see routes/web.php:88
* @route '/shop'
*/
shop.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shop.url(options),
    method: 'get',
})

/**
* @see routes/web.php:88
* @route '/shop'
*/
shop.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shop.url(options),
    method: 'head',
})

/**
* @see routes/web.php:88
* @route '/shop'
*/
const shopForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: shop.url(options),
    method: 'get',
})

/**
* @see routes/web.php:88
* @route '/shop'
*/
shopForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: shop.url(options),
    method: 'get',
})

/**
* @see routes/web.php:88
* @route '/shop'
*/
shopForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: shop.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

shop.form = shopForm

/**
* @see routes/web.php:95
* @route '/leaderboard'
*/
export const leaderboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaderboard.url(options),
    method: 'get',
})

leaderboard.definition = {
    methods: ["get","head"],
    url: '/leaderboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:95
* @route '/leaderboard'
*/
leaderboard.url = (options?: RouteQueryOptions) => {
    return leaderboard.definition.url + queryParams(options)
}

/**
* @see routes/web.php:95
* @route '/leaderboard'
*/
leaderboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaderboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:95
* @route '/leaderboard'
*/
leaderboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leaderboard.url(options),
    method: 'head',
})

/**
* @see routes/web.php:95
* @route '/leaderboard'
*/
const leaderboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: leaderboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:95
* @route '/leaderboard'
*/
leaderboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: leaderboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:95
* @route '/leaderboard'
*/
leaderboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: leaderboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

leaderboard.form = leaderboardForm

/**
* @see routes/web.php:101
* @route '/journal'
*/
export const journal = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: journal.url(options),
    method: 'get',
})

journal.definition = {
    methods: ["get","head"],
    url: '/journal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:101
* @route '/journal'
*/
journal.url = (options?: RouteQueryOptions) => {
    return journal.definition.url + queryParams(options)
}

/**
* @see routes/web.php:101
* @route '/journal'
*/
journal.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: journal.url(options),
    method: 'get',
})

/**
* @see routes/web.php:101
* @route '/journal'
*/
journal.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: journal.url(options),
    method: 'head',
})

/**
* @see routes/web.php:101
* @route '/journal'
*/
const journalForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: journal.url(options),
    method: 'get',
})

/**
* @see routes/web.php:101
* @route '/journal'
*/
journalForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: journal.url(options),
    method: 'get',
})

/**
* @see routes/web.php:101
* @route '/journal'
*/
journalForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: journal.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

journal.form = journalForm

/**
* @see routes/web.php:113
* @route '/mental-health-chat'
*/
export const mentalHealthChat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mentalHealthChat.url(options),
    method: 'get',
})

mentalHealthChat.definition = {
    methods: ["get","head"],
    url: '/mental-health-chat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:113
* @route '/mental-health-chat'
*/
mentalHealthChat.url = (options?: RouteQueryOptions) => {
    return mentalHealthChat.definition.url + queryParams(options)
}

/**
* @see routes/web.php:113
* @route '/mental-health-chat'
*/
mentalHealthChat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mentalHealthChat.url(options),
    method: 'get',
})

/**
* @see routes/web.php:113
* @route '/mental-health-chat'
*/
mentalHealthChat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mentalHealthChat.url(options),
    method: 'head',
})

/**
* @see routes/web.php:113
* @route '/mental-health-chat'
*/
const mentalHealthChatForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: mentalHealthChat.url(options),
    method: 'get',
})

/**
* @see routes/web.php:113
* @route '/mental-health-chat'
*/
mentalHealthChatForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: mentalHealthChat.url(options),
    method: 'get',
})

/**
* @see routes/web.php:113
* @route '/mental-health-chat'
*/
mentalHealthChatForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: mentalHealthChat.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

mentalHealthChat.form = mentalHealthChatForm

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:22
* @route '/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:22
* @route '/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:22
* @route '/register'
*/
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:22
* @route '/register'
*/
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:22
* @route '/register'
*/
const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:22
* @route '/register'
*/
registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
* @see app/Http/Controllers/Auth/RegisteredUserController.php:22
* @route '/register'
*/
registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

register.form = registerForm
