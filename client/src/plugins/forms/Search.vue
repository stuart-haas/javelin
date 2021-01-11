<template>
  <div class="Search">
    <div class="Search-field">
      <input
        class="Search-input"
        v-model="selection"
        @keydown.prevent.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
        @keydown.esc="close"
        @input="input"
        @change="change"
      />
      <transition name="fade">
        <div class="Search-results" v-if="showSuggestions" ref="results">
          <div
            v-for="(match, index) in matches"
            :key="match.index"
            ref="result"
            :class="[{ 'is-active': isActive(index) }, 'Search-result']"
            @click="click(match.index)"
          >
            <span>{{ match.label }}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    suggestions: {
      type: Array,
      required: true,
    },
    autocomplete: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      open: false,
      current: 0,
      selection: '',
    };
  },
  computed: {
    showSuggestions() {
      return this.selection && this.matches.length && this.open;
    },
    matches() {
      const suggestions = this.suggestions
        .map((suggestion, index) => {
          suggestion.index = index; // Apply suggestion index here, otherwise there would be a mismatch when selecting matches
          return suggestion;
        })
        .sort((a, b) => {
          return a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1; // sort suggestions in ascending alphabetical order
        });
      if (this.autocomplete) {
        return suggestions.filter((suggestion) => {
          return (
            suggestion.label
              .toLowerCase()
              .indexOf(this.selection.toLowerCase()) >= 0 // search should be case insensitive
          );
        });
      }
      return suggestions;
    },
  },
  mounted() {
    this.selection = this.value;
  },
  methods: {
    input() {
      if (!this.open) {
        this.open = true;
        this.current = 0;
      }
    },
    change() {
      if (this.selection) {
        if (this.matches[this.current]) {
          const selection = this.matches[this.current];
          this.emit(selection);
        } else {
          if (!this.matches.includes(this.selection)) {
            const selection = { value: null, label: null };
            this.emit(selection);
          }
        }
      } else {
        const selection = { value: null, label: null };
        this.emit(selection);
      }
    },
    enter() {
      const selection = this.matches[this.current];
      this.emit(selection);
    },
    click(index) {
      const selection = this.suggestions
        .filter((suggestion) => {
          return suggestion.index === index;
        })
        .map((suggestion) => {
          return suggestion;
        })[0];

      this.emit(selection);
    },
    up() {
      if (this.current > 0) {
        this.current--;
        this.scroll();
      }
    },
    down() {
      if (this.current < this.matches.length - 1 && this.matches.length > 0) {
        this.current++;
        this.scroll();
      }
    },
    close() {
      this.open = false;
    },
    emit(selection) {
      const { name } = this;
      this.$emit('change', {
        name,
        selection,
      });
      this.setAndClose(selection);
    },
    setAndClose(selection) {
      this.selection = selection.label;
      this.current = 0;
      this.close();
    },
    isActive(index) {
      return index == this.current;
    },
    scroll() {
      if (!this.$refs.result) return;
      const height = this.$refs.result[this.current].clientHeight;
      this.$refs.results.scrollTop = height * this.current;
    },
  },
};
</script>

<style lang="postcss" scoped>
.Search-field {
  @apply relative;
}

.Search-input {
  @apply p-1 text-sm block w-full border border-gray-300 bg-white rounded;
}

.Search-results {
  @apply absolute z-10 top-full mt-1 left-0 w-full max-h-16 p-2 border border-gray-300 rounded overflow-y-scroll bg-white;
  scroll-behavior: smooth;
}

.Search-result {
  @apply p-1 cursor-pointer text-sm transition-all;
}
.Search-result:hover,
.Search-result.is-active {
  @apply text-secondary-500;
}
</style>
