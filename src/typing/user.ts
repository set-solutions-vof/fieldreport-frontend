export type UpdateProfileRequest = {
  name: string
}

export type ChangePasswordRequest = {
  current_password: string
  new_password: string
}
