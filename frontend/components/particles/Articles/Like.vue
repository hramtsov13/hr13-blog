<template>
  <div class="flex items-center">
    <p class="mr-2 text-lg">{{ likes?.length }}</p>

    <UiTheButton icon class="w-10 !p-2" @click="onLikeHandler">
      <Icon
        :name="currentUsersLike?.length ? 'ph:heart-fill' : 'ph:heart-light'"
        size="1.5rem"
        class="text-red-500"
      />
    </UiTheButton>
  </div>
</template>

<script setup lang="ts">
import { ILike, TUser } from '@/utils/types'
import { useNotification } from '@kyvg/vue3-notification'

interface ILikeProps {
  articleId: string | null
}

const props = withDefaults(defineProps<ILikeProps>(), {
  articleId: null,
})

const { delete: _delete } = useStrapi()
const config = useRuntimeConfig()
const token = useStrapiToken()
const user = useStrapiUser<TUser>()
const { notify } = useNotification()

const { data: likes, refresh: refreshLikes } = await useAsyncData('likes', () =>
  $fetch<ILike[]>(`${config.strapi.url}/api/articles/${props.articleId}/likes`)
)

const { data: currentUsersLike, refresh: refreshDidLikeState } =
  await useAsyncData('didLike', () =>
    $fetch<ILike[]>(
      `${config.strapi.url}/api/articles/${props.articleId}/did-like-article`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token.value}`,
        },
      }
    )
  )

const addLike = async () => {
  try {
    await $fetch<ILike>(
      `${config.strapi.url}/api/articles/${props.articleId}/likes`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token.value}`,
        },
      }
    )

    await refreshDidLikeState()
    await refreshLikes()

    notify({
      text: 'You have liked the article!',
      type: 'success',
      duration: 3000,
      id: Date.now(),
    })
  } catch (e: any) {
    notify({
      text: 'Something went wrong, try again later',
      type: 'error',
      duration: 3000,
      id: Date.now(),
    })
    throw new Error(e)
  }
}

const removeLike = async () => {
  try {
    if (currentUsersLike.value) {
      await _delete<ILike>('likes', currentUsersLike.value[0].id)
      await refreshDidLikeState()
      await refreshLikes()

      notify({
        text: 'You have removed your like!',
        type: 'success',
        duration: 3000,
        id: Date.now(),
      })
    }
  } catch (e: any) {
    notify({
      text: 'Something went wrong, try again later',
      type: 'error',
      duration: 3000,
      id: Date.now(),
    })
    throw new Error(e)
  }
}

const onLikeHandler = async () => {
  if (!user.value) {
    return
  }

  if (currentUsersLike.value && currentUsersLike.value.length) {
    await removeLike()
    return
  }

  await addLike()
}

onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
  likes.value = []
  currentUsersLike.value = []
  console.log('currentUsersLike.value: ', currentUsersLike.value)
  console.log('likes.value: ', likes.value)
})

// To handle correct like display on user's login/logout
watch(
  () => user.value,
  (newVal) => {
    newVal ? refreshDidLikeState() : (currentUsersLike.value = [])
  }
)
</script>
