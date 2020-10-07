import { isNotLoggedIn } from '@utils/initialize'

import { Chats as ChatsView } from '@views'
import { Chat as ChatLayout } from '@layouts'

function Chats() {
  return (
    <ChatLayout>
      <ChatsView />
    </ChatLayout>
  )
}

Chats.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  // https://err.sh/zeit/next.js/empty-object-getInitialProps
  return { undefined }
}

export default Chats
