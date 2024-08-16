<template>
  <q-slide-item
    @right="onEntrySlideRight"
    right-color="negative"
    @left="onEntrySlideLeft"
    left-color="positive"
    :id="`id-${entry.id}`"
    :class="
      !entry.paid
        ? useLightOrDark('bg-white', 'bg-black')
        : useLightOrDark('bg-grey-2', 'bg-grey-10')
    "
  >
    <template v-slot:left>
      <q-icon name="done" />
    </template>

    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item class="row">
      <!--  -->
      <q-item-section
        class="text-weight-bold col"
        :class="[
          useAmountColorClass(entry.amount),
          { 'text-strike': entry.paid },
        ]"
      >
        {{ entry.name }}
        <q-popup-edit
          @save="onNameUpdate"
          :model-value="entry.name"
          auto-save
          v-slot="scope"
          anchor="top left"
          :cover="false"
          :offset="[16, 12]"
          buttons
          label-set="Ok"
        >
          <q-input
            v-model="scope.value"
            input-class="text-weight-bold letter-spacing-none"
            v-select-all
            dense
            autofocus
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-item-section>
      <!--  -->
      <!--  -->
      <q-item-section
        v-mutation
        class="text-weight-bold relative-position col"
        side
        :class="[useAmountColorClass(entry.amount)]"
      >
        <span :class="{ 'text-strike': entry.paid }">
          {{ useCurrencify(entry.amount) }}
        </span>

        <q-popup-edit
          @save="onAmountUpdate"
          :model-value="entry.amount"
          auto-save
          v-slot="scope"
          anchor="top right"
          self="top right"
          :cover="false"
          :offset="[16, 12]"
          buttons
          label-set="Ok"
        >
          <q-input
            v-model.number="scope.value"
            input-class="text-weight-bold letter-spacing-none text-right"
            type="number"
            step="0.01"
            dense
            autofocus
            @keyup.enter="scope.set"
            v-select-all
          />
        </q-popup-edit>
        <q-chip
          v-if="storeSettings.settings.showRunningBalance"
          :class="useAmountColorClass(storeEntries.runningBalances[index])"
          class="running-balance absolute-bottom-right"
          outline
          dense
          size="9px"
        >
          {{ useCurrencify(storeEntries.runningBalances[index]) }}
        </q-chip>
      </q-item-section>
      <!--  -->
      <q-item-section v-if="storeEntries.options.sort" side>
        <q-icon class="handle" name="reorder" color="primary" />
      </q-item-section>
      <!--  -->
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStoreEntries } from "src/stores/storeEntries";
import { useAmountColorClass } from "src/use/useAmountColorClass";
import { useCurrencify } from "src/use/useCurrencify";
import vSelectAll from "src/directives/directiveSelectAll";
import { useStoreSettings } from "src/stores/storeSettings";
import { useLightOrDark } from "src/use/useLightOrDark";

const storeEntries = useStoreEntries(),
  storeSettings = useStoreSettings();

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const $q = useQuasar();

const onEntrySlideRight = ({ reset }) => {
  if (storeSettings.settings.promptToDelete) promptToDelete(reset);
  else storeEntries.deleteEntry(props.entry.id);
};

const promptToDelete = (reset) => {
  $q.dialog({
    title: "Delete Entry",
    message: `Delete this entry?
    <div class="q-mt-md text-weight-bold ${useAmountColorClass(
      props.entry.amount
    )}">
       ${props.entry.name} : ${useCurrencify(props.entry.amount)}
    </div>
    `,
    html: true,
    cancel: true,
    persistent: true,
    ok: {
      label: "Delete",
      color: "negative",
      noCaps: true,
    },
    cancel: {
      color: "primary",
      noCaps: true,
    },
  })
    .onOk(() => {
      storeEntries.deleteEntry(props.entry.id);
    })
    .onCancel(() => reset());
};

const onNameUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { name: value });
};

const onAmountUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { amount: value });
};

const onEntrySlideLeft = ({ reset }) => {
  storeEntries.updateEntry(props.entry.id, { paid: !props.entry.paid });
  reset();
};
</script>
