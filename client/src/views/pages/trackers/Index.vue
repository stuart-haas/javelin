<template>
  <div class="container is-fluid">
    <section class="section">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="buttons">
              <button class="button is-primary" @click="addTracker">
                Add Tracker
              </button>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="text" placeholder="Search..." />
              </div>
              <div class="control">
                <a class="button is-info">Search</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div v-if="inProgressTrackers.length">
        <Tracker
          v-for="(tracker, index) in inProgressTrackers"
          :key="tracker._id"
          :tracker="tracker"
          :index="index"
          @complete="fetch"
        />
      </div>
      <div v-else class="box has-text-centered">No in-progress trackers</div>
    </section>
    <section class="section">
      <div v-if="completedTrackers.length">
        <Tracker
          v-for="(tracker, index) in completedTrackers"
          :key="tracker._id"
          :tracker="tracker"
          :index="index"
        />
      </div>
      <div v-else class="box has-text-centered">No completed trackers</div>
    </section>
  </div>
</template>

<script>
import Tracker from './Tracker';

export default {
  components: {
    Tracker,
  },
  computed: {
    trackers() {
      return this.$store.state.tracker.trackers;
    },
    inProgressTrackers() {
      return this.$store.getters['tracker/progress'];
    },
    completedTrackers() {
      return this.$store.getters['tracker/complete'];
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$store.dispatch('tracker/fetch');
    },
    addTracker() {
      const formData = { name: 'New Tracker' };
      this.$store.dispatch('tracker/add', {
        formData,
      });
    },
  },
};
</script>
