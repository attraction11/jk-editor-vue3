<template>
  <div class="tabs-component">
    <ul
      role="tablist"
      class="tabs-component-tabs"
    >
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        :class="{ 'is-active': tab.isActive, 'is-disabled': tab.isDisabled }"
        class="tabs-component-tab"
        role="presentation"
        v-show="tab.isVisible"
      >
        <a
          v-html="tab.header"
          :aria-controls="tab.hash"
          :aria-selected="tab.isActive"
          @click="selectTab(tab.hash, $event)"
          :href="tab.hash"
          class="tabs-component-tab-a"
          role="tab"
        />
      </li>
    </ul>
    <div class="tabs-component-panels">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts" name="Tab">
import { ref, computed, useSlots, onMounted } from 'vue'
import expiringStorage from '../expiringStorage'

const tabs = ref([])
const activeTabHash = ref('')
const activeTabIndex = ref(0)
const lastActiveTabHash = ref('')

const props = defineProps({
  cacheLifetime: {
    type: Number,
    default: 5
  },
  options: {
    type: Object,
    required: false,
    default: () => ({
      useUrlFragment: true,
      defaultTabHash: null
    })
  }
})

const emit = defineEmits<{
  (type: 'clicked', change: object): void
  (type: 'changed', change: object): void
}>()

const storageKey = computed(() => {
  return `vue-tabs-component.cache.${window.location.host}${window.location.pathname}`
})

tabs.value = useSlots()

onMounted(() => {
  window.addEventListener('hashchange', () =>
    selectTab(window.location.hash)
  )

  if (findTab(window.location.hash)) {
    selectTab(window.location.hash)
    return
  }

  const previousSelectedTabHash = expiringStorage.get(storageKey.value)

  if (findTab(previousSelectedTabHash)) {
    selectTab(previousSelectedTabHash)
    return
  }

  if (
    props.options.defaultTabHash !== null &&
      findTab('#' + props.options.defaultTabHash)
  ) {
    selectTab('#' + props.options.defaultTabHash)
    return
  }

  if (tabs.value.length) {
    selectTab(tabs.value[0].hash)
  }
})

const findTab = (hash) => {
  return tabs.value.find((tab) => tab.hash === hash)
}

const selectTab = (selectedTabHash, event) => {
  // See if we should store the hash in the url fragment.
  if (event && !props.options.useUrlFragment) {
    event.preventDefault()
  }

  const selectedTab = findTab(selectedTabHash)

  if (!selectedTab) {
    return
  }

  if (selectedTab.isDisabled) {
    event.preventDefault()
    return
  }

  if (lastActiveTabHash.value === selectedTab.hash) {
    emit('clicked', { tab: selectedTab })
    return
  }

  tabs.value.forEach((tab) => {
    tab.isActive = tab.hash === selectedTab.hash
  })

  emit('changed', { tab: selectedTab })

  activeTabHash.value = selectedTab.hash
  activeTabIndex.value = getTabIndex(selectedTabHash)

  lastActiveTabHash.value = activeTabHash.value = selectedTab.hash

  expiringStorage.set(storageKey.value, selectedTab.hash, props.cacheLifetime)
}

const setTabVisible = (hash, visible) => {
  const tab = findTab(hash)

  if (!tab) {
    return
  }

  tab.isVisible = visible

  if (tab.isActive) {
    // If tab is active, set a different one as active.
    tab.isActive = visible

    tabs.value.every((tab, index, array) => {
      if (tab.isVisible) {
        tab.isActive = true
        return false
      }
      return true
    })
  }
}

const getTabIndex = (hash) => {
  const tab = findTab(hash)
  return tabs.value.indexOf(tab)
}

const getTabHash = (index) => {
  const tab = tabs.value.find((tab) => tabs.value.indexOf(tab) === index)

  if (!tab) {
    return
  }
  return tab.hash
}

const getActiveTab = () => {
  return findTab(activeTabHash.value)
}

const getActiveTabIndex = () => {
  return getTabIndex(activeTabHash.value)
}
</script>
