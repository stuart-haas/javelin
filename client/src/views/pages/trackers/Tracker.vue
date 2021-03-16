<template>
  <div class="box">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field">
            <p class="control">
              <input
                type="text"
                class="input"
                v-model="formData.name"
                :placeholder="tracker.name"
                @keydown.enter="updateTracker"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <input type="text" class="input" placeholder="00:00:00" />
        </div>
        <div class="level-item">
          <div class="buttons">
            <div class="button is-primary">Log</div>
          </div>
        </div>
        <div class="level-item">
          <button
            class="delete has-background-danger"
            @click="removeTracker"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  directives: {
    ClickOutside,
  },
  props: {
    tracker: Object,
    index: Number,
  },
  data() {
    return {
      edit: false,
      formData: Object,
    };
  },
  mounted() {
    this.formData = this.tracker;
  },
  methods: {
    handleEdit() {
      this.edit = true;
    },
    handleCancel() {
      this.edit = false;
      //this.formData = this.tracker;
    },
    async updateTracker() {
      const param = this.tracker._id;
      const { formData } = this;
      this.$store.dispatch('tracker/update', {
        formData,
        param,
      });
      this.edit = false;
    },
    async removeTracker() {
      const param = this.tracker._id;
      const { index } = this;
      if (window.confirm('Are you sure?')) {
        this.$store.dispatch('tracker/remove', {
          param,
          index,
        });
      }
    },
  },
};
</script>

<style scoped>
.icon.check {
  cursor: pointer;
  pointer-events: all;
}
.icon.check svg path {
  fill: hsl(171, 100%, 41%);
}
</style>
