<template>
  <q-form
    @submit="addEntryFormSubmit"
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
  >
    <div class="col">
      <q-input
        v-model="addEntryForm.name"
        ref="nameRef"
        placeholder="Name"
        outlined
        :bg-color="useLightOrDark('white', 'black')"
        dense
        required
        v-select-all
      />
    </div>
    <div class="col">
      <q-input
        v-model.number="addEntryForm.amount"
        input-class="text-right"
        type="number"
        step="0.01"
        placeholder="Amount"
        outlined
        :bg-color="useLightOrDark('white', 'black')"
        dense
        required
        v-select-all
      />
    </div>
    <div class="col col-auto">
      <q-btn type="submit" color="primary" icon="add" round />
    </div>
  </q-form>
</template>

<script setup>
import { useStoreEntries } from "src/stores/storeEntries";
import { reactive, ref } from "vue";
import vSelectAll from 'src/directives/directiveSelectAll';
import { useLightOrDark } from "src/use/useLightOrDark";

const storeEntries = useStoreEntries();

const nameRef = ref(null);

const addEntryFormDefault = {
  name: "",
  amount: null,
};

const addEntryForm = reactive({
  ...addEntryFormDefault,
});


const addEntryFormReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault);
  nameRef.value.focus();
};

const addEntryFormSubmit = () => {
  storeEntries.addEntry(addEntryForm);
  addEntryFormReset();
};
</script>
