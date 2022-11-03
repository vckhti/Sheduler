
export interface AuthStateInterface {
  isSubmitting: boolean
  isLoggedIn: boolean | null
  isLoading?: boolean
  flag?: boolean | null
  data: any | null
  errors: any | null
}
