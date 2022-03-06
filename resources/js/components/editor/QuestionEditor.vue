<template>
  <!-- Question Index -->
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">{{ index + 1 }}. {{ question.question }}</h3>

    <div class="flex items-center">
      <!-- Add new question -->
      <button
        type="button"
        @click="addQuestion"
        class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
      >
        <PlusSmIcon class="h-4 w-4" />
        Add
      </button>
      <!-- Delete question -->
      <button
        type="button"
        @click="deleteQuestion"
        class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm border border-transparent text-red-500 hover:border-red-600"
      >
        <TrashIcon class="h-4 w-4" />
        Delete
      </button>
    </div>
  </div>
  <!--/ Question Index -->
  <div class="grid gap-3 grid-cols-12">
    <!-- Question -->
    <div class="mt-3 col-span-9">
      <label
        :for="`question_text_${question.id}`"
        class="block text-sm font-medium text-gray-700"
      >
        Question Text
      </label>
      <input
        v-model="question.question"
        @change="dataChange"
        :id="`question_text_${question.id}`"
        :name="`question_text_${question.id}`"
        type="text"
        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>
    <!-- Question Type -->
    <div class="mt-3 col-span-3">
      <label
        :for="`question_type_${question.id}`"
        class="block text-sm font-medium text-gray-700"
      >
        Question Type
      </label>
      <select
        v-model="question.type"
        @change="typeChange"
        :id="`question_type_${question.id}`"
        :name="`question_type_${question.id}`"
        class="mt-1 py-2 px-3 border border-gray-300 bg-white block w-full shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md capitalize"
      >
        <option class="capitalize" v-for="type in questionTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>
  </div>
  <!-- Question description -->
  <div class="mt-3 col-span-9">
    <label
      :for="`question_description_${question.id}`"
      class="block text-sm font-medium text-gray-700"
    >
      Description
    </label>
    <textarea
      v-model="question.description"
      @change="dataChange"
      :name="`question_description_${question.id}`"
      :id="`question_description_${question.id}`"
      rows="3"
      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
    ></textarea>
  </div>

  <!-- Data -->
  <div>
    <div v-if="shouldHaveOptions" class="mt-2">
      <div class="mb-1 flex justify-between items-center">
        <h4 class="text-sm font-semibold">Options</h4>
        <button
          type="button"
          @click="addOption"
          class="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
        >
          <PlusSmIcon class="h-4 w-4" />
          Add Option
        </button>
      </div>
      <p
        v-if="question.data && question.data.options && !question.data.options.length"
        class="text-xs text-gray-600 text-center py-3"
      >
        You don't have any options defined
      </p>
      <!-- Option List -->
      <template v-else-if="question.data">
        <div
          v-for="(option, index) in question.data.options"
          :key="option.uuid"
          class="flex items-center mb-1"
        >
          <span class="w-6 text-sm">{{ index + 1 }}.</span>
          <input
            type="text"
            v-model="option.text"
            @change="dataChange"
            class="w-full rounded-md py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
          />
          <!-- Delete Option -->
          <button
            type="button"
            @click="removeOption(option)"
            class="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100"
          >
            <TrashIcon class="h-3 w-3 text-red-500" />
          </button>
        </div>
      </template>
    </div>
  </div>

  <hr class="my-4" />
</template>

<script setup>
import { ref } from "vue"
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { PlusSmIcon, TrashIcon } from '@heroicons/vue/outline'
import { useSurveyStore } from '@/store'

const surveyStore = useSurveyStore()

const { questionTypes } = storeToRefs(surveyStore)

const props = defineProps({
  question: Object,
  index: Number,
})

const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion'])

// Re-create the whole question data to avoid unintentional reference change
const question = ref(JSON.parse(JSON.stringify(props.question)))

const shouldHaveOptions = () => ['select', 'radio', 'checkbox'].includes(question.value.type)

const getOptions = () => question.value.data.options

const setOptions = (options) => question.value.data.options = options

const addOption = (option) => {
  setOptions([
    ...getOptions(),
    { uuid: uuidv4(), text: '' },
  ])
  dataChange()
}

const removeOption = (op) => setOptions(getOptions().filter((opt) => opt !== op))

const typeChange = () => {
  if (shouldHaveOptions()) {
    setOptions(getOptions() || [])
  }
  dataChange()
}

const dataChange = () => {
  const data = JSON.parse(JSON.stringify(question.value))

  if (!shouldHaveOptions()) {
    delete data.data.options
  }

  emit('change', data)
}

const addQuestion = () => {
  emit('addQuestion', props.index + 1)
}

const deleteQuestion = () => {
  emit('deleteQuestion', props.question)
}
</script>
