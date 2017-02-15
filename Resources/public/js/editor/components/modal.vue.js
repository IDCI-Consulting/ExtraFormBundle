Vue.component('modal', {

  template:
      '<transition name="modal">' +
          '<div class="vue-modal-mask">' +
              '<div class="vue-modal-container">' +
                  '<div class="vue-modal-header">' +
                      '<slot name="header"></slot>' +
                  '</div>' +
                  '<div class="vue-modal-body">' +
                      '<slot name="body"></slot>' +
                  '</div>' +
                  '<div class="vue-modal-footer">' +
                      '<slot name="footer"></slot>' +
                  '</div>' +
              '</div>' +
          '</div>' +
      '</transition>'
});