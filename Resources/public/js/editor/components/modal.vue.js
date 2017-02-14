Vue.component('modal', {

  template:
      '<transition name="modal">' +
          '<div class="vue-modal-mask">' +
              '<div class="vue-modal-container">' +
                  '<div class="vue-modal-header">' +
                      '<slot name="header"> default header </slot>' +
                  '</div>' +
                  '<div class="vue-modal-body">' +
                      '<slot name="body"> default body </slot>' +
                  '</div>' +
                  '<div class="vue-modal-footer">' +
                      '<slot name="footer"> default footer' +
                          '<button class="vue-modal-default-button" @click.prevent="$emit(\'close\')"> OK </button>' +
                      '</slot>' +
                  '</div>' +
              '</div>' +
          '</div>' +
      '</transition>'
});