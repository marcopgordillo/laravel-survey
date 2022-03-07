<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ route.params.id ? survey.title : 'Create a Survey' }}
        </h1>
        <button
          v-if="route.params.id"
          @click="deleteSurvey"
          type="button"
          class="py-2 px-3 text-white bg-red-500 hover:bg-red-600 rounded-md"
        >
          <TrashIcon class="h-5 w-6 -mt-1 inline-block" />
          Delete Survey
        </button>
      </div>
    </template>
    <div
      v-if="currentSurvey.loading"
      class="flex items-center justify-center"
    >
      <div class="inline-flex px-4 py-2 font-semibold text-sm shadow rounded-md text-white bg-indigo-500">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        loading...
      </div>
    </div>
    <!-- Survey Form -->
    <form v-else @submit.prevent="saveSurvey" novalidate>
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <!-- Survey Fields -->
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!-- Image -->
          <div>
            <label for="image" class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="survey.image_url"
                :src="survey.image_url"
                :alt="survey.title"
                class="w-64 h-64 object-cover"
              />
              <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <PhotographIcon class="h-[80%] w-[80%] text-gray-300" />
              </span>
              <button
                type="button"
                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <input
                  id="image"
                  @change="onImageUpload"
                  type="file"
                  accept="image/*"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                />
                Change
              </button>
            </div>
          </div>
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="survey.title"
              autocomplete="survey_title"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              type="text"
              name="title"
              id="title"
            />
          </div>
          <div>
          <!-- Description -->
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="survey.description"
              autocomplete="survey_description"
              placeholder="Describe your survey"
              rows="3"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
              name="description"
              id="description"
            >
            </textarea>
          </div>
          <!-- Expire Date -->
          <div>
            <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
            <input
              v-model="survey.expire_date"
              autocomplete="survey_expire_date"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              type="date"
              name="expire_date"
              id="expire_date"
            />
          </div>
          <!-- Status -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                v-model="survey.status"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                type="checkbox"
                id="status"
                name="status"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700">Active</label>
            </div>
          </div>
        </div>
        <!--/ Survey Fields -->

        <div class="px-5 py-5 bg-white space-y-6 sm:p-6">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-semibold">Questions</h3>
            <button
              type="button"
              @click="addQuestion"
              class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
            >
              <PlusSmIcon class="h-4 w-4" />
              Add Question
            </button>
          </div>
          <div
            v-if="!(survey.questions && survey.questions.length)"
            class="text-center text-gray-600"
          >
            You don't have any questions created
          </div>
          <template v-else>
            <div
              v-for="(question, index) in survey.questions"
              :key="question.id"
            >
              <QuestionEditor
                :question="question"
                :index="index"
                @change="questionChange"
                @addQuestion="addQuestion"
                @deleteQuestion="deleteQuestion"
              />
            </div>
          </template>
        </div>

        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </page-component>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import { PhotographIcon, PlusSmIcon, TrashIcon } from '@heroicons/vue/outline'
import { PageComponent } from '@/components/base'
import QuestionEditor from '@/components/editor/QuestionEditor.vue'
import { useSurveyStore } from '@/store'

const route = useRoute()
const router = useRouter()
const surveyStore = useSurveyStore()
const { surveys, currentSurvey } = storeToRefs(surveyStore)

let survey = ref({
  id: null,
  title: null,
  status: false,
  description: null,
  image: null,
  image_url: null,
  expire_date: null,
  questions: [],
})

watch(
  () => currentSurvey.value.data,
  (newVal, oldVal) => {
    survey.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: newVal.status !== 'draft',
    }
  }
)

if (route.params.id) {
  surveyStore.getSurvey(route.params.id)
}

const questionChange = (question) => {
  survey.value.questions = survey.value.questions.map(
    (q) => q.id === question.id ? JSON.parse(JSON.stringify(question)) : q
  )
}

const addQuestion = (index) => {
  const newQuestion = {
    id: uuidv4(),
    type: 'text',
    question: null,
    description: null,
    data: {},
  }

  survey.value.questions.splice(index, 0, newQuestion)
}

const deleteQuestion = (question) => {
  survey.value.questions = survey.value.questions.filter(
    (q) => q !== question
  )
}

const saveSurvey = async () => {
  try {
    const data = await surveyStore.saveSurvey(survey.value)
    surveyStore.notify({
      type: 'success',
      message: 'Survey was successfully updated!'
    })
    router.push({
      name: 'SurveyView',
      params: { id: data.data.id },
    })
  } catch (err) {
    console.error(err)
  }
}

const onImageUpload = (ev) => {
  const file = ev.target.files[0]

  const reader = new FileReader()
  reader.onload = () => {
    // to backend
    survey.value.image = reader.result
    // to display
    survey.value.image_url = reader.result
  }
  reader.readAsDataURL(file)
}

const deleteSurvey = () => {
  if (confirm("Are you sure you want to delete this survey? Oparation can't be done")) {
    surveyStore.deleteSurvey(survey.value)
    router.push({ name: 'Surveys' })
  }
}

</script>
