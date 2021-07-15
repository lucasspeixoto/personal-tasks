export interface ProviderUser {
  uid: string
  email: string
  displayName: string
  emailVerified: boolean
  userid?: string
}

export interface GenericUser {
  username: string
  email: string
  password: string
}
