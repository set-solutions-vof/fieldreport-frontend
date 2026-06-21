export type UpdateProfileRequest = {
  first_name: string
  last_name: string
}

export type ChangePasswordRequest = {
  current_password: string
  new_password: string
}
