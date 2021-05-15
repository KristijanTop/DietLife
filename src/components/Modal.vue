<template>
 
<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <div class="title">
            <h1>{{data.name}}</h1>
            </div>
            <div class="title">
              Author: {{data.user}}
            </div>
            <div class="title">
              Carbohydrates: {{data.carbohydrates}} | Fat: {{data.fat}} | Protein: {{data.proteins}}
            </div>      
          </div>
          <div class="modal-body">
            <slot name="body">
              {{data.description}}
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
             
              <button class="modal-default-button" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
    
   
</template>

<script>
export default {
  name: "Modal",
  props: ["data"],
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 90%;
  max-width: 550px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  display: block !important;
}

.modal-body {
  margin: 20px 0;
  height: 90%;
  max-height: 275px;
  overflow: auto;
  text-align: justify;
}

.modal-default-button {
  float: right;
}

.title {
  padding: 5px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>