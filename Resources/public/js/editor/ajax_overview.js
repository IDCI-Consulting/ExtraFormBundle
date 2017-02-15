var getOverview = function (callback) {

  var raw = $('#modal_raw textarea').first().val();

  var request = $.ajax({
    url: '/extra-form/overview',
    method: 'POST',
    data: { configuration: raw }
  });

  request.done(function (content) {
    return callback(content);
  });

  request.fail(function (xhr, textStatus) {
    console.log("Request failed: " + textStatus);
  });
};

$(window).on('load', function() {

  $(document).on('click', 'button.trigger-overview-modal', function() {
    setTimeout(function(){
      getOverview(function(content) {
        try {
          $('#modal_overview .modal-body div').replaceWith(content);
        } catch(error) {
          $('#modal_overview .modal-body div').replaceWith('<div>'+ error +'</div>');
        }
      })
    }, 800);
  });

  //$('.overview-modal').on('show.bs.modal', function(event) {
  //  $('.modal-backdrop.fade.in').last().css('z-index', 8888);
  //});

  $('.overview-modal').on('hidden.bs.modal', function(event) {
    $('#modal_overview .modal-body div').replaceWith('<div style="text-align: center;"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i></div>');
  });

});
