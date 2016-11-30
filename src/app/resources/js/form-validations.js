function create() {
	validateFields();
	handleErrorMessage();
}

function handleErrorMessage() {
	var messages = $("#mensagem");
	if ($('form')[0].checkValidity()) {
		messages.hide();
	} else {
		messages.show();
	}
}

function validateFields() {
	$('form input, form select, form textarea').each(function() {
		validateField(this);
	});
}

function validateField(item) {
	var parent = $(item).parent();

	if (item.checkValidity()) {
		parent.removeClass('has-error');
	} else {
		parent.addClass('has-error');
	}
}