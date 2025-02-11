export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/',
      getHref: () => '/app',
    },
    dashboard: {
      path: '',
      getHref: () => '/app',
    },
    profile: {
      path: '/app/profile',
      getHref: () => '/app/profile',
    },
    workouts: {
      path: '/workouts',
      getHref: () => '/workouts',
    },
    workoutCreate: {
      path: '/workouts/create',
      getHref: () => '/workouts/create',
    },
    workoutPlan: {
      path: '/workouts/workout-plan/:workoutId',
      getHref: () => '/workouts/workout-plan/:workoutId',
    },
    exercise: {
      path: '/workouts/workout-plan/:workoutId/exercise/:exerciseId',
      getHref: () => '/workouts/workout-plan/:workoutId/exercise/:exerciseId',
    },
  },
} as const;
