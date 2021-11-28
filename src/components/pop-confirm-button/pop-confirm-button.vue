<template functional>
  <Poptip confirm transfer :title="props.popTipTitle" @on-ok="props.ok">
    <Button :class="props.buttonClass" v-bind="props.buttonProps">{{props.buttonText}}</Button>
  </Poptip>
</template>
