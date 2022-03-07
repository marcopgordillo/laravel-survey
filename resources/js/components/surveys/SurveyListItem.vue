<template>
  <div class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[31rem]">
    <img :src="survey.image_url" :alt="survey.title" class="w-full h-48 object-cover">
    <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
    <p v-html="survey.description" class="overflow-hidden flex-1"></p>
    <div class="flex justify-between items-center mt-3">
      <router-link
        :to="{ name: 'SurveyView', params: { id: survey.id } }"
        class="flex py-2 px-4 border border-transparent text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PencilIcon class="h-5 w-5 mr-2" />
        Edit
      </router-link>
      <button
        v-if="survey.id"
        type="button"
        @click="emit('delete', survey)"
        class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <TrashIcon class="h-5 w-5 -mt-1 inline-block" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline'

defineProps({
  survey: Object,
})

const emit = defineEmits(['delete'])
</script>
