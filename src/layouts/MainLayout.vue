<template>
  <q-layout view="hHh lpR lFf">
    <q-header
    :elevated="useLightOrDark(true,false)">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="savings" />
            Moneyballs
          </div>
        </q-toolbar-title>

        <q-btn
          v-if="$route.fullPath === '/'"
          @click="storeEntries.options.sort = !storeEntries.options.sort"
          :label="!storeEntries.options.sort ? 'Sort' :'Done'"
          flat
          no-caps
          dense
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-primary"
      :width="250"
      :breakpoint="767"
    >
      <q-item-label class="text-white" header=""> Navigation </q-item-label>
      <NavLink v-for="link in navLinks" :key="link.title" v-bind="link" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import NavLink from "components/Nav/NavLink.vue";
import { useStoreEntries } from "src/stores/storeEntries";
import { useLightOrDark } from "src/use/useLightOrDark";

const storeEntries = useStoreEntries();

const navLinks = [
  {
    title: "Entries",
    icon: "savings",
    link: "/",
  },
  {
    title: "Settings",
    icon: "settings",
    link: "/settings",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
