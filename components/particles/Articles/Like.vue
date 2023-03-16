<template>
  <div class="flex items-center">
    <p class="mr-2 text-lg">{{ likes?.length }}</p>

    <UiTheButton icon @click="onLikeHandler">
      <Icon
        :name="currentUsersLike?.length ? 'ph:heart-fill' : 'ph:heart-light'"
        size="1.6rem"
        class="text-red-500"
      />
    </UiTheButton>
  </div>
</template>

<script setup lang="ts">
import { ILike, TUser } from '@/utils/types'

interface ILikeProps {
  articleId: string | null
}

const props = withDefaults(defineProps<ILikeProps>(), {
  articleId: null,
})

// TODO: DEFINE PAGE LEAVE HOOK AND DESTROY COMPONENT

const { delete: _delete } = useStrapi()
const config = useRuntimeConfig()
const token = useStrapiToken()
const user = useStrapiUser<TUser>()

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
  } catch (e: any) {
    throw new Error(e)
  }
}

const removeLike = async () => {
  try {
    if (currentUsersLike.value) {
      await _delete<ILike>('likes', currentUsersLike.value[0].id)
      await refreshDidLikeState()
      await refreshLikes()
    }
  } catch (e: any) {
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

// To handle correct like display on user's login/logout
watch(
  () => user.value,
  (newVal) => {
    newVal ? refreshDidLikeState() : (currentUsersLike.value = [])
  }
)
</script>
