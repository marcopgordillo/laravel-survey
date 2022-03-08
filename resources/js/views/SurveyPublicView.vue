<template>
  <div class="py-5 px-8">
    <loading-component v-if="currentSurvey.loading"></loading-component>
    <form
      v-else
      @submit.prevent="submitSurvey"
      class="container mx-auto"
      novalidate
    >
      <div class="grid grid-cols-6 items-center">
        <div class="mr-4">
          <img :src="currentSurvey.data.image_url" :alt="currentSurvey.data.title">
        </div>
        <div class="col-span-5">
          <h1 class="text-3xl mb-3">{{ currentSurvey.data.title }}</h1>
          <p class="text-gray-500 text-sm" v-html="currentSurvey.data.description"></p>
        </div>
      </div>

      <div
        v-if="surveyFinished"
        class="py-8 px-6 bg-emerald-400 text-white w-[37rem] mx-auto"
      >
        <div class="text-xl mb-3 font-semibold">
          Thanks for your participating in this survey.
        </div>
        <button
          @click="submitAnotherResponse"
          type="button"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit another response
        </button>
      </div>

      <div v-else>
        <hr class="my-3" />
        <div
          v-for="(question, index) of currentSurvey.data.questions"
          :key="question.id"
        >
          <QuestionViewer
            v-model="answers[question.id]"
            :question="question"
            :index="index"
          />
        </div>

        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSurveyStore } from '@/store'
import QuestionViewer from '@/components/viewer/QuestionViewer.vue'

const route = useRoute()
const surveyStore = useSurveyStore()
const { currentSurvey } = storeToRefs(surveyStore)
const surveyFinished = ref(false)
const answers = ref({})

surveyStore.getSurveyBySlug(route.params.slug)

const submitSurvey = async () => {
  // console.log(JSON.stringify(answers.value, undefined, 2))
  try {
    await surveyStore.saveSurveyAnswers({
      surveyId: currentSurvey.value.data.id,
      answers: answers.value,
    })
    surveyFinished.value = true
  } catch (err) {
    console.error(err)
  }
}

const submitAnotherResponse = () => {
  answers.value = {}
  surveyFinished.value = false
}
</script>
