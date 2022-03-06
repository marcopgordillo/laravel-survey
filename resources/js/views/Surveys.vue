<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link
          :to="{name: 'SurveyCreate'}"
          class="py-2 px-3 text-white bg-emerald-500 hover:bg-emerald-600 rounded-md"
        >
          <PlusIcon class="h-4 w-4 -mt-1 inline-block" />
          Add New Survey
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="survey in surveys"
        :key="survey.id"
        class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[31rem]"
      >
        <img :src="survey.image" :alt="survey.title" class="w-full h-48 object-cover">
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
            @click="deleteSurvey(survey)"
            class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon class="h-5 w-5 -mt-1 inline-block" />
          </button>
        </div>
      </div>
    </div>
  </page-component>
</template>

<script setup>
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import { storeToRefs } from 'pinia'
import { PageComponent } from '@/components/base';
import { useSurveyStore } from '@/store'

const surveyStore = useSurveyStore()
const { surveys } = storeToRefs(surveyStore)

const deleteSurvey = (survey) => {
  if (confirm("Are you sure you want to delete this survey? Operation can't be undone!")) {
    // delete survey
  }
}

</script>
