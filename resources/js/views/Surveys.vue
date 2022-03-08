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
    <LoadingComponent v-if="surveys.loading" />
    <div v-else>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <SurveyListItem
          v-for="(survey, index) in surveys.data"
          :key="survey.id"
          :survey="survey"
          class="opacity-0 animate-fade-in-down"
          :style="{animationDelay: `${index * 0.1}s`}"
          @delete="deleteSurvey(survey)"
        />
      </div>
      <div class="flex justify-center mt-5">
        <nav
          class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            v-for="(link, index) of surveys.links"
            :key="index"
            :disabled="!link.url"
            href="#"
            @click.prevent="getForPage(link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[link.active ? classLinks.active : classLinks.noActive,
                     index === 0 ? classLinks.first : '',
                     index === surveys.links.length - 1 ? classLinks.last : '']"
            v-html="link.label"
          ></a>
        </nav>
      </div>
    </div>
  </page-component>
</template>

<script setup>
import { PlusIcon, PencilIcon } from '@heroicons/vue/outline'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { PageComponent, LoadingComponent } from '@/components/base'
import { useSurveyStore } from '@/store'
import SurveyListItem from '@/components/surveys/SurveyListItem.vue'

const surveyStore = useSurveyStore()

const { surveys } = storeToRefs(surveyStore)

surveyStore.getSurveys()

const classLinks = computed(() => ({
  active: 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600',
  noActive: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
  first: 'rounded-l-md',
  last: 'rounded-r-md',
}))

const deleteSurvey = (survey) => {
  if (confirm("Are you sure you want to delete this survey? Operation can't be undone!")) {
    surveyStore.deleteSurvey(survey)
  }
}

const getForPage = (link) => {
  if (!link.url || link.active) return;

  surveyStore.getSurveys({ url: link.url })
}

</script>
