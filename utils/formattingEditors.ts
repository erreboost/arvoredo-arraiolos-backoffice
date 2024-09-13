export const formattingUserGroup = (userGroupType: string) => {
  return userGroupType === 'administrator'
    ? 'Adminstrador'
    : userGroupType === 'editor'
      ? 'Editor'
      : userGroupType === 'user'
        ? 'User'
        : null
}
