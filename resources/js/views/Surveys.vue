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
      <SurveyListItem
        v-for="survey in surveys"
        :key="survey.id"
        :survey="survey"
        @delete="deleteSurvey(survey)"
      />
    </div>
  </page-component>
</template>

<script setup>
import { PlusIcon, PencilIcon } from '@heroicons/vue/outline'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { PageComponent } from '@/components/base'
import { useSurveyStore } from '@/store'
import SurveyListItem from '@/components/surveys/SurveyListItem.vue'

const surveyStore = useSurveyStore()

surveyStore.getSurveys()

const { surveys: ObjectSurveys } = storeToRefs(surveyStore)
const surveys = ref([])

watch(
  () => ObjectSurveys.value.data,
  (newVal, oldVal) => {
    surveys.value = [
      ...JSON.parse(JSON.stringify(ObjectSurveys.value.data))
    ]
  }
)
const deleteSurvey = (survey) => {
  if (confirm("Are you sure you want to delete this survey? Operation can't be undone!")) {
    surveyStore.deleteSurvey(survey)
  }
}

</script>
