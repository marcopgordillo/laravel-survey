<template>
    <h1 class="text-2xl font-bold">Home Vue {{ user.data.name }}</h1>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store'

const mainStore = useMain()
const { user } = storeToRefs(mainStore)

</script>
