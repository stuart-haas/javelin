<template>
  <div>
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
                <input
                  class="input"
                  type="text"
                  placeholder="Search..."
                  v-model="search"
                />
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
        <h2 class="is-size-4 mb-4">In-Progress</h2>
        <Tracker
          v-for="tracker in inProgressTrackers"
          :key="tracker._id"
          :tracker="tracker"
        />
      </div>
      <div v-else class="box has-text-centered">No in-progress trackers</div>
    </section>
    <section class="section">
      <div v-if="completedTrackers.length">
        <h2 class="is-size-4 mb-4">Completed</h2>
        <Tracker
          v-for="tracker in completedTrackers"
          :key="tracker._id"
          :tracker="tracker"
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
  data() {
    return {
      search: '',
    };
  },
  computed: {
    trackers() {
      return this.$store.state.tracker.trackers;
    },
    filteredTrackers() {
      return this.trackers.filter((item) => {
        return [item.name, item.project].some((value) => {
          return value.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
        });
      });
    },
    inProgressTrackers() {
      return this.filteredTrackers.filter((item) => !item.complete);
    },
    completedTrackers() {
      return this.filteredTrackers.filter((item) => item.complete);
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
      const formData = {
        name: 'New Tracker',
        project: 'New Project',
        rate: 60,
      };
      this.$store.dispatch('tracker/add', {
        formData,
      });
    },
  },
};
</script>
