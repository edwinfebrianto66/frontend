<template>
  <li>
    <div
      class="flex items-center justify-between cursor-pointer px-3 py-2 rounded hover:bg-red-50"
      @click="toggle"
      :class="{'text-red-600': isActive}"
    >
      <div class="flex items-center space-x-3">
        <i :class="item.icon" class="text-gray-500"></i>
        <router-link 
          :to="'/' + item.slug" 
          class="text-sm font-medium"
          :class="{'text-red-600': isActive, 'text-gray-700': !isActive}"
        >
          {{ item.name }}
        </router-link>
      </div>
      <span v-if="hasChildren" class="text-xs text-gray-500">{{ open ? '▾' : '▸' }}</span>
    </div>

    <ul v-if="hasChildren && open" class="ml-8 mt-1 space-y-1">
      <SidebarItem v-for="child in item.children" :key="child.id" :item="child" />
    </ul>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  item: Object
})

const open = ref(false)
const toggle = () => {
  if (hasChildren.value) open.value = !open.value
}

const hasChildren = computed(() => props.item.children?.length > 0)
const isActive = computed(() => route.path.includes(props.item.slug))
</script>