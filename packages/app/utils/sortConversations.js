const sortConversations = data => {
  return [...data].sort((a, b) => {
    if (a.dateUpdated > b.dateUpdated) {
      return -1
    }

    if (a.dateUpdated < b.dateUpdated) {
      return 1
    }

    return 0
  })
}

export default sortConversations
