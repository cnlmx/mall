<template>
  <div class="check-button" :class="{checked: isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    width: 19px;
    height: 19px;
    border: 1px solid #aaa;
    line-height: 20px;
  }

  .checked {
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>
